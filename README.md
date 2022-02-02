# small-vue

根据 Vue 以及B站[阿崔cxr](https://space.bilibili.com/175301983?from=search&seid=1067848617930783014&spm_id_from=333.337.0.0)的 mini-vue 复刻出来的一个小型的玩具vue框架，以助于自己了解 Vue 原理

大家喜欢的可以来个 Star 关注一下，以后会有更多内容分享

目前进度

- [x] reactivity 的核心流程
- [x] runtime-core 初始化的核心流程
- [x] runtime-core 更新的核心流程
- [x] setup环境-集成jest做单元测试-集成 ts
- [x] 实现 effect & reactive & 依赖收集 & 触发依赖
- [x] 实现 effect 返回 runner
- [x] 实现 effect 的scheduler 功能
- [x] 实现 effect 的 stop 功能
- [x] 实现 readonly 功能
- [x] 实现 isReactive 和 isReadonly
- [x] 优化 stop 功能
- [x] 实现 reactive 和 readonly 嵌套对象转换功能
- [x] 实现 shallowReadonly 功能
- [x] 实现 isProxy 功能
- [x] 实现 ref 功能
- [x] 实现 isRef 和 unRef 功能
- [x] 实现 proxyRefs 功能
- [x] 实现 computed 计算属性功能
- [x] 实现初始化 component 主流程
- [x] 使用 rollup 打包库
- [x] 实现初始化 element 主流程
- [x] 实现组件代理对象
- [x] 实现 shapeFlags
- [x] 实现注册事件功能
- [x] 实现组件 props 功能
- [x] 实现组件 emit 功能
- [x] 实现组件 slots 功能
- [x] 实现 Fragment 和 Text 类型节点
- [x] 实现 getCurrentInstance
- [x] 实现依赖注入功能（provide/inject）
- [x] 实现自定义渲染器 custom renderer
- [x] 更新element流程搭建
- [x] 更新element 的 props
- [x] 更新 element 的 children array to text
- [x] 更新 element 的 children text to text
- [x] 更新 element 的 children text to array
- [x] 更新 element 的 children - 双端对比diff 算法（1）

- [x] 自动提交代码命令实现(Vue开发时的提交流程简化，命令如下)

```bash
yarn release
```

待完成

- [ ] 更新 element 的 children - 双端对比diff 算法 （2）
- [ ] 更新 element 的 children - 双端对比diff 算法 （3）
- [ ] 学习尤大解决 bug 的处理方式
- [ ] 实现组件更新功能
- [ ] 实现 nextTick 功能
- [ ] 编译模块概述
- [ ] 实现解析插值功能
- [ ] 实现解析element 标签

如果对我感兴趣的话，你也可以在以下渠道了解一下我

Gitee：[![Gitee](https://camo.githubusercontent.com/2aeae18a20a92644d909b9c925e63520238d404db151f2c3cdc5d76d2c5cf976/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f566978636974792d47697465652d7265642e7376673f7374796c653d666c61742d737175617265266c6f676f3d6769746565)](https://gitee.com/vixcity)

博客：[![Blog](https://camo.githubusercontent.com/90816be5895db1ca7e6f14d4df0d72f6d5c5c2a0305451c3a6f9969fd3e2bb0b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f566978636974792d426c6f672d6f72616e67652e7376673f7374796c653d666c61742d737175617265266c6f676f3d626c6f67)](http://vixcity.gitee.io/my-gitee-blog/)

Github：[![Github](https://camo.githubusercontent.com/8ae6b750741e19628321363ba73e412ebd00fd6fcb8bae728f4afa6c240408cc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f566978636974792d4769746875622d626c61636b2e7376673f7374796c653d666c61742d737175617265266c6f676f3d676974687562)](https://github.com/Vixcity)
