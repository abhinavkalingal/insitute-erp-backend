const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:abhi9072@localhost:5432/erp_master' });
client.connect().then(() => {
  client.query('ALTER TABLE "SubscriptionPlan" ADD COLUMN IF NOT EXISTS "features" JSONB, ADD COLUMN IF NOT EXISTS "metadata" JSONB;').then(() => {
    console.log("Added columns successfully!");
    client.end();
  }).catch(console.error);
}).catch(console.error);
