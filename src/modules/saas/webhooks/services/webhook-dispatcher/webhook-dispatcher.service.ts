import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { randomUUID } from 'crypto';

@Injectable()
export class WebhookDispatcherService {
  private readonly logger = new Logger(WebhookDispatcherService.name);

  constructor(private readonly prisma: PrismaMasterService) {}

  /**
   * Dispatches an event asynchronously to all subscribed webhook endpoints.
   * This method intentionally does not await the actual HTTP calls to prevent blocking the caller.
   */
  async dispatchEvent(instituteId: string, eventType: string, payload: any): Promise<void> {
    try {
      // Find active endpoints for this institute
      const endpoints = await this.prisma.webhookEndpoint.findMany({
        where: {
          instituteId,
          isActive: true}});

      if (endpoints.length === 0) return;

      const eventId = `evt_${randomUUID()}`;
      const payloadString = JSON.stringify(payload);

      // Filter endpoints that subscribe to this eventType or wildcard "*"
      const subscribedEndpoints = endpoints.filter((ep) => {
        const events = ep.events as string[];
        return events.includes('*') || events.includes(eventType);
      });

      // Fire and forget requests asynchronously
      for (const endpoint of subscribedEndpoints) {
        this.sendHttpRequest(endpoint, eventId, eventType, payload, payloadString).catch((err) => {
          this.logger.error(
            `Unhandled error dispatching webhook to ${endpoint.url}: ${err.message}`,
          );
        });
      }
    } catch (error) {
      this.logger.error(`Error initiating webhook dispatch: ${error.message}`);
    }
  }

  private async sendHttpRequest(
    endpoint: any,
    eventId: string,
    eventType: string,
    payload: any,
    payloadString: string,
  ): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Construct signature payload: "timestamp.payload"
    const signaturePayload = `${timestamp}.${payloadString}`;
    const signature = crypto
      .createHmac('sha256', endpoint.secret)
      .update(signaturePayload)
      .digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'x-institute-event-id': eventId,
      'x-institute-event': eventType,
      'x-institute-timestamp': timestamp,
      'x-institute-signature': `v1=${signature}`};

    let status = 'FAILED';
    let statusCode: number | null = null;
    let responseBody: string | null = null;

    try {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers,
        body: payloadString,
        // Set a timeout using AbortSignal if needed, omitted here for brevity
      });

      statusCode = response.status;
      responseBody = await response.text();

      if (response.ok) {
        status = 'SUCCESS';
      }
    } catch (error: any) {
      status = 'FAILED';
      responseBody = error.message;
    }

    // Log the delivery attempt in the database
    await this.prisma.webhookDelivery.create({
      data: {
        webhookEndpointId: endpoint.id,
        eventId,
        eventType,
        payload: payload,
        status,
        statusCode,
        responseBody: responseBody ? responseBody.substring(0, 1000) : null, // Truncate just in case
      }});
  }
}
