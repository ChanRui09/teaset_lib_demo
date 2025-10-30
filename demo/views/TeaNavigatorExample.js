// TeaNavigatorExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { NavigationPage, ListRow } from 'teaset';

// 演示用的子页面组件
class DemoPage extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: 'Demo Page',
        showBackButton: true,
    };

    renderPage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#333' }}>这是一个演示页面</Text>
                <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                    通过 navigator.push() 跳转而来
                </Text>
            </View>
        );
    }
}

// 演示用的根视图组件
class DemoRootView extends NavigationPage {
    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: 'Root View Demo',
        showBackButton: true,
    };

    renderPage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8f5e9' }}>
                <Text style={{ fontSize: 20, color: '#2e7d32', fontWeight: 'bold' }}>✓ 自定义根视图</Text>
                <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                    这是通过 rootView 属性设置的根组件
                </Text>
            </View>
        );
    }
}

export default class TeaNavigatorExample extends NavigationPage {

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: 'TeaNavigator',
        showBackButton: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigatorInfo: '当前页面栈深度: 1',
        };
    }

    componentDidMount() {
        this.updateNavigatorInfo();
    }

    onDidFocus() {
        // 页面获得焦点时更新路由信息
        this.updateNavigatorInfo();
    }

    // 演示 navigator.push()
    showPush() {
        this.navigator.push(<DemoPage />);
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 演示 navigator.pop()
    showPop() {
        this.navigator.pop();
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 演示 navigator.popN()
    showPopN() {
        // 先push 3个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            this.navigator.push(<DemoPage />);
            setTimeout(() => {
                this.navigator.push(<DemoPage />);
                setTimeout(() => {
                    alert('已push 3个页面，点击确定后将 popN(2) 弹出2个页面');
                    this.navigator.popN(2);
                }, 500);
            }, 500);
        }, 500);
    }

    // 演示 navigator.popToTop()
    showPopToTop() {
        // 先push几个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            this.navigator.push(<DemoPage />);
            setTimeout(() => {
                alert('已push 2个页面，点击确定后将 popToTop 返回根页面');
                this.navigator.popToTop();
                // 不在这里更新，让 onDidFocus 自动更新
            }, 500);
        }, 500);
    }

    // 演示 navigator.replace()
    showReplace() {
        this.navigator.replace(<DemoPage />);
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 演示 navigator.replaceAtIndex()
    showReplaceAtIndex() {
        // 先push 2个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            this.navigator.push(<DemoPage />);
            setTimeout(() => {
                alert('已push 2个页面，点击确定后将 replaceAtIndex(1) 替换索引1的页面（第2个页面）');
                // 创建一个特殊标记的页面
                class ReplacedPage extends NavigationPage {
                    static defaultProps = {
                        ...NavigationPage.defaultProps,
                        title: 'Replaced Page',
                        showBackButton: true,
                    };
                    renderPage() {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3e0' }}>
                                <Text style={{ fontSize: 18, color: '#e65100', fontWeight: 'bold' }}>✓ 已被替换的页面</Text>
                                <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                                    通过 replaceAtIndex(1) 替换了索引1的页面
                                </Text>
                            </View>
                        );
                    }
                }
                this.navigator.replaceAtIndex(<ReplacedPage />, 1);
            }, 500);
        }, 500);
    }

    // 演示 navigator.replacePrevious()
    showReplacePrevious() {
        // 先push一个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            alert('已push 1个页面，点击确定后将 replacePrevious() 替换前一个页面（当前TeaNavigator示例页）');
            // 创建一个特殊标记的页面
            class ReplacedPreviousPage extends NavigationPage {
                static defaultProps = {
                    ...NavigationPage.defaultProps,
                    title: 'Replaced Previous',
                    showBackButton: true,
                };
                renderPage() {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1f5fe' }}>
                            <Text style={{ fontSize: 18, color: '#01579b', fontWeight: 'bold' }}>✓ 替换了前一个页面</Text>
                            <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                                通过 replacePrevious() 替换
                            </Text>
                            <Text style={{ fontSize: 12, color: '#999', marginTop: 5 }}>
                                点击返回按钮可以看到效果
                            </Text>
                        </View>
                    );
                }
            }
            this.navigator.replacePrevious(<ReplacedPreviousPage />);
        }, 500);
    }

    // 演示 navigator.replacePreviousAndPop()
    showReplacePreviousAndPop() {
        // 先push一个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            alert('已push 1个页面，点击确定后将 replacePreviousAndPop() 替换前一个页面并返回');
            // 创建一个特殊标记的页面
            class ReplacedAndPopPage extends NavigationPage {
                static defaultProps = {
                    ...NavigationPage.defaultProps,
                    title: 'Replaced & Popped',
                    showBackButton: true,
                };
                renderPage() {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3e5f5' }}>
                            <Text style={{ fontSize: 18, color: '#4a148c', fontWeight: 'bold' }}>✓ 替换并弹出</Text>
                            <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                                通过 replacePreviousAndPop() 实现
                            </Text>
                            <Text style={{ fontSize: 12, color: '#999', marginTop: 5 }}>
                                替换了之前的 TeaNavigator 示例页
                            </Text>
                        </View>
                    );
                }
            }
            this.navigator.replacePreviousAndPop(<ReplacedAndPopPage />);
        }, 500);
    }

    // 演示 navigator.popToRoute()
    showPopToRoute() {
        // 保存当前路由的引用
        const currentRoute = this.navigator.getCurrentRoutes()[this.navigator.getCurrentRoutes().length - 1];

        // 先push 3个页面
        this.navigator.push(<DemoPage />);
        setTimeout(() => {
            this.navigator.push(<DemoPage />);
            setTimeout(() => {
                this.navigator.push(<DemoPage />);
                setTimeout(() => {
                    alert('已push 3个页面，点击确定后将 popToRoute() 弹出到 TeaNavigator 示例页');
                    this.navigator.popToRoute(currentRoute);
                }, 500);
            }, 500);
        }, 500);
    }

    // 演示 navigator.resetTo()
    showResetTo() {
        this.navigator.resetTo(<DemoRootView />);
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 演示 navigator.immediatelyResetRouteStack()
    showImmediatelyResetRouteStack() {
        alert('将立即重置路由栈为3个不同的页面');

        // 创建3个不同的页面
        class StackPage1 extends NavigationPage {
            static defaultProps = {
                ...NavigationPage.defaultProps,
                title: 'Stack Page 1',
                showBackButton: false,
            };
            renderPage() {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffebee' }}>
                        <Text style={{ fontSize: 18, color: '#c62828', fontWeight: 'bold' }}>第1个页面（新的根页面）</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                            通过 immediatelyResetRouteStack() 设置
                        </Text>
                    </View>
                );
            }
        }

        class StackPage2 extends NavigationPage {
            static defaultProps = {
                ...NavigationPage.defaultProps,
                title: 'Stack Page 2',
                showBackButton: true,
            };
            renderPage() {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8f5e9' }}>
                        <Text style={{ fontSize: 18, color: '#2e7d32', fontWeight: 'bold' }}>第2个页面</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                            路由栈中的第2个页面
                        </Text>
                    </View>
                );
            }
        }

        class StackPage3 extends NavigationPage {
            static defaultProps = {
                ...NavigationPage.defaultProps,
                title: 'Stack Page 3',
                showBackButton: true,
            };
            renderPage() {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' }}>
                        <Text style={{ fontSize: 18, color: '#1565c0', fontWeight: 'bold' }}>第3个页面（当前页）</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
                            路由栈中的第3个页面
                        </Text>
                        <Text style={{ fontSize: 12, color: '#999', marginTop: 5 }}>
                            点击返回可查看前面的页面
                        </Text>
                    </View>
                );
            }
        }

        // 重置路由栈为3个页面
        this.navigator.immediatelyResetRouteStack([
            <StackPage1 />,
            <StackPage2 />,
            <StackPage3 />
        ]);
    }

    // 演示 navigator.getCurrentRoutes()
    showGetCurrentRoutes() {
        const routes = this.navigator.getCurrentRoutes();
        alert(`当前路由栈:\n共 ${routes.length} 个页面\n\n详细信息请查看控制台`);
        console.log('当前路由栈:', routes);
        this.updateNavigatorInfo();
    }

    // 演示 sceneStyle - 推入一个自定义背景色的页面
    showSceneStyleDemo() {
        // 创建一个有自定义背景色的页面
        class SceneStyleDemoPage extends NavigationPage {
            static defaultProps = {
                ...NavigationPage.defaultProps,
                title: 'SceneStyle Demo',
                showBackButton: true,
            };

            renderPage() {
                return (
                    <ScrollView style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
                        <View style={{ padding: 20 }}>
                            <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                                <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>
                                    当前页面的背景色：浅蓝色 (#e3f2fd)
                                </Text>
                                <Text style={{ fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20 }}>
                                    此页面展示了通过组件内部样式设置背景色的方法。{'\n\n'}
                                    由于 sceneStyle 是 TeaNavigator 的全局属性，{'\n'}
                                    单个页面可以通过 renderPage() 的容器样式来覆盖背景色。
                                </Text>
                            </View>

                            <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 8 }}>
                                <Text style={{ fontSize: 14, color: '#333', lineHeight: 20 }}>
                                    💡 提示：{'\n\n'}
                                    • sceneStyle 在 TeaNavigator 根组件设置{'\n'}
                                    • 影响所有页面的默认背景样式{'\n'}
                                    • 全局设置: {'<TeaNavigator sceneStyle={{backgroundColor: "#f0f0f0"}} />'}{'\n'}
                                    • 当前全局默认: backgroundColor: '#f8f8f8'{'\n\n'}
                                    • 单个页面可通过 ScrollView/View 的 style 属性覆盖背景色{'\n'}
                                    • 例如: {'<ScrollView style={{flex: 1, backgroundColor: "#e3f2fd"}}>'}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                );
            }
        }

        this.navigator.push(<SceneStyleDemoPage />);
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 演示不同背景色的 sceneStyle
    showSceneStyleColors(color, colorName) {
        const self = this;
        class ColoredScenePage extends NavigationPage {
            static defaultProps = {
                ...NavigationPage.defaultProps,
                title: `${colorName}背景`,
                showBackButton: true,
            };

            renderPage() {
                return (
                    <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: 30, borderRadius: 12, margin: 20 }}>
                            <Text style={{ fontSize: 20, color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                                {colorName}背景演示
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginTop: 10, textAlign: 'center' }}>
                                背景色: {color}
                            </Text>
                            <Text style={{ fontSize: 12, color: '#999', marginTop: 15, textAlign: 'center', lineHeight: 18 }}>
                                通过 renderPage() 容器的{'\n'}
                                backgroundColor 样式实现
                            </Text>
                        </View>
                    </View>
                );
            }
        }

        this.navigator.push(<ColoredScenePage />);
        // 不在这里更新，让 onDidFocus 自动更新
    }

    // 更新导航器信息
    updateNavigatorInfo() {
        setTimeout(() => {
            const routes = this.navigator.getCurrentRoutes();
            this.setState({
                navigatorInfo: `当前页面栈深度: ${routes.length}`,
            });
        }, 50);
    }

    renderPage() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 20 }} />

                <View style={{ backgroundColor: '#fff3cd', padding: 15, margin: 15, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: '#856404', lineHeight: 20 }}>
                        ⚠️ TeaNavigator 说明：{'\n'}
                        • TeaNavigator 通常作为根导航器在 App.js 初始化: {'<TeaNavigator rootView={<Home />} />'}{'\n'}
                        • 初始化后会通过 Context 向所有 NavigationPage 派生页注入同一个 navigator 对象{'\n'}
                        • 因此本示例无需再次导入或创建新的 TeaNavigator，直接使用 this.navigator 调用 push/pop/reset 等方法即可{'\n'}
                        • rootView 属性用于指定默认展示的根页面，可切换为 DemoRootView 等自定义组件{'\n'}
                        • sceneStyle 可统一配置页面背景，也可在单个页面的容器样式上覆盖{'\n'}
                        • 下方列表展示 navigator 常用 API 的交互效果
                    </Text>
                </View>

                <View style={{ backgroundColor: '#d1ecf1', padding: 10, marginHorizontal: 15, borderRadius: 5 }}>
                    <Text style={{ fontSize: 13, color: '#0c5460', textAlign: 'center' }}>
                        {this.state.navigatorInfo}
                    </Text>
                </View>

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    navigator 对象方法演示 - 通过 Context 获取
                </Text>
                <ListRow title='push - 压入新页面' onPress={() => this.showPush()} topSeparator='full' />
                <ListRow title='pop - 弹出当前页面' onPress={() => this.showPop()} detail='需要有多个页面' />
                <ListRow title='popN - 弹出n个页面' onPress={() => this.showPopN()} detail='弹出2个' />
                <ListRow title='popToTop - 返回根页面' onPress={() => this.showPopToTop()} />
                <ListRow title='popToRoute - 弹出到指定路由' onPress={() => this.showPopToRoute()} />
                <ListRow title='replace - 替换当前页面' onPress={() => this.showReplace()} />
                <ListRow title='replaceAtIndex - 替换指定索引页面' onPress={() => this.showReplaceAtIndex()} detail='索引1' />
                <ListRow title='replacePrevious - 替换前一个页面' onPress={() => this.showReplacePrevious()} />
                <ListRow title='replacePreviousAndPop - 替换并弹出' onPress={() => this.showReplacePreviousAndPop()} />
                <ListRow title='resetTo - 重置为新根页面' onPress={() => this.showResetTo()} />
                <ListRow title='immediatelyResetRouteStack - 重置路由栈' onPress={() => this.showImmediatelyResetRouteStack()} detail='3个页面' />
                <ListRow title='getCurrentRoutes - 获取路由栈' onPress={() => this.showGetCurrentRoutes()} bottomSeparator='full' />

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    sceneStyle 属性演示 - 设置页面背景样式
                </Text>
                <ListRow title='sceneStyle 演示页面' onPress={() => this.showSceneStyleDemo()} topSeparator='full' />
                <ListRow title='浅蓝色背景 (#e3f2fd)' onPress={() => this.showSceneStyleColors('#e3f2fd', '浅蓝色')} />
                <ListRow title='浅绿色背景 (#e8f5e9)' onPress={() => this.showSceneStyleColors('#e8f5e9', '浅绿色')} />
                <ListRow title='浅粉色背景 (#fce4ec)' onPress={() => this.showSceneStyleColors('#fce4ec', '浅粉色')} />
                <ListRow title='浅黄色背景 (#fff9c4)' onPress={() => this.showSceneStyleColors('#fff9c4', '浅黄色')} bottomSeparator='full' />

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12, lineHeight: 18, paddingRight: 20 }}>
                    💡 sceneStyle 说明:{'\n'}
                    • 在 TeaNavigator 根组件设置，影响所有页面的默认样式{'\n'}
                    • 示例: {'<TeaNavigator sceneStyle={{backgroundColor: "#f0f0f0"}} />'}{'\n'}
                    • 单个页面通过容器组件的 style 属性覆盖背景色{'\n'}
                    • 示例: {'<View style={{flex: 1, backgroundColor: "#e3f2fd"}}>...'}{'\n'}
                    • 当前全局默认背景色: #f8f8f8
                </Text>

                <View style={{ height: 20 }} />
            </ScrollView>
        );
    }

}
