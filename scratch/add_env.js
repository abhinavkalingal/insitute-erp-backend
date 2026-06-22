const fs = require('fs');
let env = fs.readFileSync('.env', 'utf8');
if (!env.includes('MASTER_DATABASE_URL')) {
  const dbUrlMatch = env.match(/DATABASE_URL="([^"]+)"/);
  if (dbUrlMatch) {
    let dbUrl = dbUrlMatch[1];
    let masterUrl = dbUrl.replace('template1', 'masterdb');
    fs.appendFileSync('.env', '\nMASTER_DATABASE_URL="' + masterUrl + '"\n');
    console.log('Added MASTER_DATABASE_URL to .env');
  } else {
    console.log('DATABASE_URL not found, cannot derive MASTER_DATABASE_URL.');
  }
} else {
  console.log('MASTER_DATABASE_URL already exists.');
}
