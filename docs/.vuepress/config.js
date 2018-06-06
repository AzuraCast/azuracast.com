module.exports = {
    title: 'AzuraCast',
    description: 'Web Radio Made Simple',
    dest: 'public',
    themeConfig: {
        repo: 'azuracast/azuracast',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'About', link: '/about' },
          { text: 'Install', link: '/install' }
        ],
        docsRepo: 'https://gitlab.com/azuracast/azuracast.com',
        docsDir: 'docs',
        docsBranch: 'master',
        sidebar: [
            '/about',
            '/demo',
            '/install',
            '/api'
        ]
    }
}