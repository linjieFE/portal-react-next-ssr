This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Next.js 是一个轻量级的 React 服务端渲染应用框架。有了它我们可以简单轻松的实现React的服务端渲染，从而加快首屏打开速度，也可以作SEO（收索引擎优化了）。在没有Next.js的时候，用React开发需要配置很多繁琐的参数，如Webpack配置，Router配置和服务器端配置等....。如果需要作SEO，要考虑的事情就更多了，怎么样服务端渲染和客户端渲染保持一致就是一件非常麻烦的事情，需要引入很多第三方库。但有了Next.js，这些问题都解决了，使开发人员可以将精力放在业务逻辑上

### 为什么用SSR 
react vue （SPA）`single page web application` 
    - 单页面 首屏加载慢 不能SEO google尚可 国内支持不好
### 为什么用next
    1.快速
    2.自动数据同步
    3.插件机制
    4.灵活配置
### 优缺点
好处

默认情况下，每个组件都是服务器渲染的
自动代码拆分，加快页面加载速度
不加载不必要的代码
简单的客户端路由（基于页面）
基于Webpack的开发环境，支持模块热更新（HMR）
获取数据非常简单
支持任何Node HTTP服务器实现，如Express
支持Babel和Webpack自定义
能够部署在任何能运行node的平台
内置页面搜索引擎优化（SEO）处理
社区相当活跃

缺点

Next不是后端服务，应该与后台操作独立开
如果你只想创建一个简单的WEB应用，那么它可能会是牛刀杀鸡
数据会在客户端和服务器重复加载
没有实现前后分离的项目，迁移到Next是一件痛苦的事，可能需要双倍工作
性能

性能基于一下两点
1、使用Apache Bench测试吞吐量。
2、使用 lighthouse测试 Preformance、Accessibility、Best Practices、SEO
`lighthouse测试报告中可以看到Preformance、Accessibility、Best Practices、SEO都高于70`

next安装
1. 手动安装 `yarn add react react-dom next`
2. 脚手架 `creat-next-app`
