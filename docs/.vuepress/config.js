module.exports = {
    title: 'MoChat',
    description: '让企业微信开发更简单',
    themeConfig: {
        nav: [
            { text: 'Github', link: 'https://github.com/mochat-cloud/mochat' },
            { text: '应用开发', link: '/app-dev/example' },
        ],
        sidebar: [
            {
                title: '前言',
                path: '/introduction/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/introduction/',
                    '/introduction/communication',
                    '/introduction/license',
                    '/introduction/contribute',
                ]
            },
            {
                title: '版本管理',
                path: '/version/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/version/release-planning',
                    '/version/versions',
                    '/version/changelogs',
                ]
            },
            {
                title: '快速入门',
                path: '/quick-start/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/quick-start/install',
                    '/quick-start/overview',
                    '/quick-start/questions',
                ]
            },
            {
                title: '核心架构',
                path: '/framework/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/framework/catalogue',
                    '/framework/standards',
                    '/framework/exception',
                ]
            },
            {
                title: '应用开发',
                path: '/app-dev/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/app-dev/example',
                ]
            },
        ]
    },
    markdown: {
        toc: {includeLevel: [1, 2, 3]}
    },
}