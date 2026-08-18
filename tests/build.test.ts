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

  it('should have required Astro pages including index, embed, and extended', () => {
    const pagesDir = path.resolve(__dirname, '../src/pages');
    expect(fs.existsSync(path.join(pagesDir, 'index.astro'))).toBe(true);
    expect(fs.existsSync(path.join(pagesDir, 'embed.astro'))).toBe(true);
    expect(fs.existsSync(path.join(pagesDir, 'extended.astro'))).toBe(true);
  });

  it('should have sitemaps containing extended and embed routes', () => {
    const sitemapXml = fs.readFileSync(path.resolve(__dirname, '../public/sitemap.xml'), 'utf-8');
    const sitemapTxt = fs.readFileSync(path.resolve(__dirname, '../public/sitemap.txt'), 'utf-8');
    expect(sitemapXml).toContain('https://gtavi.ghostwebstudios.com/extended');
    expect(sitemapXml).toContain('https://gtavi.ghostwebstudios.com/embed');
    expect(sitemapTxt).toContain('https://gtavi.ghostwebstudios.com/extended');
    expect(sitemapTxt).toContain('https://gtavi.ghostwebstudios.com/embed');
  });
});
