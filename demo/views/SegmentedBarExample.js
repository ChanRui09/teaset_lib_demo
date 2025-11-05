// SegmentedBarExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, Label, SegmentedBar, PullPicker, Carousel, Toast} from 'teaset';
import SelectRow from './SelectRow';

export default class SegmentedBarExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SegmentedBar',
    showBackButton: true,
  };

  constructor(props) {
    super(props);

    this.barItems = [
      'Aged Pu\'er',
      'Bohea',
      'Chrysanthemum',
      'Hyson',
    ];
    this.barScrollItems = [
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
    this.barCustomItems = ['Home', 'Store', 'Me'];

    this.justifyItemItems = ['fixed', 'scrollable'];
    this.indicatorTypeItems = ['none', 'boxWidth', 'itemWidth', 'customWidth'];
    this.indicatorPositionItems = ['top', 'bottom'];

    this.carouselRef = React.createRef();

    Object.assign(this.state, {
      justifyItem: 'fixed',
      indicatorType: 'itemWidth',
      indicatorPosition: 'bottom',
      animated: true,
      autoScroll: true,
      activeIndex: 0,
      custom: false,
      indicatorWidth: null,
      useTitleStyle: false,
      useBadge: false,
      indicatorLineColor: null,
      indicatorPositionPadding: null,
    });
  }

  onSegmentedBarChange(index) {
    if (index != this.state.activeIndex) {
      this.setState({activeIndex: index});
      console.log(`[SegmentedBar] onChange callback - Current item: ${index + 1}`);
      Toast.message(`Item ${index + 1}`, {position: 'top', duration: 1000});
      if (this.carouselRef.current) {
        this.carouselRef.current.scrollToPage(index, false);
      }
    }
  }

  onCarouselChange(index) {
    if (index != this.state.activeIndex) {
      this.setState({activeIndex: index});
      console.log(`[SegmentedBar] Carousel triggered change - Item: ${index + 1}`);
      Toast.message(`Item ${index + 1}`, {position: 'top', duration: 1000});
    }
  }

  renderCustomItems() {
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
    let {activeIndex} = this.state;
    return this.barCustomItems.map((item, index) => {
      let isActive = index == activeIndex;
      let tintColor = isActive ? Theme.primaryColor : '#989898';
      return (
        <View key={index} style={{padding: 8, alignItems: 'center'}}>
          <Image
            style={{width: 20, height: 20, tintColor}}
            source={isActive ? activeIcons[index] : icons[index]}
            />
          <Label style={{color: tintColor, paddingTop: 4}} text={item} />
        </View>
      );
    });
  }

  renderPage() {
    let {justifyItem, indicatorType, indicatorPosition, animated, autoScroll, custom, activeIndex, indicatorWidth, useTitleStyle, useBadge, indicatorLineColor, indicatorPositionPadding} = this.state;
    let barItems = custom ? this.barCustomItems : (justifyItem == 'scrollable' ? this.barScrollItems : this.barItems);
    return (
      <ScrollView style={{flex: 1}} stickyHeaderIndices={[1]}>
        <View style={{height: 20}} />
        <SegmentedBar
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          indicatorLineColor={indicatorLineColor || (custom ? '#5cb85c' : undefined)}
          indicatorLineWidth={custom ? 1 : undefined}
          indicatorWidth={indicatorWidth}
          indicatorPositionPadding={indicatorPositionPadding !== null ? indicatorPositionPadding : (custom ? 3 : undefined)}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}
        >
          {custom ? this.renderCustomItems() : barItems.map((item, index) => (
            <SegmentedBar.Item 
              key={'item' + index} 
              title={item}
              titleStyle={useTitleStyle ? {fontSize: 16, color: '#999'} : undefined}
              activeTitleStyle={useTitleStyle ? {fontSize: 18, color: '#ff5722', fontWeight: 'bold'} : undefined}
              badge={useBadge && index === 1 ? '3' : (useBadge && index === 2 ? 'new' : undefined)}
            />
          ))}
        </SegmentedBar>
        <Carousel
          style={{backgroundColor: Theme.defaultColor, height: 238, borderTopWidth: 1, borderTopColor: Theme.pageColor}}
          carousel={false}
          startIndex={activeIndex}
          cycle={false}
          ref={this.carouselRef}
          onChange={index => this.onCarouselChange(index)}
        >
          {barItems.map((item, index) => (
            <View key={'view' + index} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text={item} />
            </View>
          ))}
        </Carousel>
        <View style={{height: 20}} />
        <SelectRow
          title='Justify item'
          value={justifyItem}
          items={this.justifyItemItems}
          onSelected={(item, index) => this.setState({justifyItem: item})}
          topSeparator='full'
          />
        <SelectRow
          title='Indicator type'
          value={indicatorType}
          items={this.indicatorTypeItems}
          onSelected={(item, index) => this.setState({indicatorType: item})}
          />
        <SelectRow
          title='Indicator position'
          value={indicatorPosition}
          items={this.indicatorPositionItems}
          onSelected={(item, index) => this.setState({indicatorPosition: item})}
          />
        <ListRow
          title='indicatorWidth (customWidth 时)'
          detail={indicatorWidth ? indicatorWidth.toString() : '默认'}
          onPress={() => this.setState({
            indicatorWidth: indicatorWidth ? null : 40,
            indicatorType: 'customWidth'
          })}
          />
        <ListRow
          title='indicatorLineColor'
          detail={indicatorLineColor || 'Theme default'}
          onPress={() => {
            const colors = [null, '#ff5722', '#4caf50', '#2196f3', '#9c27b0'];
            const currentIndex = colors.indexOf(indicatorLineColor);
            const nextIndex = (currentIndex + 1) % colors.length;
            this.setState({indicatorLineColor: colors[nextIndex]});
          }}
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
          title='Animated'
          detail={<Switch value={animated} onValueChange={value => this.setState({animated: value})} />}
          />
        <ListRow
          title='Auto scroll (scrollable only)'
          detail={<Switch value={autoScroll} onValueChange={value => this.setState({autoScroll: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <ListRow
          title='titleStyle & activeTitleStyle'
          detail={<Switch value={useTitleStyle} onValueChange={value => this.setState({useTitleStyle: value})} />}
          topSeparator='full'
          />
        <ListRow
          title='badge (Item 2, 3 显示徽章)'
          detail={<Switch value={useBadge} onValueChange={value => this.setState({useBadge: value})} />}
          />
        <ListRow
          title='Custom'
          detail={<Switch value={custom} onValueChange={value => this.setState({custom: value})} />}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
