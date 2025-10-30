// MenuExample.js

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {NavigationPage, Menu, Button, Theme, Label} from 'teaset';

export default class MenuExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Menu',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.btn1Ref = React.createRef();
    this.btn2Ref = React.createRef();
    this.btn3Ref = React.createRef();
    this.btn4Ref = React.createRef();
    this.btn5Ref = React.createRef();
    this.btn6Ref = React.createRef();
    this.iconDemoRef = React.createRef();
    this.titleDemoRef = React.createRef();
    this.shadowRef = React.createRef();
    this.noShadowRef = React.createRef();
  }

  show(view, align) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
        {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
        {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items, {align});
    });
  }

  showIconTypes(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: '带图片图标', icon: require('../icons/search.png'), onPress: () => alert('Image icon')},
        {title: '空图标 (empty)', icon: 'empty', onPress: () => alert('Empty icon')},
        {title: '无图标 (none)', icon: 'none', onPress: () => alert('None icon')},
        {
          title: '自定义组件图标',
          icon: (
            <View style={{width: 20, height: 20, backgroundColor: '#4CAF50', borderRadius: 10, marginRight: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>✓</Text>
            </View>
          ),
          onPress: () => alert('Custom icon')
        },
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items);
    });
  }

  showCustomTitle(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {
          title: (
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: Theme.menuItemTitleColor}}>主标题</Text>
              <Text style={{fontSize: 12, color: '#999'}}>副标题文字</Text>
            </View>
          ),
          icon: require('../icons/search.png'),
          onPress: () => alert('多行标题')
        },
        {
          title: (
            <Text style={{fontSize: 16, color: '#FF5722', fontWeight: 'bold'}}>删除操作</Text>
          ),
          icon: require('../icons/trash.png'),
          onPress: () => alert('自定义样式')
        },
        {title: '普通标题', icon: require('../icons/edit.png'), onPress: () => alert('普通')},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items);
    });
  }

  showWithShadow(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
        {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
        {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items, {shadow: true});
    });
  }

  showWithoutShadow(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
        {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
        {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items, {shadow: false});
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='xl' text='基本用法 - align 对齐方式' />
        <View style={{height: 10}} />
        <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button title='Start' ref={this.btn1Ref} onPress={() => this.show(this.btn1Ref.current, 'start')} />
          <Button title='Center' ref={this.btn2Ref} onPress={() => this.show(this.btn2Ref.current, 'center')} />
          <Button title='End' ref={this.btn3Ref} onPress={() => this.show(this.btn3Ref.current, 'end')} />
        </View>
        <View style={{flex: 1, minHeight: 100}} />
        <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button title='Start' ref={this.btn4Ref} onPress={() => this.show(this.btn4Ref.current, 'start')} />
          <Button title='Center' ref={this.btn5Ref} onPress={() => this.show(this.btn5Ref.current, 'center')} />
          <Button title='End' ref={this.btn6Ref} onPress={() => this.show(this.btn6Ref.current, 'end')} />
        </View>
        
        <View style={{height: 30}} />
        <Label type='detail' size='xl' text='icon 图标类型' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • icon: 图标，支持多种类型{'\n'}
            • 'none': 无图标{'\n'}
            • 'empty': 空图标，显示为空白并占用图标大小的空间{'\n'}
            • Image.source: 图片资源（require 或 {'{'}uri: '...'{'}'}）{'\n'}
            • React Element: 自定义组件
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Button 
            title='图标类型演示' 
            type='primary'
            ref={this.iconDemoRef}
            onPress={() => this.showIconTypes(this.iconDemoRef.current)}
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='title 作为组件' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • title: 标题，可以是字符串、数字或 React Native 组件{'\n'}
            • 使用组件可以实现多行标题、自定义颜色、样式等{'\n'}
            • 本示例展示了主副标题和自定义颜色标题
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Button 
            title='自定义 Title 组件' 
            type='primary'
            ref={this.titleDemoRef}
            onPress={() => this.showCustomTitle(this.titleDemoRef.current)}
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='shadow 阴影' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • shadow: 是否显示阴影，默认值 true{'\n'}
            • shadow=true 时，菜单会有阴影效果{'\n'}
            • shadow=false 时，菜单无阴影{'\n'}
            • Android 平台此属性无效果
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
          <Button 
            title='有阴影' 
            ref={this.shadowRef}
            onPress={() => this.showWithShadow(this.shadowRef.current)}
          />
          <Button 
            title='无阴影' 
            ref={this.noShadowRef}
            onPress={() => this.showWithoutShadow(this.noShadowRef.current)}
          />
        </View>
        
        <View style={{height: Theme.screenInset.bottom + 20}} />
      </ScrollView>
    );
  }

}
