import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');
const outDir = path.join(rootDir, 'publish-monsterasp');
const zipPath = path.join(rootDir, 'publish-monsterasp.zip');

console.log('📦 Preparing MonsterASP.NET Deployment Package...');

// 1. Run full project build
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 2. Prepare clean output directory
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 3. Copy necessary files
const itemsToCopy = [
  { src: path.join(rootDir, 'server.js'), dest: path.join(outDir, 'server.js') },
  { src: path.join(rootDir, 'web.config'), dest: path.join(outDir, 'web.config') },
  { src: path.join(rootDir, 'package.json'), dest: path.join(outDir, 'package.json') },
  { src: path.join(rootDir, 'dist'), dest: path.join(outDir, 'dist') },
  { src: path.join(rootDir, 'views'), dest: path.join(outDir, 'views') },
  { src: path.join(rootDir, 'public'), dest: path.join(outDir, 'public') },
  { src: path.join(rootDir, 'logs'), dest: path.join(outDir, 'logs') }
];

for (const item of itemsToCopy) {
  if (fs.existsSync(item.src)) {
    fs.cpSync(item.src, item.dest, { recursive: true, force: true });
    console.log(`✓ Copied: ${path.basename(item.src)}`);
  }
}

// 4. Ensure production node_modules exist in output
const innerModules = path.join(innerDir, 'node_modules');
const outModules = path.join(outDir, 'node_modules');
if (fs.existsSync(innerModules)) {
  console.log('⏳ Copying node_modules (production dependencies)...');
  fs.cpSync(innerModules, outModules, { recursive: true, force: true });
  console.log('✓ Copied: node_modules');
}

// 5. Generate ZIP archive for one-click upload & extract in MonsterASP.NET File Manager
if (fs.existsSync(zipPath)) {
  fs.rmSync(zipPath, { force: true });
}

try {
  console.log('⏳ Creating publish-monsterasp.zip archive...');
  execSync(`tar -a -c -f "${zipPath}" *`, { cwd: outDir, stdio: 'inherit' });
  console.log('✓ Created: publish-monsterasp.zip');
} catch (e) {
  try {
    execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
    console.log('✓ Created: publish-monsterasp.zip (via PowerShell)');
  } catch (psErr) {
    console.warn('Notice: Could not auto-generate ZIP archive:', psErr.message);
  }
}

console.log('\n============================================================');
console.log('🎉 MonsterASP.NET Package Ready!');
console.log('Folder: publish-monsterasp/');
console.log('Archive: publish-monsterasp.zip');
console.log('Deployment Methods:');
console.log('Option A (Fastest): Upload "publish-monsterasp.zip" via MonsterASP.NET File Manager and click Extract.');
console.log('Option B: Upload all files inside "publish-monsterasp" via FTP directly into "/wwwroot".');
console.log('Option C: Git Push to your repository.');
console.log('============================================================\n');
