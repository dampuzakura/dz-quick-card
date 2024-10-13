// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://dampuzakura.github.io',
  base: '/dz-quick-card',
  integrations: [svelte()]
});