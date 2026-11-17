import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const srcViews = path.join(projectRoot, 'src', 'views');
const distViews = path.join(projectRoot, 'dist', 'views');

try {
  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(distViews, { recursive: true });
    fs.cpSync(srcViews, distViews, { recursive: true, force: true });
    console.log('✓ Successfully copied views to dist/views');
  } else {
    console.warn('src/views directory not found at:', srcViews);
  }
} catch (err) {
  console.warn('Notice while copying views:', err.message);
}
