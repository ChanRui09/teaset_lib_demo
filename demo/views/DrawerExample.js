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
    //Overflow is not supported on Android, then use a higher container view to implement this functionality
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
        
        <Label type='detail' size='xl' text='side 拉出边' />
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
            • side: 抽屉拉出边，默认值 'left'{'\n'}
            • 'left': 从左侧拉出{'\n'}
            • 'right': 从右侧拉出{'\n'}
            • 'top': 从顶部拉出{'\n'}
            • 'bottom': 从底部拉出
          </Text>
        </View>
        <ListRow title='Left side' onPress={() => this.show('left')} topSeparator='full' />
        <ListRow title='Right side' onPress={() => this.show('right')} />
        <ListRow title='Top side' onPress={() => this.show('top')} />
        <ListRow title='Bottom side' onPress={() => this.show('bottom')} bottomSeparator='full'/>
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='rootTransform 根组件转换动画' />
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
            • rootTransform: 根组件转换动画，默认值 'none'{'\n'}
            • 'none': 无动画，抽屉覆盖在根组件上{'\n'}
            • 'translate': 平移动画，根组件随抽屉平移{'\n'}
            • 'scale': 缩放动画，根组件缩小并平移{'\n'}
            • 选择后点击上面的按钮查看不同效果
          </Text>
        </View>
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

