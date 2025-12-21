import { defineConfig } from 'astro/config';

import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config

export default defineConfig({
  server: {
    host: true,
  },
  site: "https://www.azuracast.com",
  vite: {
    ssr: {
      noExternal: ["bootstrap", "roboto-font"],
    },
  },
  integrations: [
    starlight({
      title: "AzuraCast",
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
      editLink: {
        baseUrl: "https://github.com/azuracast/azuracast.com/tree/main",
      },
      sidebar: [
        { label: "Home", link: "/" },
        { label: "About AzuraCast", link: "/docs" },
        { label: "Live Demo", link: "/docs/live-demo" },
        {
          label: "Install AzuraCast",
          link: "/docs/getting-started/installation",
        },
        { label: "Update AzuraCast", link: "/docs/getting-started/updates" },
        {
          label: "Help",
          autogenerate: { directory: "docs/help" },
        },
        {
          label: "User Guide",
          autogenerate: { directory: "docs/user-guide" },
        },
        {
          label: "Administrator Guide",
          autogenerate: { directory: "docs/administration" },
        },
        {
          label: "Contribute",
          autogenerate: { directory: "docs/contribute" },
        },
        {
          label: "For Developers",
          autogenerate: { directory: "docs/developers" },
        },
      ],
    }),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: "_blank",
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              width: 12,
              height: 12,
              viewBox: "0 0 16 16",
              style:
                "display: inline; margin-left: 0.3rem; margin-right: 0.1rem",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  fill: "currentcolor",
                  d: "M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  fill: "currentcolor",
                  d: "M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z",
                },
              },
            ],
          },
        },
      ],
    ],
  },
});
