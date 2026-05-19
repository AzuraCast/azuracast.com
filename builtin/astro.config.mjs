import { defineConfig } from 'astro/config';

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["bootstrap", "roboto-font"],
    },
  },
  base: "/docs",
  integrations: [
    starlight({
      title: "AzuraCast Local Docs",
      logo: {
        src: "./src/images/logo.svg",
      },
      favicon: "/img/logo.svg",
      customCss: ["./src/scss/starlight.scss"],
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/azuracast",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/azuracast/azuracast",
        },
      ],
      sidebar: [
        { label: "About These Docs", link: "/" },
        { label: "Live Documentation", link: "https://www.azuracast.com/docs" },
        { label: "API Documentation", link: "/api/" },
        { label: "Update AzuraCast", link: "/getting-started/updates/" },
        {
          label: "Help",
          items: [{ autogenerate: { directory: "help" } }],
        },
        {
          label: "User Guide",
          items: [{ autogenerate: { directory: "user-guide" } }],
        },
        {
          label: "Administrator Guide",
          items: [{ autogenerate: { directory: "administration" } }],
        },
        {
          label: "For Developers",
          items: [{ autogenerate: { directory: "developers" } }],
        },
      ],
    }),
  ],
});
