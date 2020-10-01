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
      {
        text: 'Guides', items: [
          { text: 'Installation', link: '/install/' },
          { text: 'Administration', link: '/administration/' },
          { text: 'Station Management', link: '/station-management/' },
          { text: 'Troubleshooting', link: '/help/' },
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
        'docker-sh',
        'liquidsoap-annotations'
      ],
      '/install/': [
        '',
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
          title: 'Roles & Permissions',
          children: [
            'roles/'
          ]
        },
        {
          title: 'Station',
          children: [
            'station/'
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
            'media/',
            'media/sftp'
          ]
        },
        {
          title: 'Playlists',
          children: [
            'playlists/',
            'playlists/advanced-playlists'
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
            'djs/streaming-software'
          ]
        }
      ],
      '/extending/': [
        '',
        'advanced-features',
        'cloudflare',
        'letsencrypt',
        'modifying-docker',
        'multisite'
      ],
      '/contributing/': [
        ''
      ],
      '/help/': [
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
      '/': [
        'donate',
        'code-of-conduct',
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
