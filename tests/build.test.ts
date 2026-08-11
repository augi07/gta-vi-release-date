import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Astro Build and Asset Integrity Tests', () => {
  it('should have required public static assets present', () => {
    const publicDir = path.resolve(__dirname, '../public');
    const requiredFiles = [
      'favicon.ico',
      'favicon.svg',
      'logo.png',
      'og-image.jpg',
      'robots.txt',
      'site.webmanifest',
      '_headers'
    ];

    requiredFiles.forEach((file) => {
      expect(fs.existsSync(path.join(publicDir, file))).toBe(true);
    });
  });

  it('should have key assets inside public/assets directory', () => {
    const assetsDir = path.resolve(__dirname, '../public/assets');
    expect(fs.existsSync(path.join(assetsDir, 'GTA6Logo.webp'))).toBe(true);
    expect(fs.existsSync(path.join(assetsDir, 'Image1.webp'))).toBe(true);
  });
});
