import { Module } from '@nestjs/common';

import { IssuedCertificatesController } from './controllers/issued-certificates/issued-certificates.controller';
import { TemplatesController } from './controllers/templates/templates.controller';
import { IssuedCertificatesService } from './services/issued-certificates/issued-certificates.service';
import { TemplatesService } from './services/templates/templates.service';

@Module({
  providers: [TemplatesService, IssuedCertificatesService],
  controllers: [TemplatesController, IssuedCertificatesController]})
export class CertificatesModule {}
