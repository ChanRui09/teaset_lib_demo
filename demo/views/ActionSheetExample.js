// ActionSheetExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, ActionSheet, Label, Theme, Overlay} from 'teaset';

export default class ActionSheetExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ActionSheet',
    showBackButton: true,
  };
  
  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
    if (this.customKey) {
      Overlay.hide(this.customKey);
      this.customKey = null;
    }
    if (this.typeKey) {
      Overlay.hide(this.typeKey);
      this.typeKey = null;
    }
  }

  show(modal) {
    let items = [
      {title: 'Say hello', onPress: () => alert('Hello')},
      {title: 'Do nothing'},
      {title: 'Disabled', disabled: true},
    ];
    let cancelItem = {title: 'Cancel'};
    this.overlayKey = ActionSheet.show(items, cancelItem, {modal});
  }

  showSeparator() {
    // 使用 Overlay.PullView + ActionSheet.Item 组合展示分隔线效果
    let overlayView = (
      <Overlay.PullView side='bottom' modal={false}>
        <ActionSheet.ActionSheetView.Item
          title='无上分隔线 (topSeparator: none)'
          topSeparator='none'
          onPress={() => {alert('Item 1'); Overlay.hide(this.customKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          title='缩进分隔线 (topSeparator: indent)'
          topSeparator='indent'
          onPress={() => {alert('Item 2'); Overlay.hide(this.customKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          title='满行分隔线 (topSeparator: full)'
          topSeparator='full'
          onPress={() => {alert('Item 3'); Overlay.hide(this.customKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          title='缩进分隔线 (topSeparator: indent)'
          topSeparator='indent'
          onPress={() => {alert('Item 4'); Overlay.hide(this.customKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          type='cancel'
          title='取消'
          topSeparator='full'
          onPress={() => Overlay.hide(this.customKey)}
        />
        <View style={{backgroundColor: Theme.asCancelItemColor, height: Theme.screenInset.bottom}} />
      </Overlay.PullView>
    );
    this.customKey = Overlay.show(overlayView);
  }

  showCustomTitle() {
    let items = [
      {title: '普通文本项', onPress: () => alert('Normal')},
      {
        title: (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: '#4caf50', marginRight: 8}} />
            <Label style={{fontSize: 16, color: '#4caf50', fontWeight: 'bold'}} text='自定义组件标题' />
            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: '#4caf50', marginLeft: 8}} />
          </View>
        ),
        onPress: () => alert('Custom Component')
      },
      {
        title: (
          <View style={{alignItems: 'center'}}>
            <Label style={{fontSize: 14, color: '#ff9800', fontWeight: 'bold'}} text='多行标题' />
            <Label style={{fontSize: 12, color: '#999', marginTop: 2}} text='副标题说明文字' />
          </View>
        ),
        onPress: () => alert('Multi-line')
      },
    ];
    let cancelItem = {title: '取消'};
    this.overlayKey = ActionSheet.show(items, cancelItem);
  }

  showItemTypes() {
    // 使用 Overlay.PullView 来演示不同 type
    let overlayView = (
      <Overlay.PullView side='bottom' modal={false}>
        <ActionSheet.ActionSheetView.Item
          type='default'
          title='Default 类型（普通样式）'
          topSeparator='none'
          onPress={() => {alert('Default type'); Overlay.hide(this.typeKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          type='default'
          title='另一个 Default 类型'
          topSeparator='full'
          onPress={() => {alert('Default 2'); Overlay.hide(this.typeKey);}}
        />
        <ActionSheet.ActionSheetView.Item
          type='default'
          title='禁用状态'
          topSeparator='full'
          disabled={true}
        />
        <ActionSheet.ActionSheetView.Item
          type='cancel'
          title='Cancel 类型（取消样式）'
          topSeparator='full'
          onPress={() => Overlay.hide(this.typeKey)}
        />
        <View style={{backgroundColor: Theme.asCancelItemColor, height: Theme.screenInset.bottom}} />
      </Overlay.PullView>
    );
    this.typeKey = Overlay.show(overlayView);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' onPress={() => this.show(false)} topSeparator='full' />
        <ListRow title='Modal' onPress={() => this.show(true)} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='topSeparator / bottomSeparator' onPress={() => this.showSeparator()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#e3f2fd', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#1976d2', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• topSeparator / bottomSeparator: 设置分隔线样式' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• none: 无分隔线' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• indent: 缩进分隔线' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• full: 满行分隔线' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='title 自定义组件' onPress={() => this.showCustomTitle()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#fff3e0', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#e65100', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• title: 可以是字符串、数字或 React Native 组件' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 使用组件可实现复杂布局（图标、多行文字等）' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='type 类型对比' onPress={() => this.showItemTypes()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#f3e5f5', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#6a1b9a', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• type: 控制选项的显示类型' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• default: 默认样式（主题定义的颜色）' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• cancel: 取消样式（取消按钮专用）' />
          <Label style={{fontSize: 12, color: '#ff6f00', lineHeight: 18, marginTop: 4}} text='注意：具体颜色由 Theme 主题决定' />
        </View>
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
