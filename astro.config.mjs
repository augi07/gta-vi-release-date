import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://gtavi.ghostwebstudios.com',
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['react-split-flap-display']
    }
  }
});
