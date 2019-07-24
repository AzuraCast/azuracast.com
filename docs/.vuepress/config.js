module.exports = {
  title: 'AzuraCast',
  description: 'Simple, Self-Hosted Web Radio',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: `/img/logo.png` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `/icons/apple-touch-icon.png` }],
    ['link', { rel: 'icon', sizes: '32x32', href: `/icons/favicon-32x32.png` }],
    ['link', { rel: 'icon', sizes: '16x16', href: `/icons/favicon-16x16.png` }],
    ['link', { rel: 'shortcut icon', href: `/icons/favicon.ico` }],
    ['meta', { name: 'msapplication-TileColor', content: '#2196F3' }],
    ['meta', { name: 'theme-color', content: '#2196F3' }]
  ],
  themeConfig: {
    repo: 'azuracast/azuracast',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Install', link: '/install/' },
      { text: 'Help', link: '/help/' },
      { text: 'For Developers', link: '/developers/' },
      { text: 'Donate', link: '/donate' }
    ],
    docsRepo: 'azuracast/azuracast.com',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    lastUpdated: true,
    sidebar: {
      '/about/': [
        '',
      ],
      '/install/': [
        ''
      ],
      '/developers/': [
        '',
        'api',
        'cli',
        'docker_sh',
        'liquidsoap_annotations',
      ],
      '/help/': [
        '',
        'logs',
        'known_issues',
        'faq_docker',
        'faq_ansible',
        'cloudflare',
        'streaming_software',
        'advanced_playlists',
      ],
      '/': [
        'about/',
        'install/',
        'developers/',
        'help/',
        'donate',
        'code_of_conduct',
        'privacy'
      ]
    }
  },
  extendMarkdown: {
    toc: { includeLevel: [2] }
  },
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-120542341-1'
    }]
  ],
}
