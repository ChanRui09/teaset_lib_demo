// SegmentedViewExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, SegmentedView, Label, PullPicker, Toast} from 'teaset';

import SelectRow from './SelectRow';

export default class SegmentedViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SegmentedView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.items = ['projector', 'carousel'];
    this.barPositionItems = ['top', 'bottom'];
    this.justifyItemItems = ['fixed', 'scrollable'];
    this.indicatorTypeItems = ['none', 'boxWidth', 'itemWidth'];
    this.indicatorPositionItems = ['top', 'bottom'];
    this.manyItems = [
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
    Object.assign(this.state, {
      type: 'projector',
      custom: false,
      activeIndex: 0,
      barPosition: 'top',
      barStyle: null,
      justifyItem: 'fixed',
      indicatorType: 'itemWidth',
      indicatorPosition: 'bottom',
      animated: true,
      autoScroll: true,
      useTitleStyle: false,
      useBadge: false,
      indicatorPositionPadding: null,
      useManyItems: false,
    });
  }

  renderTitle(index) {
    let {custom, activeIndex, useManyItems} = this.state;
    let titles = useManyItems ? this.manyItems : ['One', 'Two', 'Three'];
    if (!custom) return titles[index];

    let icons = [
      require('../icons/home.png'),
      require('../icons/store.png'),
      require('../icons/me.png'),
    ];
    let activeIcons = [
      require('../icons/home_active.png'),
      require('../icons/store_active.png'),
      require('../icons/me_active.png'),
    ];
    let isActive = index == activeIndex;
    let tintColor = isActive ? Theme.primaryColor : '#989898';

    return (
      <View style={{alignItems: 'center'}} key={index}>
        <Image
          style={{width: 20, height: 20, tintColor}}
          source={isActive ? activeIcons[index] : icons[index]}
          />
        <Label style={{color: tintColor, paddingTop: 4}} text={titles[index]} />
      </View>
    );
  }

  renderPage() {
    let {custom, type, barPosition, barStyle, justifyItem, indicatorType, indicatorPosition, animated, autoScroll, useTitleStyle, useBadge, indicatorPositionPadding, useManyItems} = this.state;
    let titles = useManyItems ? this.manyItems : ['One', 'Two', 'Three'];
    
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <SegmentedView
          style={{height: 300, minHeight: 300}}
          type={type}
          barPosition={barPosition}
          barStyle={barStyle}
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          indicatorLineColor={custom ? '#5cb85c' : undefined}
          indicatorLineWidth={custom ? 1 : undefined}
          indicatorPositionPadding={indicatorPositionPadding !== null ? indicatorPositionPadding : (custom ? 3 : undefined)}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={this.state.activeIndex}
          onChange={index => {
            console.log(`SegmentedView changed to index: ${index}`);
            Toast.message(`Segment ${index + 1}`, {position: 'top', duration: 1000});
            this.setState({activeIndex: index});
          }}
        >
          {titles.map((item, index) => (
            <SegmentedView.Sheet 
              key={index}
              title={this.renderTitle(index)}
              titleStyle={useTitleStyle ? {fontSize: 14, color: '#999'} : undefined}
              activeTitleStyle={useTitleStyle ? {fontSize: 16, color: '#ff5722', fontWeight: 'bold'} : undefined}
              badge={useBadge && index === 0 ? '5' : (useBadge && index === 1 ? 'new' : undefined)}
            >
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Label type='detail' size='xl' text={`Segment ${item}`} />
              </View>
            </SegmentedView.Sheet>
          ))}
        </SegmentedView>
        <View style={{height: 20}} />
        <SelectRow
          title='Type'
          value={type}
          items={this.items}
          onSelected={(item, index) => this.setState({type: item})}
          topSeparator='full'
          />
        <SelectRow
          title='barPosition (工具条位置)'
          value={barPosition}
          items={this.barPositionItems}
          onSelected={(item, index) => this.setState({barPosition: item})}
          />
        <ListRow
          title='barStyle (工具条样式)'
          detail={barStyle ? 'backgroundColor: #f0f0f0' : '默认'}
          onPress={() => this.setState({barStyle: barStyle ? null : {backgroundColor: '#f0f0f0', paddingVertical: 5}})}
          />
        <SelectRow
          title='justifyItem (排列模式)'
          value={justifyItem}
          items={this.justifyItemItems}
          onSelected={(item, index) => this.setState({justifyItem: item})}
          />
        <SelectRow
          title='indicatorType (指示器类型)'
          value={indicatorType}
          items={this.indicatorTypeItems}
          onSelected={(item, index) => this.setState({indicatorType: item})}
          />
        <SelectRow
          title='indicatorPosition (指示器位置)'
          value={indicatorPosition}
          items={this.indicatorPositionItems}
          onSelected={(item, index) => this.setState({indicatorPosition: item})}
          />
        <ListRow
          title='indicatorPositionPadding'
          detail={indicatorPositionPadding !== null ? indicatorPositionPadding.toString() : 'Theme default'}
          onPress={() => {
            const paddings = [null, 0, 5, 10, 20];
            const currentIndex = paddings.indexOf(indicatorPositionPadding);
            const nextIndex = (currentIndex + 1) % paddings.length;
            this.setState({indicatorPositionPadding: paddings[nextIndex]});
          }}
          />
        <ListRow
          title='animated (动画效果)'
          detail={<Switch value={animated} onValueChange={value => this.setState({animated: value})} />}
          />
        <ListRow
          title='autoScroll (自动滚动)'
          detail={<Switch value={autoScroll} onValueChange={value => this.setState({autoScroll: value})} />}
          />
        <ListRow
          title='Use many items (测试 autoScroll)'
          detail={<Switch value={useManyItems} onValueChange={value => this.setState({useManyItems: value, justifyItem: value ? 'scrollable' : 'fixed', activeIndex: 0})} />}
          />
        <ListRow
          title='activeIndex (跳转到指定页)'
          detail={`当前: ${this.state.activeIndex}`}
          onPress={() => {
            const itemCount = useManyItems ? this.manyItems.length : 3;
            PullPicker.show(
              'Select Page',
              Array.from({length: itemCount}, (_, i) => `Page ${i}`),
              this.state.activeIndex,
              (item, index) => this.setState({activeIndex: index})
            );
          }}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <ListRow
          title='titleStyle & activeTitleStyle'
          detail={<Switch value={useTitleStyle} onValueChange={value => this.setState({useTitleStyle: value})} />}
          topSeparator='full'
          />
        <ListRow
          title='badge (Sheet 1, 2 显示徽章)'
          detail={<Switch value={useBadge} onValueChange={value => this.setState({useBadge: value})} />}
          />
        <ListRow
          title='Custom'
          detail={<Switch value={custom} onValueChange={value => this.setState({custom: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
