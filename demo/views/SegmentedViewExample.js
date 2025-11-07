// SegmentedViewExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, SegmentedView, Label, Toast} from 'teaset';

import SelectRow from './SelectRow';

const styles = StyleSheet.create({
  previewWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  segmentedView: {
    height: 320,
    minHeight: 320,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.pageColor,
  },
  activeSummary: {
    marginHorizontal: 15,
    marginTop: 12,
    marginBottom: 16,
    paddingVertical: 10,
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
    fontSize: 13,
    fontWeight: '600',
  },
  customTitleSecondary: {
    marginTop: 2,
    fontSize: 10,
    color: '#9e9e9e',
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
    marginHorizontal: 15,
    marginBottom: 16,
  },
});

export default class SegmentedViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SegmentedView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.typeItems = ['projector', 'carousel'];
    this.barPositionItems = ['top', 'bottom'];
    this.justifyItemItems = ['fixed', 'scrollable'];
    this.indicatorTypeItems = ['none', 'boxWidth', 'itemWidth'];
    this.indicatorPositionItems = ['top', 'bottom'];
    this.indicatorLineColors = [null, '#ff5722', '#4caf50', '#2196f3', '#9c27b0'];
    this.indicatorLineWidthOptions = [null, 1, 2, 4];
    this.baseItems = ['One', 'Two', 'Three'];
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
    this.datasetOptions = [
      {key: 'short', label: '3 items (One / Two / Three)'},
      {key: 'long', label: '9 items (Tea list)'},
    ];
    this.barStyleOptions = [
      {key: 'default', label: 'Default', style: null},
      {key: 'muted', label: 'Muted background', style: {backgroundColor: '#f7f7f7', paddingVertical: 6}},
      {key: 'underline', label: 'Underline', style: {paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}},
    ];
    this.titleTypeItems = ['String', 'Number', 'Element(View)'];
    this.titleStyleOptions = [
      {key: 'Default', label: 'Default (Theme)', style: undefined},
      {key: 'Muted', label: 'Muted gray 14', style: {fontSize: 14, color: '#666'}},
      {key: 'Accent', label: 'Accent bold 16', style: {fontSize: 16, color: '#ff7043', fontWeight: '600'}},
    ];
    this.activeTitleStyleOptions = [
      {key: 'Default', label: 'Default (Theme)', style: undefined},
      {key: 'Highlight', label: 'Highlight orange', style: {fontSize: 16, color: '#ff5722', fontWeight: 'bold'}},
      {key: 'Inverse', label: 'Inverse pill', style: {fontSize: 15, color: '#fff', fontWeight: '600', backgroundColor: '#3949ab', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12}},
    ];
    this.badgeOptions = [
      {key: 'none', label: 'None', value: null},
      {key: 'number', label: 'Number: 5', value: '5'},
      {key: 'text', label: 'Text: NEW', value: 'NEW'},
      {key: 'element', label: 'Element(View): VIP pill', value: 'element'},
    ];
    this.iconSources = [
      require('../icons/home.png'),
      require('../icons/store.png'),
      require('../icons/me.png'),
    ];
    this.activeIconSources = [
      require('../icons/home_active.png'),
      require('../icons/store_active.png'),
      require('../icons/me_active.png'),
    ];
    Object.assign(this.state, {
      type: 'projector',
      barPosition: 'top',
      barStyleKey: this.barStyleOptions[0].key,
      justifyItem: 'fixed',
      indicatorType: 'itemWidth',
      indicatorPosition: 'bottom',
      indicatorLineColor: null,
      indicatorLineWidth: null,
      indicatorPositionPadding: null,
      animated: true,
      autoScroll: true,
      datasetKey: this.datasetOptions[0].key,
      type: 'projector',
      activeIndex: 0,
      titleType: this.titleTypeItems[0],
      titleStyleKey: this.titleStyleOptions[0].key,
      activeTitleStyleKey: this.activeTitleStyleOptions[0].key,
      badgeKey: this.badgeOptions[0].key,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.datasetKey !== this.state.datasetKey) {
      const items = this.getDatasetItems();
      if (items.length > 0 && this.state.activeIndex >= items.length) {
        this.setActiveIndex(items.length - 1, {source: 'Dataset adjustment', suppressToast: true});
      }
    }
  }

  getDatasetItems(state = this.state) {
    return state.datasetKey === 'long' ? this.manyItems : this.baseItems;
  }

  getBarStyleOption() {
    return this.barStyleOptions.find(item => item.key === this.state.barStyleKey) || this.barStyleOptions[0];
  }

  getTitleStyleOption() {
    return this.titleStyleOptions.find(item => item.key === this.state.titleStyleKey) || this.titleStyleOptions[0];
  }

  getActiveTitleStyleOption() {
    return this.activeTitleStyleOptions.find(item => item.key === this.state.activeTitleStyleKey) || this.activeTitleStyleOptions[0];
  }

  getBadgeOption() {
    return this.badgeOptions.find(item => item.key === this.state.badgeKey) || this.badgeOptions[0];
  }

  shouldApplyTitleStyles() {
    return this.state.titleType !== 'Element(View)';
  }

  resolveTitle(baseTitle, index) {
    switch (this.state.titleType) {
      case 'Number':
        return index + 1;
      case 'Element(View)':
        return this.renderCustomTitle(baseTitle, index);
      default:
        return baseTitle;
    }
  }

  renderCustomTitle(baseTitle, index) {
    const iconIndex = index % this.iconSources.length;
    const isActive = index === this.state.activeIndex;
    const tintColor = isActive ? Theme.primaryColor : '#989898';
    const iconSource = isActive ? this.activeIconSources[iconIndex] : this.iconSources[iconIndex];
    return (
      <View style={styles.customTitleContainer}>
        <Image style={{width: 20, height: 20, tintColor}} source={iconSource} />
        <Label style={[styles.customTitlePrimary, {color: tintColor}]} text={baseTitle} />
        <Label style={styles.customTitleSecondary} text={`#${index + 1}`} />
      </View>
    );
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

  describeSheet(items, index) {
    if (!items || !items.length || index < 0 || index >= items.length) return 'N/A';
    const baseTitle = items[index];
    switch (this.state.titleType) {
      case 'Number':
        return `Segment ${index + 1}`;
      case 'Element(View)':
        return `${baseTitle} (custom)`;
      default:
        return baseTitle;
    }
  }

  buildActiveIndexOptions(items) {
    return items.map((item, index) => ({
      value: index,
      label: `${index + 1}. ${this.describeSheet(items, index)}`,
    }));
  }

  setActiveIndex(index, {source = 'manual', suppressToast = false} = {}) {
    const items = this.getDatasetItems();
    if (!items.length) return;
    const nextIndex = Math.min(Math.max(index, 0), items.length - 1);
    const changed = nextIndex !== this.state.activeIndex;
    if (changed) {
      this.setState({activeIndex: nextIndex});
    }
    this.logActiveIndexChange(source, nextIndex, items, changed, suppressToast);
  }

  logActiveIndexChange(source, index, items, changed, suppressToast) {
    const label = this.describeSheet(items, index);
    const suffix = changed ? '' : ' (unchanged)';
    console.log(`[SegmentedView] ${source} -> activeIndex ${index} (${label})${suffix}`);
    if (changed && !suppressToast) {
      Toast.message(`Segment: ${label}`, {position: 'top', duration: 1000});
    }
  }

  handleActiveIndexSelection(index) {
    this.setActiveIndex(index, {source: 'Manual select'});
  }

  handleDatasetChange(option) {
    if (!option) return;
    const nextKey = option.key;
    const isLong = nextKey === 'long';
    const shouldForceScrollable = isLong && this.state.justifyItem === 'fixed';
    const shouldRestoreFixed = !isLong && this.state.datasetKey === 'long' && this.state.justifyItem === 'scrollable';
    this.setState({
      datasetKey: nextKey,
      justifyItem: shouldForceScrollable ? 'scrollable' : (shouldRestoreFixed ? 'fixed' : this.state.justifyItem),
    });
  }

  handleIndicatorLineColorCycle() {
    const palette = this.indicatorLineColors;
    const currentIndex = palette.indexOf(this.state.indicatorLineColor);
    const nextIndex = (currentIndex + 1) % palette.length;
    this.setState({indicatorLineColor: palette[nextIndex]});
  }

  handleIndicatorLineWidthCycle() {
    const options = this.indicatorLineWidthOptions;
    const currentIndex = options.indexOf(this.state.indicatorLineWidth);
    const nextIndex = (currentIndex + 1) % options.length;
    this.setState({indicatorLineWidth: options[nextIndex]});
  }

  handleIndicatorPositionPaddingCycle() {
    const paddings = [null, 0, 5, 10, 20];
    const currentIndex = paddings.indexOf(this.state.indicatorPositionPadding);
    const nextIndex = (currentIndex + 1) % paddings.length;
    this.setState({indicatorPositionPadding: paddings[nextIndex]});
  }

  onSegmentedViewChange(index) {
    this.setActiveIndex(index, {source: 'SegmentedView.onChange'});
  }

  renderPreview() {
    const items = this.getDatasetItems();
    const barStyleOption = this.getBarStyleOption();
    const applyTitleStyles = this.shouldApplyTitleStyles();
    const titleStyleOverride = applyTitleStyles ? (this.getTitleStyleOption()?.style) : undefined;
    const activeTitleStyleOverride = applyTitleStyles ? (this.getActiveTitleStyleOption()?.style) : undefined;
    const indicatorLineColor = this.state.indicatorLineColor === null ? undefined : this.state.indicatorLineColor;
    const indicatorLineWidth = this.state.indicatorLineWidth === null ? undefined : this.state.indicatorLineWidth;
    const indicatorPositionPadding = this.state.indicatorPositionPadding === null ? undefined : this.state.indicatorPositionPadding;
    return (
      <View style={styles.previewWrapper}>
        <SegmentedView
          style={styles.segmentedView}
          type={this.state.type}
          barPosition={this.state.barPosition}
          barStyle={barStyleOption ? barStyleOption.style : null}
          justifyItem={this.state.justifyItem}
          indicatorType={this.state.indicatorType}
          indicatorPosition={this.state.indicatorPosition}
          indicatorLineColor={indicatorLineColor}
          indicatorLineWidth={indicatorLineWidth}
          indicatorPositionPadding={indicatorPositionPadding}
          animated={this.state.animated}
          autoScroll={this.state.autoScroll}
          activeIndex={this.state.activeIndex}
          onChange={index => this.onSegmentedViewChange(index)}
        >
          {items.map((item, index) => (
            <SegmentedView.Sheet
              key={'sheet' + index}
              title={this.resolveTitle(item, index)}
              titleStyle={titleStyleOverride}
              activeTitleStyle={activeTitleStyleOverride}
              badge={this.resolveBadge(index)}
            >
              <View style={styles.sheetContent}>
                <Label type='detail' size='xl' text={this.describeSheet(items, index)} />
              </View>
            </SegmentedView.Sheet>
          ))}
        </SegmentedView>
        <View style={styles.activeSummary}>
          <Label style={styles.activeSummaryText} text={`activeIndex: ${this.state.activeIndex} (第 ${this.state.activeIndex + 1} 页)`} />
          <Label style={[styles.activeSummaryText, {marginTop: 4}]} text={`当前标题: ${this.describeSheet(items, this.state.activeIndex)}`} />
          <Label style={[styles.activeSummaryText, {marginTop: 4}]} text='提示: 当 title 为元素时, titleStyle / activeTitleStyle 将被忽略。' />
        </View>
      </View>
    );
  }

  renderControls() {
    const items = this.getDatasetItems();
    const activeIndexOptions = this.buildActiveIndexOptions(items);
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: Theme.screenInset.bottom + 16}}>
        <SelectRow
          title='activeIndex (controlled)'
          value={this.state.activeIndex}
          items={activeIndexOptions}
          getItemValue={item => item.value}
          getItemText={item => item.label}
          onSelected={item => this.handleActiveIndexSelection(item.value)}
          topSeparator='full'
          />
        <SelectRow
          title='数据源'
          value={this.state.datasetKey}
          items={this.datasetOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={item => this.handleDatasetChange(item)}
          />
        <SelectRow
          title='Type'
          value={this.state.type}
          items={this.typeItems}
          onSelected={(item) => this.setState({type: item})}
          />
        <SelectRow
          title='barPosition (工具条位置)'
          value={this.state.barPosition}
          items={this.barPositionItems}
          onSelected={(item) => this.setState({barPosition: item})}
          />
        <SelectRow
          title='barStyle (预设)'
          value={this.state.barStyleKey}
          items={this.barStyleOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item) => this.setState({barStyleKey: item.key})}
          />
        <SelectRow
          title='justifyItem (排列模式)'
          value={this.state.justifyItem}
          items={this.justifyItemItems}
          onSelected={(item) => this.setState({justifyItem: item})}
          />
        <SelectRow
          title='indicatorType (指示器类型)'
          value={this.state.indicatorType}
          items={this.indicatorTypeItems}
          onSelected={(item) => this.setState({indicatorType: item})}
          />
        <SelectRow
          title='indicatorPosition (指示器位置)'
          value={this.state.indicatorPosition}
          items={this.indicatorPositionItems}
          onSelected={(item) => this.setState({indicatorPosition: item})}
          />
        <ListRow
          title='indicatorLineColor'
          detail={this.state.indicatorLineColor || 'Theme default'}
          onPress={() => this.handleIndicatorLineColorCycle()}
          />
        <ListRow
          title='indicatorLineWidth'
          detail={this.state.indicatorLineWidth !== null ? `${this.state.indicatorLineWidth}px` : 'Theme default'}
          onPress={() => this.handleIndicatorLineWidthCycle()}
          />
        <ListRow
          title='indicatorPositionPadding'
          detail={this.state.indicatorPositionPadding !== null ? this.state.indicatorPositionPadding.toString() : 'Theme default'}
          onPress={() => this.handleIndicatorPositionPaddingCycle()}
          />
        <ListRow
          title='animated (动画效果)'
          detail={<Switch value={this.state.animated} onValueChange={value => this.setState({animated: value})} />}
          />
        <ListRow
          title='autoScroll (自动滚动)'
          detail={<Switch value={this.state.autoScroll} onValueChange={value => this.setState({autoScroll: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='SegmentedView.Sheet props' />
        <SelectRow
          title='title'
          value={this.state.titleType}
          items={this.titleTypeItems}
          onSelected={(item) => this.setState({titleType: item})}
          topSeparator='full'
          />
        <SelectRow
          title='titleStyle'
          value={this.state.titleStyleKey}
          items={this.titleStyleOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item) => this.setState({titleStyleKey: item.key})}
          />
        <SelectRow
          title='activeTitleStyle'
          value={this.state.activeTitleStyleKey}
          items={this.activeTitleStyleOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item) => this.setState({activeTitleStyleKey: item.key})}
          />
        <SelectRow
          title='badge (展示在第 2 项)'
          value={this.state.badgeKey}
          items={this.badgeOptions}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item) => this.setState({badgeKey: item.key})}
          bottomSeparator='full'
          />
        <Label style={styles.helperNote} text='提示: badge 示例固定挂载在第 2 项上' />
        <Label style={styles.helperNote} text='当 title 为元素时, 文本样式类属性不会生效。' />
      </ScrollView>
    );
  }

  renderPage() {
    return (
      <View style={{flex: 1}}>
        {this.renderPreview()}
        {this.renderControls()}
      </View>
    );
  }
}
