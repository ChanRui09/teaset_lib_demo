# 任务列表

## 0.72
> [!TIP] [ ] 表示未完成任务 [x] 表示已完成任务
- [x] [添加集成demo](https://github.com/ChanRui09/teaset_lib_demo/commit/895e03ee017632f3ef500d7178231aa547eb3739)
- [x] [鸿蒙NavigatorBreadcrumbNavigationBarStyles文件缺失](https://github.com/ChanRui09/teaset_lib_demo/commit/141ddaf4d930f18024c46bd09c1ca01b92a42b77)
- [x] [Easing 导入修复](https://github.com/ChanRui09/teaset_lib_demo/commit/552f23a18b3a6e843519f6d9822cefb5585a13cd)
- [x] [reactNativeVersion 属性为空](https://github.com/ChanRui09/teaset_lib_demo/commit/3211eaf1b8086148af044cbcafdc96635d95d7ee)
- [x] [style 未定义](https://github.com/ChanRui09/teaset_lib_demo/commit/1f07c0f3da8e294f15623e75d41f26a9dac16d73)
- [x] [PopoverPicker 气泡抖动、卡死](https://github.com/ChanRui09/teaset_lib_demo/commit/f49863bb1d4301c8165c5515ee392295194dc750)
- [x] [SegmentedBar 在滚动模式下的指示器和item的同步问题](https://github.com/ChanRui09/teaset_lib_demo/commit/0273cbd797ed6bd86fae5ef9676b702b848a7a38) 
- [ ] 重新启动程序选择 Wheel 作为第一个页面进入后进行操作会出现黑屏问题
- [ ] 重新启动程序选择 SegmentedView 作为第一个页面进入后点击 item 会出现黑屏问题
- [ ] 重新启动程序选择 SegmentedView 作为第一个页面进入后点击 type 弹窗显示在 home 界面
- [ ] 重新启动程序选择 Overlay 作为第一个页面进入后点击 Popover 下的 checkbox 会出现黑屏的问题
- [ ] 重新启动程序选择 ActionPopover 作为第一个页面进入后点击 show 弹窗显示在 home 界面
- [ ] 重新启动程序选择 Transform 作为第一个页面进入后进行操作会出现黑屏问题
- [ ] NavigatorBar 界面样式需确认(安卓demo无法运行成功)
- 待更新
## 0.77 (基于0.72)
> [!TIP] [ ] 表示未完成任务 [x] 表示已完成任务
- [x] [在0.72基础上的 style 未定义: 需替换 TextPropTypes, ImagePropTypes, TextInputPropTypes](https://github.com/ChanRui09/teaset_lib_demo/commit/ff6d5b34b1f30e6e1be9c274bca36840fef6c71e)
- [x] [适配 0.77 过程中的 React.createContext() 报错 - 从 Legacy Context API 到 React 18 Context API 的迁移](https://github.com/ChanRui09/teaset_lib_demo/commit/ed2b30dce1784e873f4b806abfa16416396edfa2)  
(1) TeaNavigator uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead.  
(2) NavigationBar uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead.  
(3) TopView uses the legacy childContextTypes API which is no longer supported. Use React.createContext() instead
(4) TopView uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
(5) Home uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
(6) NavigationTitle uses the legacy contextTypes API which is no longer supported. Use React.createContext() with static contextType instead.  
- [x] 点击 home 界面的任意条目报错：The root component is NOT TeaNavigator, then you can not use BasePage.navigator.
- [x] 点击 home 界面的任意条目报错：TypeError: Cannot read property 'push' of null
> [!TIP] 上面两条错误是由于 React.createContext() 报错导致的
- [ ] 库中的 createRef() 报错
- [ ] demo中的 createRef() 报错  
(1) Component "RCTView" contains the string ref "containerView". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.  
(2) Component "SwipeTouchableOpacity" contains the string ref "animatedView". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead.
- 待更新
