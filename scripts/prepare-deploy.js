const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist', 'iot-sandbox');
const devicesPath = path.join(distPath, 'devices');

// Create devices folder
if (!fs.existsSync(devicesPath)) {
  fs.mkdirSync(devicesPath, { recursive: true });
}

// Files to move to devices folder
const filesToMove = fs.readdirSync(distPath).filter(file => {
  return file !== 'landing.html' && file !== 'devices' && file !== 'index.html';
});

// Move Angular app files to devices folder
filesToMove.forEach(file => {
  const src = path.join(distPath, file);
  const dest = path.join(devicesPath, file);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  }
});

// Move index.html to devices folder
const indexSrc = path.join(distPath, 'index.html');
const indexDest = path.join(devicesPath, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.renameSync(indexSrc, indexDest);
}

// Rename landing.html to index.html (root landing page)
const landingSrc = path.join(distPath, 'landing.html');
const landingDest = path.join(distPath, 'index.html');
if (fs.existsSync(landingSrc)) {
  fs.renameSync(landingSrc, landingDest);
}

console.log('Deploy preparation complete!');
console.log('Structure:');
console.log('  /index.html - Landing page');
console.log('  /devices/   - Angular app');
