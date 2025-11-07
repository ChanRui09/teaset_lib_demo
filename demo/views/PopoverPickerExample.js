// PopoverPickerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, PopoverPicker, Label, Overlay, Button} from 'teaset';

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
    this.alignStartRef = React.createRef();
    this.alignCenterRef = React.createRef();
    this.alignEndRef = React.createRef();
    this.directionDownRef = React.createRef();
    this.directionUpRef = React.createRef();
    this.directionLeftRef = React.createRef();
    this.directionRightRef = React.createRef();
    this.arrowTrueRef = React.createRef();
    this.arrowFalseRef = React.createRef();
    
    Object.assign(this.state, {
      selectedIndex: null,
      modalSelectedIndex: null,
      fruitSelectedIndex: null,
      shadowSelectedIndex: null,
      noShadowSelectedIndex: null,
    });
  }
  
  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
  }

  measureAndShow(view, items, selectedIndex, onSelected, options = {}) {
    if (!view || !view.measure) {
      return;
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      this.overlayKey = PopoverPicker.show(
        {x: pageX, y: pageY, width, height},
        items,
        selectedIndex,
        onSelected,
        options
      );
    });
  }

  show(view) {
    this.measureAndShow(
      view,
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({selectedIndex: index})
    );
  }

  showModal(view) {
    this.measureAndShow(
      view,
      this.items,
      this.state.modalSelectedIndex,
      (item, index) => this.setState({modalSelectedIndex: index}),
      {modal: true}
    );
  }

  showWithGetItemText(view) {
    this.measureAndShow(
      view,
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
  }

  showWithShadow(view) {
    this.measureAndShow(
      view,
      this.items,
      this.state.shadowSelectedIndex,
      (item, index) => this.setState({shadowSelectedIndex: index}),
      {shadow: true}
    );
  }

  showWithoutShadow(view) {
    this.measureAndShow(
      view,
      this.items,
      this.state.noShadowSelectedIndex,
      (item, index) => this.setState({noShadowSelectedIndex: index}),
      {shadow: false}
    );
  }

  showWithAlign(view, align) {
    this.measureAndShow(
      view,
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({selectedIndex: index}),
      {align}
    );
  }

  showWithDirection(view, direction) {
    this.measureAndShow(
      view,
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({selectedIndex: index}),
      {direction}
    );
  }

  showWithArrow(view, showArrow) {
    const options = showArrow
      ? {showArrow: true, shadow: false}
      : {showArrow: false};
    this.measureAndShow(
      view,
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({selectedIndex: index}),
      options
    );
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
        
        <Label type='detail' size='md' text='基本用法' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <ListRow title='Default' detail={selected} ref={this.defaultRowRef} onPress={() => this.show(this.defaultRowRef.current)} topSeparator='full' />
        <ListRow title='Modal' detail={modalSelected} ref={this.modalRowRef} onPress={() => this.showModal(this.modalRowRef.current)} bottomSeparator='full' />
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='align 对齐方式' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          align 属性演示 - 控制气泡相对触发视图的水平对齐方式 (start/center/end)
        </Text>
        <View style={{height: 12}} />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button title='Start' ref={this.alignStartRef} onPress={() => this.showWithAlign(this.alignStartRef.current, 'start')} />
          <Button title='Center' ref={this.alignCenterRef} onPress={() => this.showWithAlign(this.alignCenterRef.current, 'center')} />
          <Button title='End' ref={this.alignEndRef} onPress={() => this.showWithAlign(this.alignEndRef.current, 'end')} />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='direction 弹出方向' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          direction 属性演示 - 控制气泡弹出的方向 (down/up/left/right)
        </Text>
        <View style={{height: 12}} />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 12}}>
          <Button title='Down' ref={this.directionDownRef} onPress={() => this.showWithDirection(this.directionDownRef.current, 'down')} />
          <Button title='Up' ref={this.directionUpRef} onPress={() => this.showWithDirection(this.directionUpRef.current, 'up')} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Button title='Left' ref={this.directionLeftRef} onPress={() => this.showWithDirection(this.directionLeftRef.current, 'left')} style={{marginBottom: 12}} />
          <Button title='Right' ref={this.directionRightRef} onPress={() => this.showWithDirection(this.directionRightRef.current, 'right')} />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='showArrow 箭头显示' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          showArrow 属性演示 - 控制气泡是否显示箭头 (true/false)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 12}}>
          <Button title='显示箭头' ref={this.arrowTrueRef} onPress={() => this.showWithArrow(this.arrowTrueRef.current, true)} />
          <Button title='隐藏箭头' ref={this.arrowFalseRef} onPress={() => this.showWithArrow(this.arrowFalseRef.current, false)} />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='getItemText + onSelected' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          getItemText 属性演示 - 自定义显示文本；onSelected 回调会返回选中项及索引
        </Text>
        <ListRow 
          title='选择水果' 
          detail={fruitSelected ? `ID:${fruitSelected.id} ${fruitSelected.name} ${fruitSelected.price}` : null}
          ref={this.fruitRowRef}
          onPress={() => this.showWithGetItemText(this.fruitRowRef.current)} 
          topSeparator='full'
          bottomSeparator='full'
        />
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='shadow 阴影' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          shadow 属性演示 - 控制气泡阴影显示 (仅 iOS 有效)
        </Text>
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
        <Label type='detail' size='md' text='selected 属性' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          selected 属性说明 - 通过 selectedIndex 自动高亮已选项，右侧会显示 ✓ 标记
        </Text>
        
        <View style={{height: 20}} />
      </ScrollView>
    );
  }

}

