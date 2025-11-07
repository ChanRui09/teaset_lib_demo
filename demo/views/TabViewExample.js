// TabViewExample.js

'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Switch, Alert } from 'react-native';

import { Theme, TeaNavigator, NavigationPage, BasePage, ListRow, TabView, Label, Toast } from 'teaset';

import SelectRow from './SelectRow';

class DemoTabView extends TabView {
  componentDidUpdate(prevProps) {
    let { activeIndex, type } = this.props;
    if (activeIndex !== prevProps.activeIndex && (typeof activeIndex === 'number')) {
      if (this.state.activeIndex !== activeIndex) {
        this.setState({ activeIndex });
      }
      if (type === 'carousel') {
        const carousel = this.carouselRef.current;
        if (carousel && typeof carousel.scrollToPage === 'function') {
          carousel.scrollToPage(activeIndex);
        }
      }
    }
  }

  renderBar() {
    let { barStyle, onChange, type: tabType } = this.props;
    let { bottom: bottomInset } = Theme.screenInset;

    barStyle = [{
      backgroundColor: Theme.tvBarColor,
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      height: Theme.tvBarHeight + bottomInset,
      paddingTop: Theme.tvBarPaddingTop,
      paddingBottom: Theme.tvBarPaddingBottom + bottomInset,
      borderTopWidth: Theme.tvBarSeparatorWidth,
      borderColor: Theme.tvBarSeparatorColor,
    }].concat(barStyle);
    barStyle = StyleSheet.flatten(barStyle);
    let { height, paddingTop, paddingBottom } = barStyle;
    let buttonContainerStyle = {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      paddingTop,
      paddingBottom,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    };
    let buttonStyle = {
      minHeight: height - paddingTop - paddingBottom,
    };

    let sheetCount = 0;
    return (
      <View style={{ height: barStyle.height }} pointerEvents='box-none'>
        <View style={barStyle} />
        <View style={buttonContainerStyle} pointerEvents='box-none'>
          {this.sheets.map((item, index) => {
            let {
              type,
              title,
              icon,
              activeIcon,
              iconContainerStyle,
              badge,
              onPress,
              titleStyle,
              activeTitleStyle,
            } = item.props;
            let sheetIndex = sheetCount;
            if (type === 'sheet') sheetCount += 1;
            return (
              <this.constructor.Button
                key={index}
                style={buttonStyle}
                title={title}
                titleStyle={titleStyle}
                activeTitleStyle={activeTitleStyle}
                icon={icon}
                activeIcon={activeIcon}
                badge={badge}
                active={type === 'sheet' ? sheetIndex === this.activeIndex : false}
                iconContainerStyle={iconContainerStyle}
                onPress={e => {
                  if (type === 'sheet') {
                    this.setState({ activeIndex: sheetIndex }, () => {
                      const carousel = this.carouselRef.current;
                      if (tabType === 'carousel') {
                        carousel && carousel.scrollToPage(sheetIndex);
                      } else {
                        onChange && onChange(sheetIndex);
                      }
                    });
                  }
                  onPress && onPress(e);
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default class TabViewExample extends BasePage {

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };

  constructor(props) {
    super(props);
    this.tabTypeItems = ['projector', 'carousel'];
    this.barStyleItems = [
      { key: 'theme', label: 'Theme 默认样式' },
      { key: 'solid', label: '深色实底样式' },
    ];
    this.sheetTitleItems = [
      { key: 'string', label: '字符串标题' },
      { key: 'number', label: '数字标题' },
      { key: 'element', label: '自定义组件标题' },
    ];
    this.sheetIconItems = [
      { key: 'image', label: '图片图标' },
      { key: 'element', label: '自定义组件图标' },
      { key: 'none', label: '无图标' },
    ];
    this.sheetBadgeItems = [
      { key: 'none', label: '无徽章' },
      { key: 'number', label: '数字徽章' },
      { key: 'string', label: '字符串徽章' },
      { key: 'element', label: '自定义组件徽章' },
    ];
    this.buttonTitleItems = [
      { key: 'text', label: '文字标题' },
      { key: 'element', label: '元素标题' },
    ];
    this.buttonIconItems = [
      { key: 'element', label: '自定义圆形图标' },
      { key: 'image', label: '图片图标' },
      { key: 'none', label: '无图标' },
    ];
    this.buttonBadgeItems = [
      { key: 'none', label: '无徽章' },
      { key: 'string', label: '文字徽章' },
      { key: 'number', label: '数字徽章' },
      { key: 'element', label: '自定义徽章' },
    ];
    this.activeIndexItems = [
      { key: '0', label: '0', value: 0 },
      { key: '1', label: '1', value: 1 },
      { key: '2', label: '2', value: 2 },
    ];
    Object.assign(this.state, {
      type: 'projector',
      activeIndex: 0,
      useTitleStyle: false,
      useActiveTitleStyle: false,
      barStyleKey: this.barStyleItems[0].key,
      homeTitleKey: this.sheetTitleItems[0].key,
      homeIconKey: this.sheetIconItems[0].key,
      homeActiveIconKey: this.sheetIconItems[0].key,
      homeBadgeKey: this.sheetBadgeItems[0].key,
      storeBadgeKey: this.sheetBadgeItems[1].key,
      meBadgeKey: this.sheetBadgeItems[2].key,
      buttonTitleKey: this.buttonTitleItems[0].key,
      buttonIconKey: this.buttonIconItems[0].key,
      buttonBadgeKey: this.buttonBadgeItems[1].key,
      useButtonTitleStyle: true,
    });
  }

  buildButtonIcon() {
    return (
      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          borderWidth: 2,
          borderColor: '#ff7043',
          backgroundColor: '#fff8e1',
          shadowColor: '#ccc',
          shadowOffset: { height: -1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ width: 44, height: 44, borderRadius: 22 }}
          source={require('../images/faircup.jpg')}
        />
      </View>
    );
  }

  getButtonTitleByKey(key) {
    switch (key) {
      case 'element':
        return (
          <Label
            style={{ fontSize: 12, color: '#ff7043', fontWeight: 'bold' }}
            text='按钮元素标题'
          />
        );
      case 'text':
      default:
        return '按钮样式';
    }
  }

  getButtonIconByKey(key) {
    switch (key) {
      case 'element':
        return this.buildButtonIcon();
      case 'image':
        return require('../icons/me.png');
      case 'none':
      default:
        return null;
    }
  }

  getButtonBadgeByKey(key) {
    switch (key) {
      case 'string':
        return (
          <Label
            style={{color: '#ff7043', fontSize: 10, fontWeight: 'bold'}}
            text='HOT'
          />
        );
      case 'number':
        return 9;
      case 'element':
        return (
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: '#ff7043',
            }}
          >
            <Label style={{ color: '#fff', fontSize: 10 }} text='NEW' />
          </View>
        );
      case 'none':
      default:
        return null;
    }
  }

  renderButtonSheet() {
    let {
      buttonTitleKey,
      buttonIconKey,
      buttonBadgeKey,
      useButtonTitleStyle,
    } = this.state;
    let title = this.getButtonTitleByKey(buttonTitleKey);
    let icon = this.getButtonIconByKey(buttonIconKey);
    let badge = this.getButtonBadgeByKey(buttonBadgeKey);
    let titleStyle = useButtonTitleStyle ? { fontSize: 12, color: '#455a64' } : undefined;
    let iconContainerStyle = (buttonIconKey === 'element') ? { justifyContent: 'flex-end' } : undefined;
    return (
      <TabView.Sheet
        type='button'
        title={title}
        icon={icon}
        badge={badge}
        onPress={() => this.handleButtonPress()}
        titleStyle={titleStyle}
        iconContainerStyle={iconContainerStyle}
      />
    );
  }

  getSheetTitleByKey(key) {
    switch (key) {
      case 'number':
        return 2025;
      case 'element':
        return (
          <Label
            style={{ fontSize: 12, color: '#ff9800', fontWeight: 'bold' }}
            text='Home 元素标题'
          />
        );
      case 'string':
      default:
        return 'Home';
    }
  }

  getSheetIconByKey(key, isActive) {
    switch (key) {
      case 'element':
        return (
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: isActive ? '#ff7043' : '#4db6ac',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Label style={{ color: '#fff', fontSize: 12 }} text={isActive ? '活' : '静'} />
          </View>
        );
      case 'none':
        return null;
      case 'image':
      default:
        return isActive ? require('../icons/home_active.png') : require('../icons/home.png');
    }
  }

  getSheetBadgeByKey(key) {
    switch (key) {
      case 'number':
        return 3;
      case 'string':
        return (
          <Label
            style={{color: '#ff7043', fontSize: 10, fontWeight: 'bold'}}
            text='Hot'
          />
        );
      case 'element':
        return (
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: '#673ab7',
            }}
          >
            <Label style={{ color: '#fff', fontSize: 10 }} text='VIP' />
          </View>
        );
      case 'none':
      default:
        return null;
    }
  }

  getBarStyleByKey(key) {
    switch (key) {
      case 'solid':
        return {
          backgroundColor: '#263238',
          borderTopWidth: 0,
        };
      case 'theme':
      default:
        return null;
    }
  }

  handleSheetPress(label) {
    return () => {
      const message = `点击标签：${label}`;
      console.log(`[TabViewExample] ${message}`);
      Toast.message(message);
    };
  }

  handleButtonPress() {
    const label = 'TabView.Button';
    const message = `点击标签：${label}`;
    console.log(`[TabViewExample] ${message}`);
    console.log('[TabViewExample] TabView.Button 为动作按钮，点击后不会保持激活状态');
    Toast.message(`${message}（按钮不会保持激活状态）`);
  }

  renderPage() {
    let {
      type,
      activeIndex,
      useTitleStyle,
      useActiveTitleStyle,
      barStyleKey,
      homeTitleKey,
      homeIconKey,
      homeActiveIconKey,
      homeBadgeKey,
      storeBadgeKey,
      meBadgeKey,
      buttonTitleKey,
      buttonIconKey,
      buttonBadgeKey,
      useButtonTitleStyle,
    } = this.state;
    let barStyle = this.getBarStyleByKey(barStyleKey);
    let homeTitle = this.getSheetTitleByKey(homeTitleKey);
    let homeIcon = this.getSheetIconByKey(homeIconKey, false);
    let homeActiveIcon = this.getSheetIconByKey(homeActiveIconKey, true);
    let homeBadge = this.getSheetBadgeByKey(homeBadgeKey);
    let storeBadge = this.getSheetBadgeByKey(storeBadgeKey);
    let meBadge = this.getSheetBadgeByKey(meBadgeKey);
    return (
      <DemoTabView
        style={{ flex: 1 }}
        type={type}
        barStyle={barStyle}
        activeIndex={activeIndex}
        onChange={index => {
          console.log(`[TabViewExample] 激活标签索引：${index}`);
          this.setState({ activeIndex: index }, () => Alert.alert('TabView', `切换到标签页：${index}`));
        }}
      >
        <TabView.Sheet
          type='sheet'
          title={homeTitle}
          icon={homeIcon}
          activeIcon={homeActiveIcon}
          badge={homeBadge}
          onPress={this.handleSheetPress('Home')}
          titleStyle={useTitleStyle ? { fontSize: 10, color: '#999' } : undefined}
          activeTitleStyle={useActiveTitleStyle ? { fontSize: 12, color: '#ff5722', fontWeight: 'bold' } : undefined}
        >
          <HomePage
            type={type}
            useTitleStyle={useTitleStyle}
            useActiveTitleStyle={useActiveTitleStyle}
            activeIndex={activeIndex}
            tabTypeItems={this.tabTypeItems}
            barStyleItems={this.barStyleItems}
            sheetTitleItems={this.sheetTitleItems}
            sheetIconItems={this.sheetIconItems}
            sheetBadgeItems={this.sheetBadgeItems}
            activeIndexItems={this.activeIndexItems}
            barStyleKey={barStyleKey}
            homeTitleKey={homeTitleKey}
            homeIconKey={homeIconKey}
            homeActiveIconKey={homeActiveIconKey}
            homeBadgeKey={homeBadgeKey}
            storeBadgeKey={storeBadgeKey}
            meBadgeKey={meBadgeKey}
            buttonTitleItems={this.buttonTitleItems}
            buttonIconItems={this.buttonIconItems}
            buttonBadgeItems={this.buttonBadgeItems}
            buttonTitleKey={buttonTitleKey}
            buttonIconKey={buttonIconKey}
            buttonBadgeKey={buttonBadgeKey}
            useButtonTitleStyle={useButtonTitleStyle}
            onChangeType={value => this.setState({ type: value })}
            onChangeTitleStyle={value => this.setState({ useTitleStyle: value })}
            onChangeActiveTitleStyle={value => this.setState({ useActiveTitleStyle: value })}
            onChangeActiveIndex={value => {
              console.log(`[TabViewExample] 手动设置活动标签：${value}`);
              this.setState({ activeIndex: value }, () => Toast.message(`手动设置标签：${value}`));
            }}
            onChangeBarStyleKey={value => this.setState({ barStyleKey: value })}
            onChangeHomeTitleKey={value => this.setState({ homeTitleKey: value })}
            onChangeHomeIconKey={value => this.setState({ homeIconKey: value })}
            onChangeHomeActiveIconKey={value => this.setState({ homeActiveIconKey: value })}
            onChangeHomeBadgeKey={value => this.setState({ homeBadgeKey: value })}
            onChangeStoreBadgeKey={value => this.setState({ storeBadgeKey: value })}
            onChangeMeBadgeKey={value => this.setState({ meBadgeKey: value })}
            onChangeButtonTitleKey={value => this.setState({ buttonTitleKey: value })}
            onChangeButtonIconKey={value => this.setState({ buttonIconKey: value })}
            onChangeButtonBadgeKey={value => this.setState({ buttonBadgeKey: value })}
            onChangeButtonTitleStyle={value => this.setState({ useButtonTitleStyle: value })}
          />
        </TabView.Sheet>
        {this.renderButtonSheet()}
        <TabView.Sheet
          type='sheet'
          title='Store'
          icon={null}
          activeIcon={null}
          badge={storeBadge}
          onPress={this.handleSheetPress('Store')}
          titleStyle={useTitleStyle ? { fontSize: 10, color: '#999' } : undefined}
          activeTitleStyle={useActiveTitleStyle ? { fontSize: 12, color: '#ff5722', fontWeight: 'bold' } : undefined}
        >
          <StorePage />
        </TabView.Sheet>
        <TabView.Sheet
          type='sheet'
          title='Me'
          icon={require('../icons/me.png')}
          activeIcon={require('../icons/me_active.png')}
          badge={meBadge}
          onPress={this.handleSheetPress('Me')}
          titleStyle={useTitleStyle ? { fontSize: 10, color: '#999' } : undefined}
          activeTitleStyle={useActiveTitleStyle ? { fontSize: 12, color: '#ff5722', fontWeight: 'bold' } : undefined}
        >
          <MePage />
        </TabView.Sheet>
      </DemoTabView>
    );
  }

}

class HomePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Home',
    showBackButton: true,
  };

  renderPage() {
    let {
      type,
      useTitleStyle,
      useActiveTitleStyle,
      activeIndex,
      homeTitleKey,
      homeIconKey,
      homeActiveIconKey,
      homeBadgeKey,
      storeBadgeKey,
      meBadgeKey,
      barStyleKey,
      barStyleItems,
      tabTypeItems,
      sheetTitleItems,
      sheetIconItems,
      sheetBadgeItems,
      activeIndexItems,
      onChangeType,
      onChangeTitleStyle,
      onChangeActiveTitleStyle,
      onChangeActiveIndex,
      onChangeBarStyleKey,
      onChangeHomeTitleKey,
      onChangeHomeIconKey,
      onChangeHomeActiveIconKey,
      onChangeHomeBadgeKey,
      onChangeStoreBadgeKey,
      onChangeMeBadgeKey,
      buttonTitleItems,
      buttonIconItems,
      buttonBadgeItems,
      buttonTitleKey,
      buttonIconKey,
      buttonBadgeKey,
      useButtonTitleStyle,
      onChangeButtonTitleKey,
      onChangeButtonIconKey,
      onChangeButtonBadgeKey,
      onChangeButtonTitleStyle,
    } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <SelectRow
          title='Type'
          value={type}
          items={tabTypeItems}
          onSelected={(item, index) => onChangeType && onChangeType(item)}
          topSeparator='full'
        />
        <SelectRow
          title='barStyle'
          value={barStyleKey}
          items={barStyleItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeBarStyleKey && onChangeBarStyleKey(item.key)}
          bottomSeparator='full'
        />
        <View style={{ height: 20 }} />
        <Label style={{ marginLeft: 15, marginTop: 12, marginBottom: 6, color: '#999' }} text='TabView.Button 属性' />
        <SelectRow
          title='title'
          value={buttonTitleKey}
          items={buttonTitleItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeButtonTitleKey && onChangeButtonTitleKey(item.key)}
          topSeparator='full'
        />
        <SelectRow
          title='icon'
          value={buttonIconKey}
          items={buttonIconItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeButtonIconKey && onChangeButtonIconKey(item.key)}
        />
        <SelectRow
          title='badge'
          value={buttonBadgeKey}
          items={buttonBadgeItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeButtonBadgeKey && onChangeButtonBadgeKey(item.key)}
          bottomSeparator='full'
        />
        <ListRow title='titleStyle' detail={<Switch value={useButtonTitleStyle} onValueChange={value => onChangeButtonTitleStyle(value)} />} bottomSeparator='full' />
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Label
            style={{ color: '#999', fontSize: 12, lineHeight: 18 }}
            text='TabView.Button 仅作为即时动作按钮，不会参与标签激活状态'
          />
          <Label
            style={{ color: '#999', fontSize: 12, lineHeight: 18 }}
            text='因而 activeIcon 和 activeTitleStyle 在此类型上不会生效。'
          />
        </View>
        <Label style={{ marginLeft: 15, marginTop: 16, marginBottom: 6, color: '#999' }} text='TabView.Sheet 属性' />
        <ListRow title='titleStyle' detail={<Switch value={useTitleStyle} onValueChange={value => onChangeTitleStyle(value)} />} topSeparator='full' />
        <ListRow title='activeTitleStyle' detail={<Switch value={useActiveTitleStyle} onValueChange={value => onChangeActiveTitleStyle(value)} />} bottomSeparator='full' />
        <SelectRow
          title='activeIndex'
          value={activeIndex}
          items={activeIndexItems}
          getItemValue={item => item.value}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeActiveIndex && onChangeActiveIndex(item.value)}
          topSeparator='full'
        />
        <SelectRow
          title='Sheet title'
          value={homeTitleKey}
          items={sheetTitleItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeHomeTitleKey && onChangeHomeTitleKey(item.key)}
        />
        <SelectRow
          title='Sheet icon'
          value={homeIconKey}
          items={sheetIconItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeHomeIconKey && onChangeHomeIconKey(item.key)}
        />
        <SelectRow
          title='Sheet activeIcon'
          value={homeActiveIconKey}
          items={sheetIconItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeHomeActiveIconKey && onChangeHomeActiveIconKey(item.key)}
        />
        <SelectRow
          title='Sheet badge'
          value={homeBadgeKey}
          items={sheetBadgeItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeHomeBadgeKey && onChangeHomeBadgeKey(item.key)}
        />
        <SelectRow
          title='Store badge'
          value={storeBadgeKey}
          items={sheetBadgeItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeStoreBadgeKey && onChangeStoreBadgeKey(item.key)}
        />
        <SelectRow
          title='Me badge'
          value={meBadgeKey}
          items={sheetBadgeItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => onChangeMeBadgeKey && onChangeMeBadgeKey(item.key)}
          bottomSeparator='full'
        />
      </ScrollView>
    );
  }

}

class MePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Me',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Label type='detail' size='xl' text={this.props.title} />
      </View>
    );
  }

}

class StorePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Store',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Label type='detail' size='xl' text='Store' />
      </View>
    );
  }

}
