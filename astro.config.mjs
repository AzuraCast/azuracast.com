import { defineConfig } from 'astro/config';

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap', 'roboto-font']
    }
  },
  integrations: [
    starlight({
      title: 'AzuraCast',
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
        { label: 'Home', link: '/' },
        { label: 'About AzuraCast', link: '/docs' },
        { label: 'Live Demo', link: '/docs/live-demo'},
        { label: 'Install AzuraCast', link: '/docs/getting-started/installation' },
        { label: 'Update AzuraCast', link: '/docs/getting-started/updates' },
        {
          label: 'Help',
          autogenerate: { directory: 'docs/help' },
        },
        {
          label: 'User Guide',
          autogenerate: { directory: 'docs/user-guide' }
        },
        {
          label: 'Administrator Guide',
          autogenerate: { directory: 'docs/administration' }
        },
        {
          label: 'Contribute',
          autogenerate: { directory: 'docs/contribute' },
        },
        {
          label: 'For Developers',
          autogenerate: { directory: 'docs/developers'}
        }
      ],
    })
  ]
});
