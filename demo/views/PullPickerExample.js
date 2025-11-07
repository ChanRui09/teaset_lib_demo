// PullPickerExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { NavigationPage, ListRow, PullPicker, Label, Overlay } from 'teaset';

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
      { id: 1, name: '北京', code: 'BJ', population: '2171万' },
      { id: 2, name: '上海', code: 'SH', population: '2487万' },
      { id: 3, name: '广州', code: 'GZ', population: '1867万' },
      { id: 4, name: '深圳', code: 'SZ', population: '1756万' },
      { id: 5, name: '成都', code: 'CD', population: '2093万' },
      { id: 6, name: '杭州', code: 'HZ', population: '1220万' },
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

  show(options = {}) {
    this.overlayKey = PullPicker.show(
      'Select item',
      this.items,
      this.state.selectedIndex,
      (item, index) => this.setState({ selectedIndex: index }),
      options
    );
  }

  showModal() {
    this.overlayKey = PullPicker.show(
      'Select item',
      this.items,
      this.state.modalSelectedIndex,
      (item, index) => this.setState({ modalSelectedIndex: index }),
      { modal: true }
    );
  }

  showWithGetItemText() {
    this.overlayKey = PullPicker.show(
      '选择城市',
      this.objectItems,
      this.state.citySelectedIndex,
      (item, index) => {
        this.setState({ citySelectedIndex: index });
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
    let { selectedIndex, modalSelectedIndex, citySelectedIndex } = this.state;
    let selected = (selectedIndex || selectedIndex === 0) ? this.items[selectedIndex] : null;
    let modalSelected = (modalSelectedIndex || modalSelectedIndex === 0) ? this.items[modalSelectedIndex] : null;
    let citySelected = (citySelectedIndex || citySelectedIndex === 0) ? this.objectItems[citySelectedIndex] : null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 20 }} />

        <Label type='detail' size='md' text='基本用法' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{ height: 10 }} />
        <Text style={{ marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18 }}>
          title / items / selectedIndex 组合展示基础选择器。
        </Text>
        <ListRow title='Default' detail={selected} onPress={() => this.show()} topSeparator='full' />
        <ListRow title='selectedIndex(2-第三项)' detail={selected} onPress={() => this.show({ selectedIndex: 2 })} />
        <ListRow title='modal' detail={modalSelected} onPress={() => this.showModal()} bottomSeparator='full' />

        <View style={{ height: 20 }} />
        <Label type='detail' size='md' text='getItemText + onSelected' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{ height: 10 }} />
        <Text style={{ marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18 }}>
          getItemText 让对象数据自定义显示文本；onSelected 回调返回选中项和索引。
        </Text>
        <ListRow
          title='选择城市'
          detail={citySelected ? `ID:${citySelected.id} ${citySelected.name} (${citySelected.population})` : null}
          onPress={() => this.showWithGetItemText()}
          topSeparator='full'
          bottomSeparator='full'
        />

        <View style={{ height: 20 }} />
        <Label type='detail' size='md' text='selected 属性' style={{ fontWeight: 'bold', color: '#000' }} />
        <View style={{ height: 10 }} />
        <Text style={{ marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18 }}>
          selected 属性说明 - 通过 selectedIndex 自动标记当前选项，右侧会显示 ✓
        </Text>

        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

}

