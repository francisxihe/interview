import{_ as e,c as t,o as r,U as l}from"./chunks/framework.n5rCxQTk.js";const V=JSON.parse('{"title":"Vue2 双向绑定原理/依赖收集","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge/framework/Vue/index.md","filePath":"knowledge/framework/Vue/index.md"}'),a={name:"knowledge/framework/Vue/index.md"},o=l('<h3 id="说一下-vue-的核心原理" tabindex="-1">说一下 Vue 的核心原理 <a class="header-anchor" href="#说一下-vue-的核心原理" aria-label="Permalink to &quot;说一下 Vue 的核心原理&quot;">​</a></h3><p><span class="tag red">淘天</span></p><details class="details custom-block"><summary>题解</summary><p>原理包括以下几个方面：</p><ol><li><strong>响应式系统</strong>：</li></ol><p>Vue.js 使用了响应式系统，这意味着当应用程序的状态改变时，视图会自动更新。Vue.js 实现这一点主要是通过 Object.defineProperty() 方法或在 Vue 3 中使用 Proxy 对象，来跟踪数据对象的属性变化。每当数据发生变化时，视图会重新渲染，从而保证了数据和视图的同步。</p><ol start="2"><li><strong>虚拟 DOM (VDOM)</strong>：</li></ol><p>Vue.js 使用虚拟 DOM 来优化 DOM 操作，提高应用程序的性能。虚拟 DOM 是 DOM 元素的 JavaScript 对象表示。在数据改变时，Vue.js 首先操作虚拟 DOM，然后比较新的虚拟 DOM 与旧的虚拟 DOM 的差异，并仅将必要的改动应用到实际的 DOM 上，这样减少了直接操作 DOM 的开销。</p><ol start="3"><li><strong>指令系统</strong>：</li></ol><p>Vue.js 提供了一系列内置指令（如 v-bind, v-model, v-if, v-for 等），使得开发者可以在模板中进行各种操作，如数据绑定、条件渲染、列表渲染等。开发者还可以自定义指令。</p><ol start="4"><li><strong>生命周期钩子</strong>：</li></ol><p>Vue 实例有一系列的生命周期钩子，如 created, mounted, updated, destroyed 等。这些钩子为开发者提供了在不同阶段介入组件行为的机会，如在组件创建后请求数据，在组件销毁前清理资源等。</p><ol start="5"><li><strong>组件系统</strong>：</li></ol><p>Vue.js 提倡组件化的开发方式。一个 Vue 应用由多个组件构成，每个组件代表了应用中的一部分 UI。组件是可复用的 Vue 实例，它们各自拥有独立的视图和数据逻辑。组件化可以使得代码更加模块化、易于维护和测试。</p><ol start="6"><li><strong>模板语法</strong>：</li></ol><p>Vue.js 提供了声明式的模板语法，允许用户以直观的方式描述界面结构。在模板中，你可以使用简单的标记语法来声明式地将数据绑定到 DOM 元素上。当数据变化时，DOM 将自动更新以反映数据的最新状态。</p><ol start="7"><li><strong>双向数据绑定</strong>：</li></ol><p>通过 v-model 指令，Vue.js 支持表单输入元素的双向数据绑定。这意味着你可以将表单元素的值与 Vue 实例的数据属性绑定在一起。当输入框的内容发生变化时，绑定的数据也会更新；反之亦然。</p></details><h3 id="vue2-响应式原理" tabindex="-1">Vue2 响应式原理 <a class="header-anchor" href="#vue2-响应式原理" aria-label="Permalink to &quot;Vue2 响应式原理&quot;">​</a></h3><details class="details custom-block"><summary>题解</summary><ol><li><strong>数据劫持</strong></li></ol><p>Vue 在初始化一个组件时，会对组件的 <code>data</code> 对象进行处理，利用 <code>Object.defineProperty()</code>（在 Vue 2 中）或 <code>Proxy</code>（在 Vue 3 中）对数据对象的每个属性进行劫持。</p><ul><li><p><strong>Vue 2 中的 Object.defineProperty()</strong>：</p><ul><li>Vue 2 通过 <code>Object.defineProperty()</code> 为数据对象的每个属性创建 getter 和 setter。</li><li>Getter 用于依赖收集：当访问某个属性时，收集当前的依赖（如计算属性、watchers）。</li><li>Setter 用于侦测变化：当属性值改变时，通知所有依赖于这个属性的地方重新计算或重新渲染。</li></ul></li><li><p><strong>Vue 3 中的 Proxy</strong>：</p><ul><li>Vue 3 使用了 ES6 的 <code>Proxy</code> 对象，它直接在对象层面进行拦截。</li><li><code>Proxy</code> 可以直接监听对象及其嵌套子对象的变化，解决了 Vue 2 中 <code>Object.defineProperty()</code> 不能直接监听数组索引和对象属性添加/删除的问题。</li></ul></li></ul><ol start="2"><li><strong>依赖收集</strong></li></ol><p>每个组件实例都有对应的 watcher 实例。当组件渲染时，它会访问与其模板中声明的响应式数据相关的属性，这时数据的 getter 就会执行。</p><ul><li><strong>依赖收集的目的</strong>：</li></ul><p>是为了让数据知道谁依赖于它，当数据变化时，Vue 知道应该通知哪些依赖（watcher）进行更新。</p><ul><li><strong>Watcher</strong>：</li></ul><p>每个组件有一个渲染 watcher，计算属性和用户定义的 watch 也会生成对应的 watcher。</p><ol start="3"><li><strong>更新视图</strong></li></ol><p>当响应式数据发生变化时，setter 就会被触发。</p><ul><li><strong>通知 Watchers</strong>：</li></ul><p>Setter 通知所有依赖于这个数据的 watcher，告诉它们数据已经改变。</p><ul><li><strong>重新渲染</strong>：</li></ul><p>每个 watcher 接收通知后，会重新评估自己，如果是渲染 watcher，它会导致组件重新渲染。</p><ol start="4"><li><strong>虚拟 DOM 和 DOM 更新</strong></li></ol><p>Vue 使用虚拟 DOM 来减少直接操作真实 DOM 的频率，提高性能。</p><ul><li><strong>生成虚拟 DOM</strong>：</li></ul><p>当数据变化导致重新渲染时，Vue 会先生成新的虚拟 DOM。</p><ul><li><strong>DOM Diff 算法</strong>：</li></ul><p>Vue 接着会比较新旧虚拟 DOM 的差异。</p><ul><li><strong>高效更新</strong>：</li></ul><p>根据差异，Vue 会进行最小量的 DOM 更新，而不是重建整个 DOM 树。</p></details><h3 id="vue2和vue3的区别" tabindex="-1">Vue2和Vue3的区别 <a class="header-anchor" href="#vue2和vue3的区别" aria-label="Permalink to &quot;Vue2和Vue3的区别&quot;">​</a></h3><p><span class="tag red">淘天</span></p><details class="details custom-block"><summary>题解</summary><h3 id="_1-响应式系统" tabindex="-1">1. 响应式系统 <a class="header-anchor" href="#_1-响应式系统" aria-label="Permalink to &quot;1. 响应式系统&quot;">​</a></h3><ul><li><strong>Vue 2</strong> 使用 <code>Object.defineProperty()</code> 来实现响应式系统。这种方法有一些限制，比如不能检测到对象属性的添加或删除，也不能直接监控数组索引和长度的变化。</li><li><strong>Vue 3</strong> 引入了基于 ES6 的 <code>Proxy</code> 对象来实现响应式系统。这允许 Vue 直接监控对象和数组的变化，包括属性的添加和删除，以及更有效的性能。</li></ul><h3 id="_2-组合式-api" tabindex="-1">2. 组合式 API <a class="header-anchor" href="#_2-组合式-api" aria-label="Permalink to &quot;2. 组合式 API&quot;">​</a></h3><ul><li><strong>Vue 2</strong> 主要使用选项式 API，这意味着在组件中，相关的功能代码（如数据、方法、生命周期钩子）被分散到不同的选项中。</li><li><strong>Vue 3</strong> 引入了组合式 API（如 <code>setup</code> 函数、<code>ref</code> 和 <code>reactive</code> 等），允许开发者在单个逻辑单元内组织代码，使得代码组织更加灵活和可维护。</li></ul><h3 id="_3-typescript-支持" tabindex="-1">3. TypeScript 支持 <a class="header-anchor" href="#_3-typescript-支持" aria-label="Permalink to &quot;3. TypeScript 支持&quot;">​</a></h3><ul><li><strong>Vue 2</strong> 原生支持有限，虽然可以与 TypeScript 结合使用，但集成过程并不那么顺畅。</li><li><strong>Vue 3</strong> 是用 TypeScript 编写的，为 TypeScript 用户提供了更好的集成和类型检查支持。</li></ul><h3 id="_4-新的内置功能" tabindex="-1">4. 新的内置功能 <a class="header-anchor" href="#_4-新的内置功能" aria-label="Permalink to &quot;4. 新的内置功能&quot;">​</a></h3><ul><li><strong>Vue 3</strong> 引入了一些新的功能，如 Fragment（允许组件返回多个根节点）、Teleport（用于将子节点渲染到 DOM 树的其他位置）和 Suspense（用于异步组件加载状态的处理）。</li></ul><h3 id="_5-树摇动和模块化" tabindex="-1">5. 树摇动和模块化 <a class="header-anchor" href="#_5-树摇动和模块化" aria-label="Permalink to &quot;5. 树摇动和模块化&quot;">​</a></h3><ul><li><strong>Vue 3</strong> 的设计更加模块化，有利于树摇动（tree-shaking），这意味着如果你没有使用某个特性，它不会被包含在最终的构建中，从而减少应用的体积。</li></ul><h3 id="_6-自定义渲染器" tabindex="-1">6. 自定义渲染器 <a class="header-anchor" href="#_6-自定义渲染器" aria-label="Permalink to &quot;6. 自定义渲染器&quot;">​</a></h3><ul><li><strong>Vue 3</strong> 提供了创建自定义渲染器的 API，允许开发者使用 Vue 的响应式系统来创建不同的渲染输出。Vue3 把响应式系统和组件系统抽离出来，既可以对接 dom，也可以对接原生应用（类似 RN，不过还未落地）。</li></ul></details><h1 id="vue2-双向绑定原理-依赖收集" tabindex="-1">Vue2 双向绑定原理/依赖收集 <a class="header-anchor" href="#vue2-双向绑定原理-依赖收集" aria-label="Permalink to &quot;Vue2 双向绑定原理/依赖收集&quot;">​</a></h1><ol><li>初始化的时候，创建 Observer 遍历数据，用 Object.defineProperty 或者 Proxy 定义 getter/setter，并生成一个依赖（放在闭包中，getter/setter 可以访问到），等待 watcher 调用；</li><li>render 时，模板中的每一处绑定了数据的地方（View），都会创建一个 watcher；</li><li>watcher 被创建时，也就是首次（调用相应的 getter）获取字段值的时候，就会把 watcher 和 dep 关联起来 <ol><li>通过 Dep.target，笔者认为这是为了找到调用栈深处的 watcher 实例</li></ol></li><li>当改变数据时，setter 被调用，dep 通知所有 watcher 更新视图。</li></ol><h2 id="vue2-数组监测" tabindex="-1">Vue2 数组监测 <a class="header-anchor" href="#vue2-数组监测" aria-label="Permalink to &quot;Vue2 数组监测&quot;">​</a></h2><p>vue2 是在数组实例与 Array.prototype 之间架设一个中间代理对象，将原 push、pop 等方法高阶一下放在这个中间对象上，调用 push 等方法会找到这些高阶函数而不是 Array.prototype 上，最大的缺点是对于数组长度变化无能为力。</p><p>vue3 使用 Proxy 实现，天然支持观察数组。</p><h1 id="nexttick-作用、原理" tabindex="-1">nextTick 作用、原理 <a class="header-anchor" href="#nexttick-作用、原理" aria-label="Permalink to &quot;nextTick 作用、原理&quot;">​</a></h1><p>在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。</p><p>nextTick 主要使用了宏任务和微任务。 根据执行环境分别尝试采用 Promise、MutationObserver、setImmediate，如果以上都不行则采用 setTimeout 。</p><p>多次调用 nextTick 会将任务存入队列中，更新结束后统一处理。</p><h1 id="keep-alive-原理" tabindex="-1">keep-alive 原理 <a class="header-anchor" href="#keep-alive-原理" aria-label="Permalink to &quot;keep-alive 原理&quot;">​</a></h1><p>就是缓存实例和 VNode</p><h1 id="交叉生命周期" tabindex="-1">交叉生命周期 <a class="header-anchor" href="#交叉生命周期" aria-label="Permalink to &quot;交叉生命周期&quot;">​</a></h1><ul><li>parent beforeCreate</li><li>parent created</li><li>parent beforeMount <ul><li>child beforeCreate</li><li>child created</li><li>child beforeMount</li><li>child mounted</li></ul></li><li>parent mounted</li><li>parent beforeUpdate <ul><li>child beforeUpdate (如果只是 child 更新自己内部变量、与 parent 无关，则不会触发 parent update。parent 同理)</li><li>child updated</li></ul></li><li>parent updated</li><li>parent beforeDestroy (vue3 改名成了 unmount) <ul><li>child beforeDestroy</li><li>child destroyed</li></ul></li><li>parent destroyed</li></ul>',21),i=[o];function s(u,n,d,c,p,h){return r(),t("div",null,i)}const m=e(a,[["render",s]]);export{V as __pageData,m as default};
