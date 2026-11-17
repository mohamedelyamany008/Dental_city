/**
 * Dental City Clinic Management & Booking System
 * Root Server Entrypoint for Hosting Environments (MonsterASP.NET, IIS, Fly.io, Vercel)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Candidates for compiled server file (supports nested /Dental city/dist and flat /dist)
const candidates = [
  path.join(__dirname, 'Dental city', 'dist', 'server.js'),
  path.join(__dirname, 'dist', 'server.js')
];

const targetPath = candidates.find(p => fs.existsSync(p)) || candidates[0];

const moduleUrl = pathToFileURL(targetPath).href;
const { default: app } = await import(moduleUrl);

export default app;
