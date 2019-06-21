module.exports = {
    title: 'AzuraCast',
    description: 'Simple, Self-Hosted Web Radio',
    dest: 'public',
    ga: 'UA-120542341-1',
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
          { text: 'Documentation', link: '/documentation/' },
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
            'resellers'
          ],
          '/help/': [
            '',
            'logs',
            'faq_docker',
            'faq_ansible',
          ],
          '/install/': [
            ''
          ],
          '/documentation/': [
            '',
            'streaming_software',
            'api',
            'cli',
            'docker_sh',
            'liquidsoap_annotations',
            'advanced_playlists',
          ],
          '/': [
            'about/',
            'install/',
            'documentation/',
            'help/',
            'donate',
            'privacy'
          ]
        }
    }
}
