// BasePageExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Keyboard } from 'react-native';

import { NavigationPage, BasePage, ListRow, Input, Button, Label, TeaNavigator } from 'teaset';

// 演示 scene 属性的页面
class SceneDemoPage extends BasePage {
    static defaultProps = {
        ...BasePage.defaultProps,
        scene: TeaNavigator.SceneConfigs.Replace,
    };

    renderPage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, margin: 20 }}>
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                        scene: Replace
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

class RenderPageDemoPage extends BasePage {
    static defaultProps = {
        ...BasePage.defaultProps,
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    renderPage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4ff' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 260 }}>
                    <Text style={{ fontSize: 15, color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                        renderPage 返回页面内容
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 10, textAlign: 'center' }}>
                        count: {this.state.count}
                    </Text>
                    <Button
                        type='primary'
                        size='sm'
                        title='计数 +1'
                        style={{ marginTop: 15 }}
                        onPress={() => this.setState({ count: this.state.count + 1 })}
                    />
                    <Button
                        type='default'
                        size='sm'
                        title='返回'
                        style={{ marginTop: 10 }}
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
        return (
            <ScrollView style={{ flex: 1, backgroundColor: autoKeyboardInsets ? '#e8f5e9' : '#ffebee' }}>
                <View style={{ padding: 20 }}>
                    <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                        <Text style={{ fontSize: 15, color: '#333', fontWeight: 'bold' }}>
                            autoKeyboardInsets = {autoKeyboardInsets ? 'true' : 'false'}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
                            keyboardTopInsets: {topInset}px
                        </Text>
                    </View>

                    <View style={{ backgroundColor: '#fff3e0', padding: 10, borderRadius: 8, marginBottom: 15 }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#e65100' }}>键盘事件日志：</Text>
                        <ScrollView style={{ maxHeight: 120, marginTop: 5 }}>
                            {keyboardLogs.length === 0 ? (
                                <Text style={{ fontSize: 12, color: '#999' }}>等待键盘事件...</Text>
                            ) : (
                                keyboardLogs.map((log, index) => (
                                    <Text key={index} style={{ fontSize: 11, color: '#333', marginBottom: 3 }}>
                                        {log}
                                    </Text>
                                ))
                            )}
                        </ScrollView>
                    </View>

                    <View style={{ height: 200 }} />

                    <Input
                        placeholder='底部输入框'
                        value={this.state.text3}
                        onChangeText={text => this.setState({ text3: text })}
                    />

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
                        <Text style={{ fontSize: 15, color: '#333', fontWeight: 'bold' }}>
                            生命周期方法
                        </Text>
                        <Text style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
                            onWillFocus / onDidFocus{'\n'}
                            onHardwareBackPress
                        </Text>
                    </View>

                    <View style={{ backgroundColor: '#e1bee7', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                        <Text style={{ fontSize: 13, color: '#4a148c', fontWeight: 'bold' }}>
                            聚焦次数: {this.state.focusCount}
                        </Text>
                    </View>

                    <Label type='title' text='日志：' />
                    <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 10, minHeight: 120 }}>
                        {this.state.logs.map((log, index) => (
                            <Text key={index} style={{ fontSize: 11, color: '#333', marginBottom: 4 }}>
                                {log}
                            </Text>
                        ))}
                    </View>

                    <Button
                        type='primary'
                        title='Push 新页面'
                        style={{ marginTop: 15 }}
                        onPress={() => this.navigator.push(<LifecyclePage />)}
                    />

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
                <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>

                    <Text style={{ color: '#666', fontSize: 12 }}>
                        renderPage
                    </Text>
                    <ListRow
                        title='renderPage 示例'
                        detail='基础渲染'
                        onPress={() => this.navigator.push(<RenderPageDemoPage />)}
                        topSeparator='full'
                        bottomSeparator='full'
                    />

                    <Text style={{ marginTop: 24, color: '#666', fontSize: 12 }}>
                        scene 属性
                    </Text>
                    <ListRow
                        title='scene 示例'
                        detail='Replace'
                        onPress={() => this.navigator.push({
                            view: <SceneDemoPage />,
                            scene: TeaNavigator.SceneConfigs.Replace,
                        })}
                        topSeparator='full'
                        bottomSeparator='full'
                    />

                    <Text style={{ marginTop: 24, color: '#666', fontSize: 12 }}>
                        autoKeyboardInsets
                    </Text>
                    <ListRow
                        title='autoKeyboardInsets = true'
                        detail='插入 KeyboardSpace'
                        onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={true} keyboardTopInsets={0} />)}
                        topSeparator='full'
                    />
                    <ListRow
                        title='autoKeyboardInsets = false'
                        detail='不插入'
                        onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={false} keyboardTopInsets={0} />)}
                        bottomSeparator='full'
                    />

                    <Text style={{ marginTop: 24, color: '#666', fontSize: 12 }}>
                        keyboardTopInsets
                    </Text>
                    <ListRow
                        title='keyboardTopInsets = 0'
                        detail='默认'
                        onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={true} keyboardTopInsets={0} />)}
                        topSeparator='full'
                    />
                    <ListRow
                        title='keyboardTopInsets = 40'
                        detail='底部偏移 40px'
                        onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={true} keyboardTopInsets={40} />)}
                    />
                    <ListRow
                        title='keyboardTopInsets = 80'
                        detail='底部偏移 80px'
                        onPress={() => this.navigator.push(<KeyboardInsetsPage autoKeyboardInsets={true} keyboardTopInsets={80} />)}
                        bottomSeparator='full'
                    />

                    <Text style={{ marginTop: 24, color: '#666', fontSize: 12 }}>
                        生命周期
                    </Text>
                    <ListRow
                        title='生命周期方法'
                        detail='查看日志'
                        onPress={() => this.navigator.push(<LifecyclePage />)}
                        topSeparator='full'
                        bottomSeparator='full'
                    />

                    <Text style={{ marginTop: 24, color: '#666', fontSize: 12 }}>
                        变量
                    </Text>
                    <ListRow
                        title='navigator'
                        detail='访问 TeaNavigator'
                        onPress={() => alert('navigator: ' + (this.navigator ? '可用' : '不可用'))}
                        topSeparator='full'
                    />
                    <ListRow
                        title='didMount'
                        detail='是否已挂载'
                        onPress={() => alert('didMount: ' + (this.didMount ? 'true' : 'false'))}
                    />
                    <ListRow
                        title='isFocused'
                        detail='是否已聚焦'
                        onPress={() => alert('isFocused: ' + (this.isFocused ? 'true' : 'false'))}
                        bottomSeparator='full'
                    />
                </View>
            </ScrollView>
        );
    }

}
