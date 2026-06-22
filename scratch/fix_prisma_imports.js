const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processDir(dir) {
    walkDir(dir, function(filePath) {
      if (filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        if (content.includes("from '@prisma/client/master'")) {
          content = content.replace(/from '@prisma\/client\/master'/g, "from '@prisma-master/client'");
          updated = true;
        }
        if (content.includes("from '@prisma/client'")) {
           // We only want to replace it if it's meant to be master client, but wait, earlier we replaced them all with @prisma/client/master. Let's see if any are left.
        }
        if (updated) {
          fs.writeFileSync(filePath, content);
          console.log(`Updated ${filePath}`);
        }
      }
    });
}

processDir('./src/modules/saas');
processDir('./src/infrastructure/database');
