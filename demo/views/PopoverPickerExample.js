// PopoverPickerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, PopoverPicker, Label} from 'teaset';

export default class PopoverPickerExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'PopoverPicker',
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
    this.fruitItems = [
      {id: 1, name: '苹果', color: '红色', price: '¥5/斤'},
      {id: 2, name: '香蕉', color: '黄色', price: '¥3/斤'},
      {id: 3, name: '橙子', color: '橙色', price: '¥4/斤'},
      {id: 4, name: '葡萄', color: '紫色', price: '¥8/斤'},
      {id: 5, name: '西瓜', color: '绿色', price: '¥2/斤'},
    ];
    
    this.defaultRowRef = React.createRef();
    this.modalRowRef = React.createRef();
    this.fruitRowRef = React.createRef();
    this.shadowRowRef = React.createRef();
    this.noShadowRowRef = React.createRef();
    
    Object.assign(this.state, {
      selectedIndex: null,
      modalSelectedIndex: null,
      fruitSelectedIndex: null,
      shadowSelectedIndex: null,
      noShadowSelectedIndex: null,
    });
  }

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        this.items,
        this.state.selectedIndex,
        (item, index) => this.setState({selectedIndex: index})
      );
    });
  }

  showModal(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        this.items,
        this.state.modalSelectedIndex,
        (item, index) => this.setState({modalSelectedIndex: index}),
        {modal: true}
      );
    });
  }

  showWithGetItemText(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        this.fruitItems,
        this.state.fruitSelectedIndex,
        (item, index) => {
          this.setState({fruitSelectedIndex: index});
          alert(
            `选中回调 (onSelected)\n\n` +
            `ID: ${item.id}\n` +
            `水果: ${item.name}\n` +
            `颜色: ${item.color}\n` +
            `价格: ${item.price}\n` +
            `索引: ${index}`
          );
        },
        {
          getItemText: (item, index) => `${item.name} - ${item.color} - ${item.price}`
        }
      );
    });
  }

  showWithShadow(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        this.items,
        this.state.shadowSelectedIndex,
        (item, index) => this.setState({shadowSelectedIndex: index}),
        {shadow: true}
      );
    });
  }

  showWithoutShadow(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        this.items,
        this.state.noShadowSelectedIndex,
        (item, index) => this.setState({noShadowSelectedIndex: index}),
        {shadow: false}
      );
    });
  }

  renderPage() {
    let {selectedIndex, modalSelectedIndex, fruitSelectedIndex, shadowSelectedIndex, noShadowSelectedIndex} = this.state;
    let selected = (selectedIndex || selectedIndex === 0) ? this.items[selectedIndex] : null;
    let modalSelected = (modalSelectedIndex || modalSelectedIndex === 0) ? this.items[modalSelectedIndex] : null;
    let fruitSelected = (fruitSelectedIndex || fruitSelectedIndex === 0) ? this.fruitItems[fruitSelectedIndex] : null;
    let shadowSelected = (shadowSelectedIndex || shadowSelectedIndex === 0) ? this.items[shadowSelectedIndex] : null;
    let noShadowSelected = (noShadowSelectedIndex || noShadowSelectedIndex === 0) ? this.items[noShadowSelectedIndex] : null;
    
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='xl' text='基本用法' />
        <View style={{height: 10}} />
        <ListRow title='Default' detail={selected} ref={this.defaultRowRef} onPress={() => this.show(this.defaultRowRef.current)} topSeparator='full' />
        <ListRow title='Modal' detail={modalSelected} ref={this.modalRowRef} onPress={() => this.showModal(this.modalRowRef.current)} bottomSeparator='full' />
        
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
            • onSelected: 选择某项时的回调函数 (item, index){'\n'}
            • 本示例展示水果对象数组，选择后弹窗显示完整信息
          </Text>
        </View>
        <ListRow 
          title='选择水果' 
          detail={fruitSelected ? `ID:${fruitSelected.id} ${fruitSelected.name} ${fruitSelected.price}` : null}
          ref={this.fruitRowRef}
          onPress={() => this.showWithGetItemText(this.fruitRowRef.current)} 
          topSeparator='full'
          bottomSeparator='full'
        />
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='shadow' />
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
            • shadow: 是否显示阴影，默认值 true（仅 iOS 有效）{'\n'}
            • shadow=true 时，气泡会有阴影效果{'\n'}
            • shadow=false 时，气泡无阴影{'\n'}
            • Android 平台此属性无效果
          </Text>
        </View>
        <ListRow 
          title='有阴影 (shadow: true)' 
          detail={shadowSelected}
          ref={this.shadowRowRef}
          onPress={() => this.showWithShadow(this.shadowRowRef.current)} 
          topSeparator='full'
        />
        <ListRow 
          title='无阴影 (shadow: false)' 
          detail={noShadowSelected}
          ref={this.noShadowRowRef}
          onPress={() => this.showWithoutShadow(this.noShadowRowRef.current)} 
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
            • selected: PopoverPickerView.Item 的属性，表示是否已选中{'\n'}
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

