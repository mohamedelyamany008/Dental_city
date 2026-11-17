import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');

console.log('🚀 Running Dental City build pipeline for Vercel...');

// 1. Build TypeScript in Dental city
try {
  execSync('npm run build', { cwd: innerDir, stdio: 'inherit' });
} catch (err) {
  console.error('Build step failed in Dental city:', err.message);
  process.exit(1);
}

// 2. Synchronize views and assets to root for multi-environment compatibility
try {
  const srcViews = path.join(innerDir, 'src', 'views');
  const rootDistViews = path.join(rootDir, 'dist', 'views');
  const rootViews = path.join(rootDir, 'views');
  const srcPublic = path.join(innerDir, 'public');
  const rootPublic = path.join(rootDir, 'public');

  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(rootDistViews, { recursive: true });
    fs.cpSync(srcViews, rootDistViews, { recursive: true, force: true });
    fs.mkdirSync(rootViews, { recursive: true });
    fs.cpSync(srcViews, rootViews, { recursive: true, force: true });
  }

  if (fs.existsSync(srcPublic) && !fs.existsSync(rootPublic)) {
    fs.mkdirSync(rootPublic, { recursive: true });
    fs.cpSync(srcPublic, rootPublic, { recursive: true, force: true });
  }

  console.log('✓ Successfully prepared Dental City assets for Vercel.');
} catch (err) {
  console.warn('Notice while syncing root assets:', err.message);
}
