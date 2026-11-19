import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');

console.log('🚀 Running Dental City build pipeline...');

// 0. Ensure dependencies are installed in Dental city
try {
  const nodeModulesDir = path.join(innerDir, 'node_modules');
  if (!fs.existsSync(nodeModulesDir)) {
    console.log('📦 Installing dependencies in Dental city...');
    execSync('npm install', { cwd: innerDir, stdio: 'inherit' });
  }
} catch (err) {
  console.warn('Warning checking/installing dependencies in Dental city:', err.message);
}

// 1. Build TypeScript in Dental city
try {
  execSync('npm run build', { cwd: innerDir, stdio: 'inherit' });
} catch (err) {
  console.error('Build step failed in Dental city:', err.message);
  process.exit(1);
}

// 2. Synchronize compiled code and assets to root for multi-environment compatibility (MonsterASP, IIS, Fly.io, Vercel)
try {
  const srcDist = path.join(innerDir, 'dist');
  const rootDist = path.join(rootDir, 'dist');
  const srcViews = path.join(innerDir, 'src', 'views');
  const rootDistViews = path.join(rootDir, 'dist', 'views');
  const rootViews = path.join(rootDir, 'views');
  const srcPublic = path.join(innerDir, 'public');
  const rootPublic = path.join(rootDir, 'public');

  // Copy full compiled dist directory to root dist
  if (fs.existsSync(srcDist)) {
    fs.mkdirSync(rootDist, { recursive: true });
    fs.cpSync(srcDist, rootDist, { recursive: true, force: true });
  }

  // Ensure root dist/views and root views exist
  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(rootDistViews, { recursive: true });
    fs.cpSync(srcViews, rootDistViews, { recursive: true, force: true });
    fs.mkdirSync(rootViews, { recursive: true });
    fs.cpSync(srcViews, rootViews, { recursive: true, force: true });
  }

  // Always synchronize public assets to root public
  if (fs.existsSync(srcPublic)) {
    fs.mkdirSync(rootPublic, { recursive: true });
    fs.cpSync(srcPublic, rootPublic, { recursive: true, force: true });
  }

  // Ensure logs directory exists for MonsterASP.NET / IIS stdout logging
  const logsDir = path.join(rootDir, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // Ensure root node_modules has dependencies for root execution
  const innerNodeModules = path.join(innerDir, 'node_modules');
  const rootNodeModules = path.join(rootDir, 'node_modules');
  const rootExpress = path.join(rootNodeModules, 'express');
  if (fs.existsSync(innerNodeModules) && !fs.existsSync(rootExpress)) {
    try {
      fs.cpSync(innerNodeModules, rootNodeModules, { recursive: true, force: true });
      console.log('✓ Synchronized dependencies to root node_modules.');
    } catch (e) {
      console.warn('Notice syncing root node_modules:', e.message);
    }
  }

  console.log('✓ Successfully prepared Dental City assets and root dist.');
} catch (err) {
  console.warn('Notice while syncing root assets:', err.message);
}
