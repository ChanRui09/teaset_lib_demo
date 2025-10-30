// ModalIndicatorExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, ModalIndicator, Overlay, Theme} from 'teaset';

export default class ModalIndicatorExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ModalIndicator',
    showBackButton: true,
  };

  show() {
    let secs = 5;
    ModalIndicator.show(`Close after ${secs} sec(s)`);
    let timer = setInterval(() => {
      secs--;
      ModalIndicator.show(`Close after ${secs} sec(s)`);
      if (secs < 0) {
        clearInterval(timer);
        ModalIndicator.hide();
      }
    }, 1000);
  }

  // 演示 text 属性 - 字符串类型
  showWithStringText() {
    ModalIndicator.show('正在加载中...');
    setTimeout(() => ModalIndicator.hide(), 3000);
  }

  // 演示 text 属性 - 数字类型
  showWithNumberText() {
    let progress = 0;
    ModalIndicator.show(progress);
    let timer = setInterval(() => {
      progress += 10;
      ModalIndicator.show(`${progress}%`);
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => ModalIndicator.hide(), 500);
      }
    }, 300);
  }

  // 演示 text 属性 - React 组件类型
  showWithElementText() {
    const customText = (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>📦</Text>
        <Text style={{color: '#fff', fontSize: 14, marginTop: 5}}>上传中...</Text>
        <Text style={{color: '#ccc', fontSize: 12, marginTop: 3}}>请稍候</Text>
      </View>
    );
    ModalIndicator.show(customText);
    setTimeout(() => ModalIndicator.hide(), 3000);
  }

  // 演示 position 属性 - top
  showAtTop() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='顶部位置 (position: top)'
        position='top'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 position 属性 - bottom
  showAtBottom() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='底部位置 (position: bottom)'
        position='bottom'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 position 属性 - center
  showAtCenter() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='中心位置 (position: center)'
        position='center'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 size 属性 - small
  showSmallSize() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='小尺寸指示器 (size: small)'
        size='small'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 size 属性 - large
  showLargeSize() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='大尺寸指示器 (size: large)'
        size='large'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 color 属性 - 自定义颜色
  showCustomColor() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='红色指示器 (color: #ff0000)'
        color='#ff0000'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 color 属性 - 蓝色
  showBlueColor() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='蓝色指示器 (color: #0066ff)'
        color='#0066ff'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  // 演示 color 属性 - 绿色
  showGreenColor() {
    let key = Overlay.show(
      <ModalIndicator.IndicatorView
        text='绿色指示器 (color: #00cc00)'
        color='#00cc00'
      />
    );
    setTimeout(() => Overlay.hide(key), 3000);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Show (原始demo)' onPress={() => this.show()} topSeparator='full' />
        
        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          text 属性演示 - 可以是字符串、数字或 React 组件
        </Text>
        <ListRow title='字符串文本' onPress={() => this.showWithStringText()} topSeparator='full' />
        <ListRow title='数字进度' onPress={() => this.showWithNumberText()} />
        <ListRow title='React组件文本' onPress={() => this.showWithElementText()} bottomSeparator='full' />

        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          position 属性演示 - 控制显示位置 (top/bottom/center)
        </Text>
        <ListRow title='顶部位置 (top)' onPress={() => this.showAtTop()} topSeparator='full' />
        <ListRow title='底部位置 (bottom)' onPress={() => this.showAtBottom()} />
        <ListRow title='中心位置 (center)' onPress={() => this.showAtCenter()} bottomSeparator='full' />

        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          size 属性演示 - 控制指示器大小 (small/large)
        </Text>
        <ListRow title='小尺寸 (small)' onPress={() => this.showSmallSize()} topSeparator='full' />
        <ListRow title='大尺寸 (large)' onPress={() => this.showLargeSize()} bottomSeparator='full' />

        <View style={{height: 20}} />
        <Text style={{marginLeft: 20, color: '#999', fontSize: 12}}>
          color 属性演示 - 自定义指示器颜色
        </Text>
        <ListRow title='红色指示器' onPress={() => this.showCustomColor()} topSeparator='full' />
        <ListRow title='蓝色指示器' onPress={() => this.showBlueColor()} />
        <ListRow title='绿色指示器' onPress={() => this.showGreenColor()} bottomSeparator='full' />
        
        <View style={{height: 20}} />
      </ScrollView>
    );
  }

}
