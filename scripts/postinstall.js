import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '..', 'Dental city');

if (fs.existsSync(targetDir)) {
  try {
    console.log('📦 Installing dependencies in Dental city...');
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
  } catch (err) {
    console.warn('Notice in postinstall:', err.message);
  }
} else {
  console.log('ℹ️ Skipping postinstall: Dental city folder not present in current layer.');
}
