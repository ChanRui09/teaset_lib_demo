# 问题列表

## 0.72
> [!TIP] [ ] 表示未完成 [x] 表示已完成
- [x] [添加集成demo](https://github.com/ChanRui09/teaset_lib_demo/commit/895e03ee017632f3ef500d7178231aa547eb3739)
- [x] [鸿蒙NavigatorBreadcrumbNavigationBarStyles文件缺失](https://github.com/ChanRui09/teaset_lib_demo/commit/141ddaf4d930f18024c46bd09c1ca01b92a42b77)
- [x] [Easing 导入修复](https://github.com/ChanRui09/teaset_lib_demo/commit/552f23a18b3a6e843519f6d9822cefb5585a13cd)
- [x] [reactNativeVersion 属性为空](https://github.com/ChanRui09/teaset_lib_demo/commit/3211eaf1b8086148af044cbcafdc96635d95d7ee)
- [x] [style 未定义](https://github.com/ChanRui09/teaset_lib_demo/commit/1f07c0f3da8e294f15623e75d41f26a9dac16d73)
- [x] [PopoverPicker 气泡抖动、卡死](https://github.com/ChanRui09/teaset_lib_demo/commit/f49863bb1d4301c8165c5515ee392295194dc750)
- [x] [SegmentedBar 在滚动模式下的指示器和item的同步问题](https://github.com/ChanRui09/teaset_lib_demo/commit/0273cbd797ed6bd86fae5ef9676b702b848a7a38) 
- [x] [**黑屏和组件错位问题已经通过重写TeaNavigator.js修复，需配置：@react-native-oh-tpl/react-native-screens**](https://github.com/ChanRui09/teaset_lib_demo/commit/6271593572ab70b3bce04ae1b6abdbcffe6c6e70) 
- [x] 重新启动程序进入 teaset 的 home 界面选择 Checkbox 作为第一个页面进入后点击 checkbox 会出现黑屏的问题
- [x] 重新启动程序进入 teaset 的 home 界面选择 Wheel 作为第一个页面进入后进行操作会出现黑屏问题
- [x] 重新启动程序进入 teaset 的 home 界面选择 SegmentedView 作为第一个页面进入后点击 item 会出现黑屏问题
- [x] 重新启动程序进入 teaset 的 home 界面选择 TransformView 作为第一个页面进入后进行操作会出现黑屏问题
- [x] 重新启动程序进入 teaset 的 home 界面选择 Overlay 作为第一个页面进入后点击 Popover 下的 checkbox 会出现黑屏的问题
- [x] 重新启动程序进入 teaset 的 home 界面选择 SegmentedView 作为第一个页面进入后点击 type 弹窗显示在 home 界面
- [x] 重新启动程序进入 teaset 的 home 界面选择 ActionPopover 作为第一个页面进入后点击 show 弹窗显示在 home 界面
- [x] **Overlay 界面的 Pop zoom out 和 Pop zoom in 效果异常 (在适配 0.77 的过程中已经修复)**  
- [x] [NavigatorBar 界面 type 选择 auto 时因缺少 harmony 平台判断不可用 - Invalid prop type of value harmony supplied to NavigationBar, expected one of ["auto","ios","android"]](https://github.com/ChanRui09/teaset_lib_demo/commit/2906c01c9839118ba9d4541e4eddbeea194161e6)  
- [x] [适配 0.77 过程中 NavigatorBar 界面 Tint color 选择 none 时报错：TypeError: Cannot read property 'tintColor' of null](https://github.com/ChanRui09/teaset_lib_demo/commit/be482960e36c0232257859e2501c89ca18dc4183)  
- [x] Home 界面有二次进入问题，其余导航正常
- [x] Theme 设置主题后 home 界面不生效，只在子页面生效
- [x] **SegmentBar 在 Justify item 为 scrollable 的情况下，配置 indicator type 切换 itemWidth 和 boxWidth无变化(像是使用了boxWidth)(安卓demo效果一致)**
- [x] Wheel 时间不对（中间的月份）
- [x] NavigationBar 设置 Status bar hidden 隔一次不生效
- [x] [**NavigationBar 的 statusbar 控制逻辑异常(设置隐藏 statusBar 之后，操作 hidden、 custom background 时，状态栏又会显示)**](https://github.com/ChanRui09/teaset_lib_demo/commit/881f8061fb98ec090d63c3e4a41d0095d49788bb)
- [x] 存在切换主题后状态栏不同步更新，进入任意界面后触发更新的问题
- [ ] 0.72 的 demo 中 Overlay 页面的 Popover 下的 shadow 属性异常(0.72 和 0.77 都不支持)
- [ ] **0.72 在切换页面时状态栏闪烁**
- 待更新
## 0.77 (基于0.72)
> [!TIP] [ ] 表示未完成 [x] 表示已完成
- [x] [在0.72基础上的 style 未定义: 需替换 TextPropTypes, ImagePropTypes, TextInputPropTypes](https://github.com/ChanRui09/teaset_lib_demo/commit/ff6d5b34b1f30e6e1be9c274bca36840fef6c71e)
- [x] [适配 0.77 过程中的 React.createContext() 报错 - 从 Legacy Context API 到 React 18 Context API 的修改](https://github.com/ChanRui09/teaset_lib_demo/commit/ed2b30dce1784e873f4b806abfa16416396edfa2)   
(1) TeaNavigator uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead.  
(2) NavigationBar uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead.  
(3) TopView uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead  
(4) TopView uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
(5) Home uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
(6) NavigationTitle uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
- [x] 点击 home 界面的任意条目报错：The root component is NOT TeaNavigator, then you can not use BasePage.navigator.
- [x] 点击 home 界面的任意条目报错：TypeError: Cannot read property 'push' of null
> **[!TIP] 上面两条错误是由于 React.createContext() 报错导致的**
- [x] [库中的 createRef() 报错 - 字符串 refs 修改为 React.createRef()](https://github.com/ChanRui09/teaset_lib_demo/commit/5192ff367ab61909c00411033f59dcce591f0803)
- [x] [demo 中的 createRef() 报错](https://github.com/ChanRui09/teaset_lib_demo/commit/dfcfcf71ab29ca58802641338c250701491ed860)  
(1) Component "RCTView" contains the string ref "containerView". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.  
(2) Component "SwipeTouchableOpacity" contains the string ref "animatedView". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.  
- [x] [**demo 中进入任意界面，操作可交互的组件基本都存在黑屏问题(通过重写TeaNavigator.js修复,需配置 @react-native-oh-tpl/react-native-screens)**](https://github.com/ChanRui09/teaset_lib_demo/commit/6271593572ab70b3bce04ae1b6abdbcffe6c6e70)
- [x] Theme 设置主题后 home 界面不生效，只在子页面生效
- [x] **SegmentBar 在 Justify item 为 scrollable 的情况下，配置 indicator type 切换 itemWidth 和 boxWidth无变化(像是使用了boxWidth)(安卓demo效果一致)**
- [x] NavigationBar 设置 Status bar hidden 隔一次不生效
- [x] 进入TransformView 界面报错：Component "TransformView" contains the string ref "view". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.
- [x] TabView 界面 type 选择 carousel 报错：Component "RCTView" contains the string ref "carousel". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.
- [x] [**NavigationBar 的 statusbar 控制逻辑异常(设置隐藏 statusBar 之后，操作 hidden、 custom background 时，状态栏又会显示)**](https://github.com/ChanRui09/teaset_lib_demo/commit/881f8061fb98ec090d63c3e4a41d0095d49788bb)
- [x] 存在切换主题后状态栏不同步更新，进入任意界面后触发更新的问题
- [ ] 0.77 的 demo 中 Overlay 页面的 Popover 下的 shadow 属性异常(0.72 和 0.77 都不支持)
- [ ] 0.77 存在些许闪屏问题, **AlbumView 界面点击图片缩略图，闪屏尤为明显**
- 待更新
