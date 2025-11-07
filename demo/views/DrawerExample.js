// DrawerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import {Theme, NavigationPage, ListRow, Drawer, Button, Label} from 'teaset';
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
  }

  componentWillUnmount() {
    if (this.drawer) {
      this.drawer.close();
      this.drawer = null;
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
      </ScrollView>
    );
  }

}

