import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');
const outDir = path.join(rootDir, 'publish-monsterasp');

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

console.log('\n============================================================');
console.log('🎉 MonsterASP.NET Package Ready at: publish-monsterasp/');
console.log('Instructions:');
console.log('1. Upload everything inside "publish-monsterasp" to "/wwwroot" on MonsterASP.NET.');
console.log('2. In MonsterASP.NET Control Panel:');
console.log('   - Go to Websites -> site108452 -> Configuration / Scripting');
console.log('   - Ensure Node.js is selected (or .NET CLR is set to No Managed Code)');
console.log('3. Restart the Application Pool (Process -> Restart).');
console.log('============================================================\n');
