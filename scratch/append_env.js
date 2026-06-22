const fs = require('fs');
let env = fs.readFileSync('.env', 'utf8');
const dbUrlMatch = env.match(/DATABASE_URL="([^"]+)"/);
let masterUrl = 'postgresql://postgres:postgres@localhost:5432/masterdb';
if (dbUrlMatch) {
  masterUrl = dbUrlMatch[1];
}
fs.appendFileSync('.env', '\nMASTER_DATABASE_URL="' + masterUrl + '"\n');
console.log('Appended MASTER_DATABASE_URL to .env');
