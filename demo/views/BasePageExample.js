// BasePageExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Keyboard } from 'react-native';

import { NavigationPage, BasePage, ListRow, Input, Button, Label } from 'teaset';

// 演示 scene 属性的页面
class SceneDemoPage extends BasePage {
    static defaultProps = {
        ...BasePage.defaultProps,
        // scene 属性在这里设置转场效果
    };

    constructor(props) {
        super(props);
        this.state = {
            sceneType: props.sceneType || 'default',
        };
    }

    renderPage() {
        const { sceneType } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, margin: 20 }}>
                    <Text style={{ fontSize: 18, color: '#1565c0', fontWeight: 'bold', textAlign: 'center' }}>
                        转场效果演示
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 10, textAlign: 'center' }}>
                        scene 属性: {sceneType}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#999', marginTop: 10, textAlign: 'center', lineHeight: 18 }}>
                        scene 属性用于设置页面的转场动画效果{'\n'}
                        与 TeaNavigator 搭配使用
                    </Text>
                    <Button
                        type='primary'
                        size='sm'
                        title='返回'
                        style={{ marginTop: 15 }}
                        onPress={() => this.navigator.pop()}
                    />
                </View>
            </View>
        );
    }
}

// 演示 autoKeyboardInsets 属性的页面
class KeyboardInsetsPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            text3: '',
            autoKeyboardInsets: props.autoKeyboardInsets !== undefined ? props.autoKeyboardInsets : true,
            keyboardLogs: [],
        };
    }

    componentDidMount() {
        super.componentDidMount();
        // 监听所有可能的键盘事件
        this.listeners = [];
        const events = ['keyboardWillShow', 'keyboardDidShow', 'keyboardWillHide', 'keyboardDidHide', 'keyboardWillChangeFrame', 'keyboardDidChangeFrame'];
        events.forEach(eventName => {
            const listener = Keyboard.addListener(eventName, (e) => {
                this.addKeyboardLog(eventName, e);
            });
            this.listeners.push(listener);
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.listeners) {
            this.listeners.forEach(listener => listener.remove());
            this.listeners = null;
        }
    }

    addKeyboardLog(eventName, e) {
        const now = new Date();
        const time = [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join(':');

        let height = 'N/A';
        if (e && e.endCoordinates) {
            height = e.endCoordinates.height;
        }

        this.setState(prevState => ({
            keyboardLogs: [...prevState.keyboardLogs, `${time} ${eventName} (高度: ${height})`]
        }));
    }

    renderPage() {
        const { autoKeyboardInsets, keyboardLogs } = this.state;
        const topInset = this.props.keyboardTopInsets || 0;
        const insetNote = this.props.topInsetNote;
        const bottomPlaceholderHeight = this.props.bottomPlaceholderHeight !== undefined ? this.props.bottomPlaceholderHeight : topInset;
        const bottomPlaceholderLabel = this.props.bottomPlaceholderLabel || (bottomPlaceholderHeight ? `模拟底部固定区域，高度 ${bottomPlaceholderHeight}px` : '无底部固定区域');
        return (
            <ScrollView style={{ flex: 1, backgroundColor: autoKeyboardInsets ? '#e8f5e9' : '#ffebee' }}>
                <View style={{ padding: 20 }}>
                    <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, color: autoKeyboardInsets ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                            autoKeyboardInsets = {autoKeyboardInsets ? 'true' : 'false'}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20 }}>
{`${autoKeyboardInsets ? '✓ 插入 KeyboardSpace 组件' : '✗ 不插入 KeyboardSpace 组件'}

Platform.OS: ${Platform.OS}
keyboardTopInsets: ${topInset}px${insetNote ? `\n${insetNote}` : ''}`}
                        </Text>
                    </View>

                    <View style={{ backgroundColor: '#fff3e0', padding: 10, borderRadius: 8, marginBottom: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#e65100' }}>键盘事件日志：</Text>
                        <ScrollView style={{ maxHeight: 150, marginTop: 5 }}>
                            {keyboardLogs.length === 0 ? (
                                <Text style={{ fontSize: 12, color: '#999' }}>等待键盘事件...</Text>
                            ) : (
                                keyboardLogs.map((log, index) => (
                                    <Text key={index} style={{ fontSize: 11, color: '#333', marginBottom: 3, fontFamily: 'monospace' }}>
                                        {log}
                                    </Text>
                                ))
                            )}
                        </ScrollView>
                    </View>

                    <Label type='title' text='点击输入框弹出键盘：' />

                    <View style={{ height: 200 }} />

                    <Input
                        placeholder='底部输入框 - 观察键盘弹出效果'
                        value={this.state.text3}
                        onChangeText={text => this.setState({ text3: text })}
                    />

                    {bottomPlaceholderHeight > 0 ? (
                        <View
                            style={{
                                height: bottomPlaceholderHeight,
                                marginTop: 16,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderStyle: 'dashed',
                                borderColor: '#f9a825',
                                backgroundColor: '#fffde7',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 12, color: '#f57f17' }}>{bottomPlaceholderLabel}</Text>
                        </View>
                    ) : null}

                    <Button
                        type='primary'
                        title='返回'
                        style={{ marginTop: 20, marginBottom: 50 }}
                        onPress={() => this.navigator.pop()}
                    />
                </View>
            </ScrollView>
        );
    }
}

// 演示生命周期方法的页面
class LifecyclePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            logs: [this.createLogEntry('constructor - 组件创建')],
            focusCount: 0,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.addLog('componentDidMount - 组件已挂载到 DOM');
        this.addLog('didMount 变量值: ' + (this.didMount ? 'true' : 'false'));
    }

    onWillFocus() {
        super.onWillFocus();
        this.addLog('onWillFocus - 页面将要获得焦点（转场动画开始前）');
    }

    onDidFocus() {
        super.onDidFocus();
        const count = this.state.focusCount + 1;
        this.setState({ focusCount: count });
        this.addLog('onDidFocus - 页面已获得焦点（转场动画结束后）第' + count + '次');
        this.addLog('isFocused 变量值: ' + (this.isFocused ? 'true' : 'false'));
    }

    onHardwareBackPress() {
        this.addLog('onHardwareBackPress - 按下了硬件返回键');
        return super.onHardwareBackPress();
    }

    createLogEntry(message) {
        const now = new Date();
        const time = [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join(':');
        return `${time} ${message}`;
    }

    addLog(message) {
        const entry = this.createLogEntry(message);
        this.setState(prevState => ({
            logs: [...prevState.logs, entry]
        }));
    }

    renderPage() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3e5f5' }}>
                <ScrollView style={{ flex: 1, padding: 20 }}>
                    <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, color: '#7b1fa2', fontWeight: 'bold' }}>
                            BasePage 生命周期演示
                        </Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20 }}>
                            • onWillFocus: 页面将要获得焦点（转场前）{'\n'}
                            • onDidFocus: 页面已获得焦点（转场后）{'\n'}
                            • onHardwareBackPress: 硬件返回键（鸿蒙支持）{'\n'}
                            • didMount: 组件是否已挂载{'\n'}
                            • isFocused: 页面是否已聚焦
                        </Text>
                    </View>

                    <View style={{ backgroundColor: '#e1bee7', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                        <Text style={{ fontSize: 13, color: '#4a148c', fontWeight: 'bold' }}>
                            聚焦次数: {this.state.focusCount} 次
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6a1b9a', marginTop: 5 }}>
                            每次从子页面返回都会触发 onDidFocus
                        </Text>
                    </View>

                    <Label type='title' text='生命周期日志：' />
                    <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 10, minHeight: 150 }}>
                        {this.state.logs.map((log, index) => (
                            <Text key={index} style={{ fontSize: 12, color: '#333', marginBottom: 5, fontFamily: 'monospace' }}>
                                {log}
                            </Text>
                        ))}
                    </View>

                    <Button
                        type='primary'
                        title='Push 新页面（测试 focus 事件）'
                        style={{ marginTop: 15 }}
                        onPress={() => this.navigator.push(<LifecyclePage />)}
                    />

                    <Text style={{ fontSize: 12, color: '#999', marginTop: 10, textAlign: 'center', lineHeight: 18 }}>
                        点击上方按钮进入新页面，{'\n'}
                        然后返回本页面，可观察 onDidFocus 被再次触发
                    </Text>

                    <Button
                        type='default'
                        title='返回'
                        style={{ marginTop: 10, marginBottom: 20 }}
                        onPress={() => this.navigator.pop()}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default class BasePageExample extends NavigationPage {

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: 'BasePage',
        showBackButton: true,
    };

    renderPage() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 20 }} />

                <View style={{ backgroundColor: '#fff3cd', padding: 15, margin: 15, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: '#856404', lineHeight: 20 }}>
                        ⚠️ BasePage 说明：{'\n'}
                        • BasePage 是页面的抽象基类，需要派生使用{'\n'}
                        • 提供 navigator 属性访问导航器{'\n'}
                        • 提供生命周期方法（onWillFocus, onDidFocus）{'\n'}
                        • 与 TeaNavigator 搭配使用可简化页面跳转代码
                    </Text>
                </View>

                <View style={{ height: 15 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    scene 属性演示 - 转场效果（需要与 TeaNavigator 搭配）
                </Text>
                <ListRow
                    title='默认转场'
                    detail='scene: Replace'
                    onPress={() => this.navigator.push(<SceneDemoPage sceneType='Replace (默认)' />)}
                    topSeparator='full'
                />
                <ListRow
                    title='说明文档'
                    detail='scene 在 route 中指定'
                    bottomSeparator='full'
                />

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    autoKeyboardInsets 属性演示 - KeyboardSpace 组件
                </Text>
                <ListRow
                    title='开启键盘空间插入'
                    detail='插入 KeyboardSpace'
                    onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={true} />)}
                    topSeparator='full'
                />
                <ListRow
                    title='关闭键盘空间插入'
                    detail='不插入 KeyboardSpace'
                    onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={false} />)}
                    bottomSeparator='full'
                />
                <Text style={{ marginLeft: 20, marginRight: 20, color: '#999', fontSize: 11, marginTop: 5, lineHeight: 16 }}>
                    true 时在页面底部插入 KeyboardSpace 组件，监听键盘事件动态调整高度
                </Text>

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    keyboardTopInsets 属性演示 - 底部固定区域偏移
                </Text>
                <ListRow
                    title='keyboardTopInsets: 0 (默认)'
                    detail='无底部固定区域'
                    onPress={() => this.navigator.push(
                        <KeyboardInsetsPage
                            autoKeyboardInsets={true}
                            keyboardTopInsets={0}
                            topInsetNote='默认值，无额外偏移'
                            bottomPlaceholderHeight={0}
                            bottomPlaceholderLabel='无底部固定区域'
                        />
                    )}
                    topSeparator='full'
                />
                <ListRow
                    title='keyboardTopInsets: 40'
                    detail='模拟 TabBar 高度 40px'
                    onPress={() => this.navigator.push(
                        <KeyboardInsetsPage
                            autoKeyboardInsets={true}
                            keyboardTopInsets={40}
                            topInsetNote='适用于底部工具栏或 TabBar 高度 40px'
                            bottomPlaceholderHeight={40}
                            bottomPlaceholderLabel='模拟底部工具栏 (40px)'
                        />
                    )}
                />
                <ListRow
                    title='keyboardTopInsets: 80'
                    detail='模拟底部安全区 + 工具栏'
                    onPress={() => this.navigator.push(
                        <KeyboardInsetsPage
                            autoKeyboardInsets={true}
                            keyboardTopInsets={80}
                            topInsetNote='适用于刘海屏安全区 + 自定义工具条 (80px)'
                            bottomPlaceholderHeight={80}
                            bottomPlaceholderLabel='模拟底部安全区 + 工具条 (80px)'
                        />
                    )}
                    bottomSeparator='full'
                />
                <Text style={{ marginLeft: 20, marginRight: 20, color: '#999', fontSize: 11, marginTop: 5, lineHeight: 16 }}>
                    keyboardTopInsets 控制键盘占用空间的顶部偏移量，默认值为 0。当页面底部存在固定区域（如底栏、TabNavigator、外接安全区）时，可设置为对应高度，避免键盘顶起内容后与底部区域重叠。
                </Text>

                <View style={{ height: 20 }} />
                <Text style={{ marginLeft: 20, color: '#999', fontSize: 12 }}>
                    生命周期方法和变量演示
                </Text>
                <ListRow
                    title='生命周期方法'
                    detail='查看日志'
                    onPress={() => this.navigator.push(<LifecyclePage />)}
                    topSeparator='full'
                />
                <ListRow
                    title='变量：navigator'
                    detail='访问 TeaNavigator'
                    onPress={() => alert('navigator: ' + (this.navigator ? '可用' : '不可用'))}
                />
                <ListRow
                    title='变量：didMount'
                    detail='是否已挂载'
                    onPress={() => alert('didMount: ' + (this.didMount ? 'true' : 'false'))}
                />
                <ListRow
                    title='变量：isFocused'
                    detail='是否已聚焦'
                    onPress={() => alert('isFocused: ' + (this.isFocused ? 'true' : 'false'))}
                    bottomSeparator='full'
                />
            </ScrollView>
        );
    }

}
