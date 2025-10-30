// NavigationPageExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, Switch} from 'react-native';

import {NavigationPage, BasePage, ListRow, Label, Button, NavigationBar} from 'teaset';

// 1. 基础用法 - 简单的导航页面
class BasicNavigationPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '基础导航页面',
    showBackButton: true,
  };

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#e3f2fd', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#1565c0', fontWeight: 'bold'}}>
            NavigationPage 基础用法
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
            • title: "基础导航页面"{'\n'}
            • showBackButton: true{'\n'}
            • navigationBarInsets: true (默认)
          </Text>
        </View>

        <View style={{backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 15}}>
          <Text style={{fontSize: 14, color: '#333', lineHeight: 20}}>
            NavigationPage 继承自 BasePage，{'\n'}
            在 BasePage 基础上添加了 NavigationBar 导航条。{'\n\n'}
            默认转场效果为 PushFromRight（从右侧推入）
          </Text>
        </View>

        <Button
          type='primary'
          title='返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

// 2. 自定义导航条标题
class CustomTitlePage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '自定义标题',
    showBackButton: true,
  };

  renderNavigationTitle() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#e91e63'}}>
          🎨 自定义标题
        </Text>
      </View>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#fce4ec', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#c2185b', fontWeight: 'bold'}}>
            renderNavigationTitle() 方法
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
            重写此方法可以自定义导航条标题显示内容{'\n\n'}
            • 可以返回自定义的 JSX 元素{'\n'}
            • 可以添加图标、样式等{'\n'}
            • 默认返回 this.props.title
          </Text>
        </View>

        <Button
          type='primary'
          title='返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

// 3. 自定义左侧按钮
class CustomLeftViewPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '自定义左按钮',
    showBackButton: false,
  };

  renderNavigationLeftView() {
    return (
      <NavigationBar.LinkButton
        title='关闭'
        onPress={() => {
          alert('点击了关闭按钮');
          this.navigator.pop();
        }}
      />
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#fff3e0', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#e65100', fontWeight: 'bold'}}>
            renderNavigationLeftView() 方法
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
            重写此方法可以自定义导航条左侧按钮{'\n\n'}
            • showBackButton: false{'\n'}
            • 自定义返回 "关闭" 按钮{'\n'}
            • 可以自定义点击事件和样式
          </Text>
        </View>

        <Button
          type='primary'
          title='返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

// 4. 自定义右侧按钮
class CustomRightViewPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '自定义右按钮',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  renderNavigationRightView() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <NavigationBar.LinkButton
          title='添加'
          onPress={() => this.setState({count: this.state.count + 1})}
        />
        <NavigationBar.LinkButton
          title='更多'
          onPress={() => alert('点击了更多按钮')}
        />
      </View>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#e8f5e9', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#2e7d32', fontWeight: 'bold'}}>
            renderNavigationRightView() 方法
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
            重写此方法可以自定义导航条右侧按钮{'\n\n'}
            • 可以添加多个按钮{'\n'}
            • 可以自定义图标、文字、样式{'\n'}
            • 默认返回 null
          </Text>
        </View>

        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 8, marginTop: 15, alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#333'}}>
            点击计数: {this.state.count}
          </Text>
          <Text style={{fontSize: 12, color: '#999', marginTop: 5}}>
            点击右上角 "添加" 按钮增加计数
          </Text>
        </View>

        <Button
          type='primary'
          title='返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

// 5. navigationBarInsets 属性演示 - true
class NavigationBarInsetsTruePage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Insets = true',
    showBackButton: true,
    navigationBarInsets: true,
  };

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Insets = true',
    showBackButton: true,
    navigationBarInsets: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#e8f5e9'}}>
        <View style={{padding: 20}}>
          <View style={{backgroundColor: '#fff', padding: 15, borderRadius: 8}}>
            <Text style={{fontSize: 16, color: '#2e7d32', fontWeight: 'bold'}}>
              navigationBarInsets = true
            </Text>
            <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
              ✓ 内容区域增加导航条占用空间{'\n\n'}
              工作原理：{'\n'}
              • 内容区域自动添加顶部边距{'\n'}
              • 边距 = 导航条高度 + 状态栏高度{'\n'}
              • 内容不会被导航条遮挡{'\n'}
              • 这是默认行为
            </Text>
          </View>

          <View style={{backgroundColor: '#c8e6c9', padding: 15, borderRadius: 8, marginTop: 15}}>
            <Text style={{fontSize: 14, color: '#333', lineHeight: 20}}>
              当前页面背景色：绿色{'\n\n'}
              可以看到内容在导航条下方开始显示，{'\n'}
              导航条不会遮挡页面内容
            </Text>
          </View>

          <Button
            type='primary'
            title='返回'
            style={{marginTop: 20}}
            onPress={() => this.navigator.pop()}
          />
        </View>
      </ScrollView>
    );
  }
}

// 5b. navigationBarInsets 属性演示 - false
class NavigationBarInsetsFalsePage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Insets = false',
    showBackButton: true,
    navigationBarInsets: false,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#ffebee'}}>
        <View style={{padding: 20, paddingTop: 0}}>
          <View style={{backgroundColor: '#ffcdd2', padding: 15, borderRadius: 8}}>
            <Text style={{fontSize: 16, color: '#c62828', fontWeight: 'bold'}}>
              ⚠️ 被导航条遮挡的区域
            </Text>
            <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
              navigationBarInsets = false{'\n\n'}
              这段文字的顶部被导航条遮挡了！{'\n'}
              因为 paddingTop = 0，内容从屏幕顶部开始显示
            </Text>
          </View>

          <View style={{backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 15}}>
            <Text style={{fontSize: 16, color: '#c62828', fontWeight: 'bold'}}>
              navigationBarInsets = false
            </Text>
            <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
              ✗ 内容区域不增加导航条占用空间{'\n\n'}
              工作原理：{'\n'}
              • 内容从屏幕顶部开始{'\n'}
              • 内容会被导航条遮挡{'\n'}
              • 需要手动添加顶部padding{'\n'}
              • 适用于需要自定义滚动控制的场景
            </Text>
          </View>

          <View style={{backgroundColor: '#e1f5fe', padding: 15, borderRadius: 8, marginTop: 15}}>
            <Text style={{fontSize: 14, color: '#01579b', fontWeight: 'bold'}}>
              💡 使用场景示例：
            </Text>
            <Text style={{fontSize: 14, color: '#333', marginTop: 10, lineHeight: 20}}>
              当你需要在 ScrollView 滚动时：{'\n'}
              • 向上滚动：隐藏导航条，内容占据全屏{'\n'}
              • 向下滚动：显示导航条{'\n\n'}
              这种情况下设置 navigationBarInsets = false，{'\n'}
              并在 ScrollView 内部手动添加顶部占位空间，{'\n'}
              当导航条隐藏后，顶部空间就能被内容利用
            </Text>
          </View>

          <Button
            type='primary'
            title='返回'
            style={{marginTop: 20, marginBottom: 20}}
            onPress={() => this.navigator.pop()}
          />
        </View>
      </ScrollView>
    );
  }
}

// 6. scene 属性演示
class SceneDemoPage extends NavigationPage {
  constructor(props) {
    super(props);
    this.state = {
      sceneType: props.sceneType || 'PushFromRight (默认)',
    };
  }

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '转场效果',
    showBackButton: true,
  };

  renderPage() {
    const {sceneType} = this.state;
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f3e5f5', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#7b1fa2', fontWeight: 'bold'}}>
            scene 属性演示
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 10, lineHeight: 20}}>
            当前转场效果: {sceneType}{'\n\n'}
            NavigationPage 默认使用 PushFromRight{'\n'}
            (从右侧推入，iOS 风格)
          </Text>
        </View>

        <Button
          type='primary'
          title='返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

// 主示例页面
export default class NavigationPageExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'NavigationPage',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <View style={{backgroundColor: '#fff3cd', padding: 15, margin: 15, borderRadius: 8}}>
          <Text style={{fontSize: 14, color: '#856404', lineHeight: 20}}>
            ⚠️ NavigationPage 说明：{'\n'}
            • NavigationPage 继承自 BasePage{'\n'}
            • 在 BasePage 基础上添加了 NavigationBar 导航条{'\n'}
            • 默认转场效果为 PushFromRight（从右侧推入）{'\n'}
            • 提供多个方法自定义导航条显示内容
          </Text>
        </View>

        <View style={{height: 15}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          基础属性演示
        </Text>
        <ListRow 
          title='基础用法' 
          detail='title + showBackButton'
          onPress={() => this.navigator.push(<BasicNavigationPage />)}
          topSeparator='full'
        />
        <ListRow 
          title='scene 属性' 
          detail='PushFromRight (默认)'
          onPress={() => this.navigator.push(<SceneDemoPage sceneType='PushFromRight (默认)' />)}
          bottomSeparator='full'
        />

        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          navigationBarInsets 属性演示 - 内容区域占用空间
        </Text>
        <ListRow 
          title='开启导航条占用空间' 
          detail='navigationBarInsets = true'
          onPress={() => this.navigator.push(<NavigationBarInsetsTruePage />)}
          topSeparator='full'
        />
        <ListRow 
          title='关闭导航条占用空间' 
          detail='navigationBarInsets = false'
          onPress={() => this.navigator.push(<NavigationBarInsetsFalsePage />)}
          bottomSeparator='full'
        />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 11, marginTop: 5, lineHeight: 16}}>
          true 时内容不被导航条遮挡，false 时内容从屏幕顶部开始
        </Text>

        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          自定义导航条方法演示
        </Text>
        <ListRow 
          title='renderNavigationTitle()' 
          detail='自定义标题'
          onPress={() => this.navigator.push(<CustomTitlePage />)}
          topSeparator='full'
        />
        <ListRow 
          title='renderNavigationLeftView()' 
          detail='自定义左按钮'
          onPress={() => this.navigator.push(<CustomLeftViewPage />)}
        />
        <ListRow 
          title='renderNavigationRightView()' 
          detail='自定义右按钮'
          onPress={() => this.navigator.push(<CustomRightViewPage />)}
          bottomSeparator='full'
        />
      </ScrollView>
    );
  }

}
