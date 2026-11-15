const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip SwalAlert itself
  if (filePath.includes('SwalAlert')) return;
  if (!content.includes('<Alert')) return;

  // Cek jika react-bootstrap mengimpor Alert
  const rbRegex = /import\s+{[^}]*Alert[^}]*}\s+from\s+['"]react-bootstrap['"]/s;
  if (!rbRegex.test(content)) return;
  
  let modified = false;

  // 1. Ubah import { ..., Alert, ... } dari react-bootstrap
  content = content.replace(rbRegex, (match) => {
    // Hilangkan Alert, atau hapus baris import { Alert }
    let replaced = match.replace(/\bAlert\b,?/g, '').replace(/{\s*,/, '{').replace(/,\s*}/, '}').replace(/{\s*}/, '');
    if (replaced.includes('import  from')) replaced = ''; // if empty {}
    modified = true;
    return replaced;
  });

  if (modified) {
    // 2. Tambahkan import SwalAlert di bawahnya
    // Kita harus mencari path relatif ke src/components/ui/SwalAlert.jsx
    // asumsikan src di fullPath:
    const srcIndex = filePath.indexOf(path.join('fe', 'src'));
    const srcPath = filePath.substring(0, srcIndex + 7);
    const swalAlertPath = path.join(srcPath, 'components', 'ui', 'SwalAlert').replace(/\\/g, '/');
    
    // Convert to relative path
    let relPath = path.relative(path.dirname(filePath), swalAlertPath).replace(/\\/g, '/');
    if (!relPath.startsWith('.')) relPath = './' + relPath;

    const importStatement = `\nimport Alert from "${relPath}";\n`;
    
    // Inject import setelah import react-bootstrap
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf(';', lastImportIndex);
      if (endOfLastImport !== -1) {
        content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
      }
    } else {
      content = importStatement + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Modified: ' + filePath);
  }
}

processDir(path.join(__dirname, 'src'));
