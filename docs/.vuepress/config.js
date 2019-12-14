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
      { text: 'Help', link: '/troubleshooting/' },
      {
        text: 'Guides', items: [
          { text: 'Installation', link: '/install/' },
          { text: 'Administration', link: '/administration/' },
          { text: 'Station Management', link: '/station-management/' },
          { text: 'Troubleshooting', link: '/troubleshooting/' },
          { text: 'Developers', link: '/developers/' },
          { text: 'Extending', link: '/extending/' },
          { text: 'Contributing', link: '/contributing/' },
        ]
      },
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
      '/developers/': [
        '',
        'api',
        'nowplaying',
        'cli',
        'docker_sh',
        'liquidsoap_annotations'
      ],
      '/installation/': [
        '',
        'digitalocean',
        'linode',
        'docker',
        'raspberry-pi',
        'ansible'
      ],
      '/administration/': [
        {
          title: 'Administration',
          children: [
            ''
          ]
        },
        {
          title: 'System',
          children: [
            'system/',
            'system/initial-setup',
            'system/updating',
            'system/backup'
          ]
        },
        {
          title: 'Station',
          children: [
            'station/'
          ]
        },
        {
          title: 'Files',
          children: [
            'files/',
            'files/ftp',
            'files/docker'
          ]
        },
        {
          title: 'Users',
          children: [
            'users/'
          ]
        },
      ],
      '/station-management/': [
        {
          title: 'Media',
          children: [
            'media/'
          ]
        },
        {
          title: 'Playlists',
          children: [
            'playlists/',
            'playlists/advanced_playlists'
          ]
        },
        {
          title: 'Mount Points',
          children: [
            'mounts/'
          ]
        },
        {
          title: 'Remote Relays',
          children: [
            'relays/'
          ]
        },
        {
          title: 'Streamers/DJs',
          children: [
            'djs/',
            'djs/streaming_software'
          ]
        }
      ],
      '/extending/': [
        '',
        'cloudflare',
        'multisite'
      ],
      '/contributing/': [
        ''
      ],
      '/troubleshooting/': [
        {
          title: 'Troubleshooting',
          children: [
            ''
          ]
        },
        {
          title: 'Viewing Logs',
          children: [
            'logs/'
          ]
        },
        {
          title: 'Docker Installations',
          children: [
            'docker/'
          ]
        },
        {
          title: 'Ansible Installations',
          children: [
            'ansible/'
          ]
        }
      ],
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
