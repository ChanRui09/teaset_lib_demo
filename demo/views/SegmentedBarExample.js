// SegmentedBarExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, Label, SegmentedBar, Carousel, Toast} from 'teaset';
import SelectRow from './SelectRow';

const styles = StyleSheet.create({
  activeSummary: {
    marginHorizontal: 15,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeSummaryText: {
    color: '#666',
    fontSize: 12,
  },
  sectionLabel: {
    marginLeft: 15,
    marginBottom: 8,
    color: '#999',
  },
  customTitleContainer: {
    alignItems: 'center',
    pointerEvents: 'none',
  },
  customTitlePrimary: {
    color: Theme.primaryColor,
    fontSize: 14,
    fontWeight: '600',
  },
  customTitleSecondary: {
    marginTop: 2,
    color: '#999',
    fontSize: 11,
  },
  badgePill: {
    backgroundColor: '#3949ab',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgePillText: {
    color: '#fff',
    fontSize: 10,
  },
  helperNote: {
    color: '#999',
    fontSize: 11,
  },
});

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

    this.titleTypeItems = ['String', 'Number', 'Element(View)'];
    this.titleStyleOptions = [
      {key: 'Default', label: 'Default (Theme)', style: undefined},
      {key: 'Muted', label: 'Muted gray 16', style: {fontSize: 16, color: '#666'}},
      {key: 'Accent', label: 'Accent bold 18', style: {fontSize: 18, color: '#ff7043', fontWeight: '600'}},
    ];
    this.activeTitleStyleOptions = [
      {key: 'Default', label: 'Default (Theme)', style: undefined},
      {key: 'Highlight', label: 'Highlight orange', style: {fontSize: 18, color: '#ff5722', fontWeight: 'bold'}},
      {key: 'Inverse', label: 'Inverse pill', style: {fontSize: 16, color: '#fff', fontWeight: '600', backgroundColor: '#3949ab', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12}},
    ];
    this.badgeOptions = [
      {key: 'none', label: 'None', value: null},
      {key: 'number', label: 'Number: 3', value: '3'},
      {key: 'text', label: 'Text: NEW', value: 'NEW'},
      {key: 'element', label: 'Element(View): "VIP" pill', value: 'element'},
    ];

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
      indicatorLineColor: null,
      indicatorPositionPadding: null,
      titleType: 'String',
      titleStyleKey: this.titleStyleOptions[0].key,
      activeTitleStyleKey: this.activeTitleStyleOptions[0].key,
      badgeKey: this.badgeOptions[0].key,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevItems = this.getBarItemsFromState(prevState);
    const currentItems = this.getCurrentBarItems();
    const itemsChanged = prevItems.length !== currentItems.length || prevState.custom !== this.state.custom || prevState.justifyItem !== this.state.justifyItem;
    if (itemsChanged && currentItems.length > 0 && this.state.activeIndex >= currentItems.length) {
      const nextIndex = currentItems.length - 1;
      this.setActiveIndex(nextIndex, {source: 'Dataset adjustment', syncCarousel: true, suppressToast: true});
    }
  }

  getBarItemsFromState(state) {
    if (state.custom) return this.barCustomItems;
    return state.justifyItem === 'scrollable' ? this.barScrollItems : this.barItems;
  }

  getCurrentBarItems() {
    return this.getBarItemsFromState(this.state);
  }

  getOptionByKey(options, key) {
    if (!(options instanceof Array)) return null;
    return options.find(item => item.key === key) || options[0];
  }

  getTitleStyleOption() {
    return this.getOptionByKey(this.titleStyleOptions, this.state.titleStyleKey);
  }

  getActiveTitleStyleOption() {
    return this.getOptionByKey(this.activeTitleStyleOptions, this.state.activeTitleStyleKey);
  }

  getBadgeOption() {
    return this.getOptionByKey(this.badgeOptions, this.state.badgeKey);
  }

  shouldApplyTitleStyles() {
    return this.state.titleType !== 'Element';
  }

  resolveTitle(baseTitle, index) {
    switch (this.state.titleType) {
      case 'Number':
        return index + 1;
      case 'Element':
        return (
          <View style={styles.customTitleContainer}>
            <Label style={styles.customTitlePrimary} text={baseTitle} />
            <Label style={styles.customTitleSecondary} text={`#${index + 1}`} />
          </View>
        );
      default:
        return baseTitle;
    }
  }

  resolveBadge(index) {
    const option = this.getBadgeOption();
    if (!option || option.key === 'none' || index !== 1) return undefined;
    if (option.key === 'element') {
      return (
        <View style={styles.badgePill} pointerEvents='none'>
          <Label style={styles.badgePillText} text='VIP' />
        </View>
      );
    }
    return option.value;
  }

  describeBarItem(items, index) {
    if (!items || !items.length || index < 0 || index >= items.length) return 'N/A';
    const baseTitle = items[index];
    switch (this.state.titleType) {
      case 'Number':
        return `#${index + 1} • ${baseTitle}`;
      case 'Element':
        return `${baseTitle} (custom)`;
      default:
        return baseTitle;
    }
  }

  buildActiveIndexOptions(items) {
    return items.map((item, index) => ({
      value: index,
      label: `${index + 1}. ${this.describeBarItem(items, index)}`,
    }));
  }

  setActiveIndex(index, {source = 'manual', syncCarousel = true, animateCarousel = false, suppressToast = false} = {}) {
    const items = this.getCurrentBarItems();
    if (!items.length) return;
    const maxIndex = items.length - 1;
    const nextIndex = Math.min(Math.max(index, 0), maxIndex);
    const changed = nextIndex !== this.state.activeIndex;

    if (changed) {
      this.setState({activeIndex: nextIndex}, () => {
        if (syncCarousel && this.carouselRef.current) {
          this.carouselRef.current.scrollToPage(nextIndex, animateCarousel);
        }
      });
    } else if (syncCarousel && animateCarousel && this.carouselRef.current) {
      this.carouselRef.current.scrollToPage(nextIndex, animateCarousel);
    }

    this.logActiveIndexChange(source, nextIndex, items, changed, suppressToast);
  }

  logActiveIndexChange(source, index, items, changed, suppressToast) {
    const label = this.describeBarItem(items, index);
    const unchangedSuffix = changed ? '' : ' (unchanged)';
    console.log(`[SegmentedBar] ${source} -> activeIndex ${index} (${label})${unchangedSuffix}`);
    if (changed && !suppressToast) {
      Toast.message(`Active: ${label}`, {position: 'top', duration: 1000});
    }
  }

  handleActiveIndexSelection(index) {
    this.setActiveIndex(index, {source: 'Manual select', syncCarousel: true, animateCarousel: false});
  }

  onSegmentedBarChange(index) {
    this.setActiveIndex(index, {source: 'SegmentedBar.onChange', syncCarousel: true, animateCarousel: false});
  }

  onCarouselChange(index) {
    this.setActiveIndex(index, {source: 'Carousel.onChange', syncCarousel: false});
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
    let {justifyItem, indicatorType, indicatorPosition, animated, autoScroll, custom, activeIndex, indicatorWidth, indicatorLineColor, indicatorPositionPadding, titleType, titleStyleKey, activeTitleStyleKey, badgeKey} = this.state;
    const barItems = this.getCurrentBarItems();
    const applyTitleStyles = this.shouldApplyTitleStyles();
    const titleStyleOption = this.getTitleStyleOption();
    const activeTitleStyleOption = this.getActiveTitleStyleOption();
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
              title={this.resolveTitle(item, index)}
              titleStyle={applyTitleStyles ? (titleStyleOption ? titleStyleOption.style : undefined) : undefined}
              activeTitleStyle={applyTitleStyles ? (activeTitleStyleOption ? activeTitleStyleOption.style : undefined) : undefined}
              badge={this.resolveBadge(index)}
            />
          ))}
        </SegmentedBar>
        <View style={styles.activeSummary}>
          <Label style={styles.activeSummaryText} text={`activeIndex: ${activeIndex} (第 ${activeIndex + 1} 项)`} />
          <Label style={[styles.activeSummaryText, {marginTop: 4}]} text={`当前标题: ${this.describeBarItem(barItems, activeIndex)}`} />
          <Label style={[styles.activeSummaryText, {marginTop: 4}]} text='当前条目接收 active=true' />
        </View>
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
              <Label type='detail' size='xl' text={this.describeBarItem(barItems, index)} />
            </View>
          ))}
        </Carousel>
        <View style={{height: 20}} />
        <SelectRow
          title='activeIndex (controlled)'
          value={activeIndex}
          items={this.buildActiveIndexOptions(barItems)}
          getItemValue={item => item.value}
          getItemText={item => item.label}
          onSelected={item => this.handleActiveIndexSelection(item.value)}
          topSeparator='full'
          />
        <SelectRow
          title='Justify item'
          value={justifyItem}
          items={this.justifyItemItems}
          onSelected={(item, index) => this.setState({justifyItem: item})}
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
        <Label style={styles.sectionLabel} text='SegmentedBar.Item props' />
        <SelectRow
          title='title'
          value={titleType}
          items={this.titleTypeItems}
          onSelected={(item, index) => this.setState({titleType: item})}
          topSeparator='full'
          />
        <SelectRow
          title='titleStyle'
          value={titleStyleKey}
          items={this.titleStyleOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({titleStyleKey: item.key})}
          />
        <SelectRow
          title='activeTitleStyle'
          value={activeTitleStyleKey}
          items={this.activeTitleStyleOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({activeTitleStyleKey: item.key})}
          />
        <SelectRow
          title='badge (Item 2)' 
          value={badgeKey}
          items={this.badgeOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({badgeKey: item.key})}
          bottomSeparator='full'
          />
        <View style={{paddingHorizontal: 15, paddingVertical: 6}}>
          <Label style={styles.helperNote} text='说明: titleStyle / activeTitleStyle 仅在 title 为字符串或数字时生效；' />
        </View>
        <View style={{paddingHorizontal: 15, paddingVertical: 6}}>
          <Label style={styles.helperNote} text='徽章示例固定显示在第二个条目。' />
        </View>
        <View style={{height: 12}} />
        <ListRow
          title='Custom'
          detail={<Switch value={custom} onValueChange={value => this.setState({custom: value})} />}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
