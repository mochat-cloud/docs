module.exports = {
    title: 'MoChat',
    description: '让企业微信开发更简单',
    themeConfig: {
        nav: [
            { text: 'Github', link: 'https://github.com/mochat-cloud/mochat' },
            { text: '应用开发', link: 'https://mochat.wiki/app-dev/example' },
            { text: '数据库字典', link: 'https://mochat.wiki/database/md/tables.html' },
            { text: 'API文档', link: 'https://mochat.wiki/api/' },
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
                    '/quick-start/install-bt',
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
                    '/framework/layering',
                    '/framework/standards',
                    '/framework/file',
                    '/framework/config',
                    '/framework/exception',
                    '/framework/log',
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
            {
                title: '版本升级指南',
                path: '/upgrade/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/upgrade/1.1',
                    '/upgrade/1.0',
                ]
            },
            {
                title: '企业微信相关',
                path: '/wework/',
                collapsable: false,
                sidebarDepth: 3,
                children: [
                    '/wework/how-to-authorize',
                    '/wework/get-corpid-secret',
                    '/wework/add-sidebar-app',
                    '/wework/open-platform',
                    '/wework/use-faq',
                    '/wework/weixin-compare-wework',
                ]
            },
        ]
    },
    markdown: {
        toc: {includeLevel: [1, 2, 3]}
    },
}