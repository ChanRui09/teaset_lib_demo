// MenuExample.js

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {NavigationPage, Menu, Button, Theme, Label, Overlay} from 'teaset';

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
    this.directionDownRef = React.createRef();
    this.directionUpRef = React.createRef();
    this.directionLeftRef = React.createRef();
    this.directionRightRef = React.createRef();
    this.iconDemoRef = React.createRef();
    this.titleDemoRef = React.createRef();
    this.shadowRef = React.createRef();
    this.noShadowRef = React.createRef();
    this.arrowTrueRef = React.createRef();
    this.arrowFalseRef = React.createRef();
  }
    
  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
  }

  getDefaultItems() {
    return [
      {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
      {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
      {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
    ];
  }

  measureAndShow(view, items, options = {}) {
    if (!view || !view.measure) {
      return;
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      this.overlayKey = Menu.show({x: pageX, y: pageY, width, height}, items, options);
    });
  }

  show(view, align) {
    this.measureAndShow(view, this.getDefaultItems(), {align});
  }

  showIconTypes(view) {
    const items = [
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
    this.measureAndShow(view, items);
  }

  showCustomTitle(view) {
    const items = [
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
    this.measureAndShow(view, items);
  }

  showWithShadow(view) {
    this.measureAndShow(view, this.getDefaultItems(), {shadow: true});
  }

  showWithoutShadow(view) {
    this.measureAndShow(view, this.getDefaultItems(), {shadow: false});
  }

  showWithDirection(view, direction) {
    this.measureAndShow(view, this.getDefaultItems(), {direction});
  }

  showWithArrow(view, showArrow) {
    this.measureAndShow(view, this.getDefaultItems(), {showArrow});
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='md' text='基本用法 - align 对齐方式' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          align 属性演示 - 控制菜单相对触发视图的水平对齐方式 (start/center/end)
        </Text>
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
        <Label type='detail' size='md' text='direction 弹出方向' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          direction 属性演示 - 控制菜单从触发点的弹出方向 (down/up/left/right)
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 12}}>
          <Button title='Down' ref={this.directionDownRef} onPress={() => this.showWithDirection(this.directionDownRef.current, 'down')} />
          <Button title='Up' ref={this.directionUpRef} onPress={() => this.showWithDirection(this.directionUpRef.current, 'up')} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button title='Left' ref={this.directionLeftRef} onPress={() => this.showWithDirection(this.directionLeftRef.current, 'left')} style={{marginRight: 24}} />
          <Button title='Right' ref={this.directionRightRef} onPress={() => this.showWithDirection(this.directionRightRef.current, 'right')} />
        </View>

        <View style={{height: 30}} />
        <Label type='detail' size='md' text='icon 图标类型' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          icon 属性演示 - 支持字符串枚举 (none/empty)、图片资源，以及自定义组件
        </Text>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Button 
            title='图标类型演示' 
            type='primary'
            ref={this.iconDemoRef}
            onPress={() => this.showIconTypes(this.iconDemoRef.current)}
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='title 作为组件' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          title 属性演示 - 标题可为字符串、数字或 React 组件，实现多行与自定义样式
        </Text>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Button 
            title='自定义 Title 组件' 
            type='primary'
            ref={this.titleDemoRef}
            onPress={() => this.showCustomTitle(this.titleDemoRef.current)}
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='shadow 阴影' style={{ fontWeight: 'bold', color: '#000' }}/>
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          shadow 属性演示 - 控制 iOS 上菜单阴影的显示 (true/false)
        </Text>
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

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='showArrow 箭头' style={{ fontWeight: 'bold', color: '#000' }}/>
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          showArrow 属性演示 - 控制是否显示气泡箭头 (true/false)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
          <Button 
            title='显示箭头' 
            ref={this.arrowTrueRef}
            onPress={() => this.showWithArrow(this.arrowTrueRef.current, true)}
          />
          <Button 
            title='隐藏箭头' 
            ref={this.arrowFalseRef}
            onPress={() => this.showWithArrow(this.arrowFalseRef.current, false)}
          />
        </View>
        
        <View style={{height: Theme.screenInset.bottom + 20}} />
      </ScrollView>
    );
  }

}
