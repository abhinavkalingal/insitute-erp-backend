const fs = require('fs');
let env = fs.readFileSync('.env', 'utf8');
env = env.replace(/MASTER_DATABASE_URL=".*?"/g, 'MASTER_DATABASE_URL="postgresql://postgres:abhi9072@localhost:5432/institute_erp_master"');
env = env.replace(/DATABASE_URL=".*?"/g, 'DATABASE_URL="postgresql://postgres:abhi9072@localhost:5432/institute_erp_tenant"');
fs.writeFileSync('.env', env);
console.log('Updated .env with postgres credentials');
