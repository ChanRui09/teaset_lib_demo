// NavigationPageExample.js

'use strict';

import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, Button, NavigationBar, TeaNavigator, Theme} from 'teaset';

class BasicNavigationPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '基础导航页面',
    showBackButton: true,
  };

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            默认配置展示返回按钮。
          </Text>
        </View>
      </View>
    );
  }
}

class NoBackButtonPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: '隐藏默认返回按钮',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            showBackButton 设置为 false 时，导航条不会渲染默认返回按钮。
          </Text>
        </View>

        <Button
          type='primary'
          title='自定义的返回'
          style={{marginTop: 20}}
          onPress={() => this.navigator.pop()}
        />
      </View>
    );
  }
}

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
          自定义标题
        </Text>
      </View>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            覆写 renderNavigationTitle。
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
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            覆写 renderNavigationLeftView。
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
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            覆写 renderNavigationRightView 挂载多个操作按钮。
          </Text>
        </View>

        <View style={{marginTop: 15, alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#333'}}>
            点击次数: {this.state.count}
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

class CustomNavigationBarPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'renderNavigationBar 示例',
    showBackButton: false,
  };

  renderNavigationBar() {
    const containerStyle = {
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      backgroundColor: '#3949ab',
      paddingTop: Theme.statusBarHeight,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 1,
    };
    const contentStyle = {
      height: Theme.navBarContentHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    };
    const linkProps = {
      type: 'link',
      titleStyle: {color: '#fff', fontSize: 16},
    };
    return (
      <View style={containerStyle}>
        <View style={contentStyle}>
          <Button
            {...linkProps}
            title='返回'
            onPress={() => this.navigator.pop()}
          />
          <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
            自定义导航条
          </Text>
          <Button
            {...linkProps}
            title='更多'
            onPress={() => alert('点击了更多操作')}
          />
        </View>
      </View>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            覆写 renderNavigationBar 可自定义背景与布局。
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

class NavigationBarInsetsTruePage extends NavigationPage {
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
          <View style={{backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
            <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
              navigationBarInsets 默认为 true，内容自动避开导航条。
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
          <View style={{backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
            <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
              navigationBarInsets 设为 false 后，请自行处理顶部间距。
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

class SceneDemoPage extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'scene 示例',
    showBackButton: true,
  };

  renderPage() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 15, color: '#333', lineHeight: 22}}>
            此页展示页面切换。
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

export default class NavigationPageExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'NavigationPage',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
          <View style={{backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8}}>
            <Text style={{fontSize: 14, color: '#333', lineHeight: 22}}>
              NavigationPage 提供带导航条的页面模板。
            </Text>
          </View>

          <Text style={{marginTop: 24, color: '#666', fontSize: 12}}>
            基础属性
          </Text>
          <ListRow
            title='showBackButton = true'
            detail='默认返回按钮'
            onPress={() => this.navigator.push(<BasicNavigationPage />)}
            topSeparator='full'
          />
          <ListRow
            title='showBackButton = false'
            detail='隐藏返回按钮'
            onPress={() => this.navigator.push(<NoBackButtonPage />)}
            bottomSeparator='full'
          />

          <Text style={{marginTop: 24, color: '#666', fontSize: 12}}>
            scene 基础用例
          </Text>
          <ListRow
            title='scene页面切换'
            detail='点击切换'
            onPress={() => this.navigator.push({
              view: <SceneDemoPage />,
              scene: TeaNavigator.SceneConfigs.PushFromRight,
            })}
            topSeparator='full'
            bottomSeparator='full'
          />

          <Text style={{marginTop: 24, color: '#666', fontSize: 12}}>
            navigationBarInsets
          </Text>
          <ListRow
            title='navigationBarInsets = true'
            detail='默认留白'
            onPress={() => this.navigator.push(<NavigationBarInsetsTruePage />)}
            topSeparator='full'
          />
          <ListRow
            title='navigationBarInsets = false'
            detail='无留白'
            onPress={() => this.navigator.push(<NavigationBarInsetsFalsePage />)}
            bottomSeparator='full'
          />

          <Text style={{marginTop: 24, color: '#666', fontSize: 12}}>
            自定义导航条
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
          />
          <ListRow
            title='renderNavigationBar()'
            detail='完整自定义'
            onPress={() => this.navigator.push(<CustomNavigationBarPage />)}
            bottomSeparator='full'
          />
        </View>
      </ScrollView>
    );
  }

}
