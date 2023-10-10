import { defineConfig } from 'astro/config';

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['bootstrap', 'roboto-font']
    }
  },
  base: '/docs',
  integrations: [
    starlight({
      title: 'AzuraCast Local Docs',
      logo: {
        src: './src/images/logo.svg'
      },
      favicon: '/img/logo.svg',
      customCss: [
        './src/scss/starlight.scss'
      ],
      social: {
        discord: 'https://discord.gg/azuracast',
        github: 'https://github.com/azuracast/azuracast',
      },
      sidebar: [
        { label: 'About These Docs', link: '/' },
        { label: 'Live Documentation', link: 'https://www.azuracast.com/docs' },
        { label: 'API Documentation', link: '/api' },
        { label: 'Update AzuraCast', link: '/docs/getting-started/updates' },
        {
          label: 'Help',
          autogenerate: { directory: 'help' },
        },
        {
          label: 'User Guide',
          autogenerate: { directory: 'user-guide' }
        },
        {
          label: 'Administrator Guide',
          autogenerate: { directory: 'administration' }
        },
        {
          label: 'Contribute',
          autogenerate: { directory: 'contribute' },
        },
        {
          label: 'For Developers',
          autogenerate: { directory: 'developers'}
        }
      ],
    })
  ]
});
