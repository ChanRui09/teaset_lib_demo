// PullPickerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, PullPicker, Label, Overlay} from 'teaset';

export default class PullPickerExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'PullPicker',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.items = [
      'Aged Pu\'er',
      'Bohea',
      'Chrysanthemum',
      'Hyson',
      'Jasmine',
      'Keemun',
      'Loungjing',
      'Pekoe',
      'Tieguanyin',
    ];
    
    // 对象类型的 items，用于演示 getItemText
    this.objectItems = [
      {id: 1, name: '北京', code: 'BJ', population: '2171万'},
      {id: 2, name: '上海', code: 'SH', population: '2487万'},
      {id: 3, name: '广州', code: 'GZ', population: '1867万'},
      {id: 4, name: '深圳', code: 'SZ', population: '1756万'},
      {id: 5, name: '成都', code: 'CD', population: '2093万'},
      {id: 6, name: '杭州', code: 'HZ', population: '1220万'},
    ];
    
    Object.assign(this.state, {
      selectedIndex: null,
      modalSelectedIndex: null,
      citySelectedIndex: null,
    });
  }
    
  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
  }

  show() {
    this.overlayKey = PullPicker.show(
      'Select item',
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({selectedIndex: index})
    );
  }

  showModal() {
    this.overlayKey = PullPicker.show(
      'Select item',
      this.items,
      this.state.modalSelectedIndex,
      (item, index) => this.setState({modalSelectedIndex: index}),
      {modal: true}
    );
  }

  showWithGetItemText() {
    this.overlayKey = PullPicker.show(
      '选择城市',
      this.objectItems,
      this.state.citySelectedIndex,
      (item, index) => {
        this.setState({citySelectedIndex: index});
        // onSelected 回调演示：显示选中项的完整信息
        alert(
          `选中回调 (onSelected)\n\n` +
          `ID: ${item.id}\n` +
          `城市: ${item.name}\n` +
          `代码: ${item.code}\n` +
          `人口: ${item.population}\n` +
          `索引: ${index}`
        );
      },
      {
        getItemText: (item, index) => `${item.name} (${item.code}) - 人口: ${item.population}`
      }
    );
  }

  renderPage() {
    let {selectedIndex, modalSelectedIndex, citySelectedIndex} = this.state;
    let selected = (selectedIndex || selectedIndex === 0) ? this.items[selectedIndex] : null;
    let modalSelected = (modalSelectedIndex || modalSelectedIndex === 0) ? this.items[modalSelectedIndex] : null;
    let citySelected = (citySelectedIndex || citySelectedIndex === 0) ? this.objectItems[citySelectedIndex] : null;
    
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='xl' text='基本用法' />
        <View style={{height: 10}} />
        <ListRow title='Default' detail={selected} onPress={() => this.show()} topSeparator='full' />
        <ListRow title='Modal' detail={modalSelected} onPress={() => this.showModal()} bottomSeparator='full' />
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='getItemText + onSelected' />
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
            • getItemText: 自定义获取 items 数组元素的显示文本{'\n'}
            • 函数签名: (item, index) {'=>'} string{'\n'}
            • 适用于 items 为对象数组时，提取特定字段显示{'\n'}
            • onSelected: 选择某项时的回调函数，返回 (item, index){'\n'}
            • 本示例展示了城市对象数组，选择后弹窗显示完整信息（包括 id）
          </Text>
        </View>
        <ListRow 
          title='选择城市' 
          detail={citySelected ? `ID:${citySelected.id} ${citySelected.name} (${citySelected.population})` : null}
          onPress={() => this.showWithGetItemText()} 
          topSeparator='full'
          bottomSeparator='full'
        />
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='selected 属性' />
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
            • selected: PullPickerView.Item 的属性，表示是否已选中{'\n'}
            • 选中项会在右侧显示 ✓ 对勾图标{'\n'}
            • 通过 selectedIndex 参数自动标记当前选中项{'\n'}
            • 上面的演示中已经包含了此效果，点击选择后会看到对勾
          </Text>
        </View>
        
        <View style={{height: 20}} />
      </ScrollView>
    );
  }

}

