// DrawerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import {Theme, NavigationPage, ListRow, Drawer, Button, Label, Overlay} from 'teaset';
import SelectRow from './SelectRow';

export default class DrawerExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Drawer',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      rootTransform: 'none',
    });
    this.drawerViewController = null;
  }

  componentWillUnmount() {
    if (this.drawer) {
      this.drawer.close();
      this.drawer = null;
    }
    if (this.drawerViewController) {
      this.drawerViewController.close(false);
      this.drawerViewController = null;
    }
  }

  show(side) {
    let {rootTransform} = this.state;
    if (side == 'left' || side == 'right') {
      this.drawer = Drawer.open(this.renderDrawerMenu(), side, rootTransform);
    } else {
      this.drawer = Drawer.open(this.renderDrawerBox(side), side, rootTransform, {containerStyle: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
    }
  }

  renderDrawerMenu() {
    return (
      <View style={{backgroundColor: Theme.defaultColor, width: 260, flex: 1}}>
        <View style={{height: 60}} />
        <ListRow
          icon={
            <View style={{paddingRight: 12}}>
              <Image style={{width: 30, height: 30, tintColor: Theme.primaryColor}} source={require('../icons/me_active.png')} />
            </View>
          }
          title='User name'
          />
        <ListRow
          icon={require('../icons/home_active.png')}
          title='Home'
          />
        <ListRow
          icon={require('../icons/store_active.png')}
          title='Store'
          bottomSeparator='none'
          />
        <View style={{flex: 1}} />
        <Button type='link' size='sm' title='Hide' onPress={() => this.drawer && this.drawer.close()} />
      </View>
    );
  }

  renderDrawerBox(side) {
    return (
      <View style={{
        height: 290,
        justifyContent: side == 'top' ? 'flex-start' : 'flex-end',
      }}>
        <View style={{backgroundColor: Theme.defaultColor, height: 260}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Label type='detail' size='xl' text='Drawer' />
          </View>
        </View>
        <Image
          style={{
            position: 'absolute',
            top: side == 'bottom' ? 0 : undefined,
            bottom: side == 'top' ? 0 : undefined,
            left: 12,
            width: 60,
            height: 60,
            borderRadius: 30
          }}
          source={require('../images/faircup.jpg')}
          />
      </View>
    );
  }

  renderDrawerViewContent(side, onClose) {
    let {rootTransform} = this.state;
    let isHorizontal = side === 'left' || side === 'right';
    let containerStyle = {
      backgroundColor: Theme.defaultColor,
      paddingHorizontal: 20,
      paddingVertical: 24,
      justifyContent: 'space-between',
    };
    if (isHorizontal) {
      Object.assign(containerStyle, {width: 280, flex: 1});
    } else {
      Object.assign(containerStyle, {height: 260, alignSelf: 'stretch'});
    }
    return (
      <View style={containerStyle}>
        <View>
          <Label type='detail' size='lg' text='Drawer.DrawerView Demo' style={{fontWeight: 'bold', color: '#333'}} />
          <View style={{height: 8}} />
          <Text style={{color: '#666', fontSize: 13}}>当前打开侧：{side}</Text>
          <Text style={{color: '#666', fontSize: 13, marginTop: 4}}>rootTransform：{rootTransform}</Text>
          <Text style={{color: '#999', fontSize: 12, marginTop: 6}}>通过直接使用 Drawer.DrawerView，可以自定义内容布局、尺寸和关闭行为。</Text>
        </View>
        <View>
          <Button
            title='关闭抽屉'
            type='secondary'
            onPress={onClose}
          />
        </View>
      </View>
    );
  }

  showUsingDrawerView(side) {
    let {rootTransform} = this.state;
    if (this.drawerViewController) {
      this.drawerViewController.close(false);
      this.drawerViewController = null;
    }
    let drawerRef = null;
    const key = Overlay.show(
      <Drawer.DrawerView
        side={side}
        rootTransform={rootTransform}
        modal={false}
        overlayOpacity={0.3}
        ref={ref => drawerRef = ref}
        onDisappearCompleted={() => {
          if (this.drawerViewController && this.drawerViewController.key === key) {
            this.drawerViewController = null;
          }
        }}
      >
        {this.renderDrawerViewContent(side, () => {
          if (drawerRef && !drawerRef.closed) {
            drawerRef.close();
          } else {
            Overlay.hide(key);
          }
        })}
      </Drawer.DrawerView>
    );
    this.drawerViewController = {
      key,
      close: (animated) => {
        if (drawerRef && !drawerRef.closed) {
          drawerRef.close(animated);
        } else {
          Overlay.hide(key);
        }
      },
    };
  }

  renderPage() {
    let {rootTransform} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='md' text=' side 拉出边' style={{ fontWeight: 'bold', color: '#000' }}/>
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          side 属性演示 - 控制抽屉从哪一侧拉出 (left/right/top/bottom)
        </Text>
        <ListRow title='Left side' onPress={() => this.show('left')} topSeparator='full' />
        <ListRow title='Right side' onPress={() => this.show('right')} />
        <ListRow title='Top side' onPress={() => this.show('top')} />
        <ListRow title='Bottom side' onPress={() => this.show('bottom')} bottomSeparator='full'/>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text=' rootTransform 根组件转换动画' style={{ fontWeight: 'bold', color: '#000' }}/>
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          rootTransform 属性演示 - 选择根视图随抽屉的动画 (none/translate/scale)
        </Text>
        <SelectRow
          title='Root transform'
          value={rootTransform}
          items={['none', 'translate', 'scale']}
          onSelected={(item, index) => this.setState({rootTransform: item})}
          topSeparator='full'
          bottomSeparator='full'
          />
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='直接使用 Drawer.DrawerView' style={{ fontWeight: 'bold', color: '#000' }}/>
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          使用 Drawer.DrawerView 组件可手动构建抽屉内容，搭配 Overlay.show 控制显示与关闭。
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 12}}>
          <Button title='DrawerView (left)' onPress={() => this.showUsingDrawerView('left')} />
          <Button title='DrawerView (bottom)' onPress={() => this.showUsingDrawerView('bottom')} />
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    );
  }

}

