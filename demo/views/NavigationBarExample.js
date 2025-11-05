// NavigationBarExample.js

'use strict';

import React, {Component} from 'react';
import {Platform, View, ScrollView, Switch, Image, StyleSheet} from 'react-native';

import {Theme, NavigationPage, ListRow, NavigationBar, Label} from 'teaset';
import SelectRow from './SelectRow';

const ICONS = {
  search: require('../icons/search.png'),
  edit: require('../icons/edit.png'),
  trash: require('../icons/trash.png'),
  config: require('../icons/config.png'),
  smile: require('../icons/smile.png'),
};

const styles = StyleSheet.create({
  sectionLabel: {
    marginLeft: 15,
    marginBottom: 8,
    color: '#999',
  },
});

export default class NavigationBarExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'NavigationBar',
    navigationBarInsets: false,
  };

  constructor(props) {
    super(props);

    this.typeItems = ['Auto', 'iOS', 'Android', 'Harmony'];
    this.titleItems = ['String', 'Custom'];
    this.titleStyleItems = ['Default', 'Emphasis'];
    this.leftViewItems = ['None', 'Back button', 'Link button', 'Icon button', 'Two icon button'];
    this.rightViewItems = ['None', 'Link button', 'Icon button', 'Two icon button'];
    this.bgColorItems = ['Default', 'Custom'];
    this.tintColorItems = ['Default', 'Custom', 'None'];
    this.statusBarStyleItems = ['Default', 'Light Content', 'Dark Content'];
    this.titleTextItems = [
      {key: 'Primary', label: 'String: "NavigationBar"', text: 'NavigationBar'},
      {key: 'Long', label: 'String: "NavigationBar Demo Title"', text: 'NavigationBar Demo Title'},
      {key: 'Numeric', label: 'Number: 2025', text: 2025},
  {key: 'Multiline', label: 'String: "NavigationBar multiline example"', text: 'NavigationBar example demo\nAdjust numberOfLines to clamp explicit line breaks and wrapping content.'},
    ];
    this.titleNumberOfLinesItems = [
      {key: '1', label: '1', lines: 1},
      {key: '2', label: '2', lines: 2},
      {key: '3', label: '3', lines: 3},
    ];
    this.buttonHitSlopItems = [
      {key: 'Default', label: 'Default (12 / 12 / 8 / 8)', type: 'default'},
      {key: '20', label: 'All sides 20', type: 'custom', hitSlop: {top: 20, bottom: 20, left: 20, right: 20}},
      {key: '40', label: 'All sides 40', type: 'custom', hitSlop: {top: 40, bottom: 40, left: 40, right: 40}},
      {key: '80', label: 'All sides 80', type: 'custom', hitSlop: {top: 80, bottom: 80, left: 80, right: 80}},
    ];
    this.linkButtonTitleItems = [
      {key: 'Link', label: 'Link', title: 'Link'},
      {key: 'Docs', label: 'Docs', title: 'Docs'},
      {key: 'Number', label: '520', title: 520},
    ];
    this.iconButtonIconItems = [
      {key: 'Search', label: 'Search icon', source: ICONS.search},
      {key: 'Edit', label: 'Edit icon', source: ICONS.edit},
      {key: 'Trash', label: 'Trash icon', source: ICONS.trash},
      {key: 'Config', label: 'Config icon', source: ICONS.config},
    ];
    this.backButtonTitleItems = [
      {key: 'Theme', label: `Theme default (${Theme.backButtonTitle})`, title: Theme.backButtonTitle},
      {key: 'Back', label: 'Back', title: 'Back'},
      {key: 'Localized', label: '返回', title: '返回'},
      {key: 'Numeric', label: '1314', title: 1314},
    ];
    this.backButtonIconItems = [
      {key: 'Default', label: 'Default', icon: undefined},
      {key: 'Config', label: 'Config icon', icon: ICONS.config},
      {key: 'Smile', label: 'Smile icon', icon: ICONS.smile},
    ];

    Object.assign(this.state, {
      type: 'iOS',
      title: 'String',
      titleStyle: 'Default',
      leftView: 'Back button',
      rightView: 'None',
      bgColor: 'Default',
      tintColor: 'Default',
      customBackground: false,
      hidden: false,
      animated: true,
      statusBarStyle: 'Light Content',
      statusBarHidden: false,
      statusBarInsets: true,
  titleTextKey: 'Multiline',
  titleNumberOfLinesKey: this.titleNumberOfLinesItems[0].key,
      titleAllowFontScaling: false,
      buttonHitSlopKey: this.buttonHitSlopItems[0].key,
      linkButtonTitleKey: this.linkButtonTitleItems[0].key,
      iconButtonIconKey: this.iconButtonIconItems[0].key,
      backButtonTitleKey: this.backButtonTitleItems[0].key,
      backButtonIconKey: this.backButtonIconItems[0].key,
    });
  }

  get type() {
    switch (this.state.type) {
      case 'Auto': return Platform.OS;
      default: return this.state.type.toLowerCase();
    }
  }

  get style() {
    switch (this.state.bgColor) {
      case 'Default': return null;
      case 'Custom': return {backgroundColor: '#e75f35'};
    }
  }

  get titleStyleValue() {
    switch (this.state.titleStyle) {
      case 'Emphasis':
        return {fontWeight: '600', color: '#3949ab'};
      default:
        return undefined;
    }
  }

  get tintColor() {
    switch(this.state.tintColor) {
      case 'Default': return undefined;
      case 'Custom': return '#3af455';
      case 'None': return null;
    }
  }

  get statusBarStyle() {
    switch(this.state.statusBarStyle) {
      case 'Default': return 'default';
      case 'Light Content': return 'light-content';
      case 'Dark Content': return 'dark-content';
    }
  }

  findItemByKey(items, key) {
    if (!(items instanceof Array) || !items.length) return null;
    return items.find(item => item.key === key) || items[0];
  }

  get titleTextValue() {
    const item = this.findItemByKey(this.titleTextItems, this.state.titleTextKey);
    return item ? item.text : undefined;
  }

  get titleNumberOfLinesValue() {
    const item = this.findItemByKey(this.titleNumberOfLinesItems, this.state.titleNumberOfLinesKey);
    return item ? item.lines : 1;
  }

  get buttonHitSlopSelection() {
    return this.findItemByKey(this.buttonHitSlopItems, this.state.buttonHitSlopKey);
  }

  get buttonHitSlopProps() {
    const selection = this.buttonHitSlopSelection;
    if (!selection || selection.type === 'default') return {};
    return {hitSlop: selection.hitSlop};
  }

  get linkButtonTitleValue() {
    const item = this.findItemByKey(this.linkButtonTitleItems, this.state.linkButtonTitleKey);
    return item ? item.title : undefined;
  }

  get iconButtonIconValue() {
    const item = this.findItemByKey(this.iconButtonIconItems, this.state.iconButtonIconKey);
    return item ? item.source : ICONS.search;
  }

  get backButtonTitleValue() {
    const item = this.findItemByKey(this.backButtonTitleItems, this.state.backButtonTitleKey);
    return item ? item.title : Theme.backButtonTitle;
  }

  get backButtonIconValue() {
    const item = this.findItemByKey(this.backButtonIconItems, this.state.backButtonIconKey);
    return item ? item.icon : undefined;
  }

  renderStatusBarColorPreview() {
    const color = Theme.navColor;
    const swatchStyle = {
      width: 32,
      height: 16,
      borderRadius: 3,
      backgroundColor: color,
      borderWidth: 0,
      borderColor: '#ccc',
    };
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={swatchStyle} />
        <Label style={{marginLeft: 8, color: '#666'}} text={color || 'auto'} />
      </View>
    );
  }

  renderLeftRightView(item) {
    const hitSlopProps = this.buttonHitSlopProps;
    switch (item) {
      case 'None':
        return null;
      case 'Back button': {
        const backButtonIcon = this.backButtonIconValue;
        const backButtonProps = {...hitSlopProps};
        if (backButtonIcon !== undefined) backButtonProps.icon = backButtonIcon;
        return (
          <NavigationBar.BackButton
            {...backButtonProps}
            title={this.backButtonTitleValue}
            onPress={() => this.navigator.pop()}
            />
        );
      }
      case 'Link button':
        return (
          <NavigationBar.LinkButton
            {...hitSlopProps}
            title={this.linkButtonTitleValue}
            />
        );
      case 'Icon button':
        return (
          <NavigationBar.IconButton
            {...hitSlopProps}
            icon={this.iconButtonIconValue}
            />
        );
      case 'Two icon button':
        return (
          <View style={{flexDirection: 'row'}}>
            <NavigationBar.IconButton
              {...hitSlopProps}
              icon={this.iconButtonIconValue}
              />
            <NavigationBar.IconButton
              {...hitSlopProps}
              icon={ICONS.trash}
              />
          </View>
        );
    }
  }

  renderNavigationTitle() {
    let {title, titleAllowFontScaling} = this.state;
    switch (title) {
      case 'String':
        return (
          <NavigationBar.Title
            text={this.titleTextValue}
            numberOfLines={this.titleNumberOfLinesValue}
            allowFontScaling={titleAllowFontScaling}
          />
        );
      case 'Custom':
        let titleStyle = {
          flex: 1,
          paddingLeft: 4,
          paddingRight: 4,
          alignItems: this.type === 'ios' ? 'center' : 'flex-start',
        };
        return (
          <View style={titleStyle}>
            <Label style={{color: Theme.navTitleColor, fontSize: 15}} text='Title' />
            <Label style={{color: Theme.navTitleColor, fontSize: 11}}  text='Secondary title' />
          </View>
        );
    }
  }

  renderNavigationLeftView() {
    return this.renderLeftRightView(this.state.leftView);
  }

  renderNavigationRightView() {
    return this.renderLeftRightView(this.state.rightView);
  }

  renderNavigationBar() {
    let {customBackground, hidden, animated, statusBarHidden, statusBarInsets} = this.state;
    return (
      <NavigationBar
        style={this.style}
        type={this.type}
        title={this.renderNavigationTitle()}
        leftView={this.renderNavigationLeftView()}
        rightView={this.renderNavigationRightView()}
        titleStyle={this.titleStyleValue}
        tintColor={this.tintColor}
        background={!customBackground ? null :
          <Image style={{flex: 1}} resizeMode='cover' source={require('../images/teaset2.jpg')} />
        }
        hidden={hidden}
        animated={animated}
        statusBarStyle={this.statusBarStyle}
        statusBarHidden={statusBarHidden}
        statusBarInsets={statusBarInsets}
        />
    );
  }

  renderPage() {
    const {
      type,
      title,
      leftView,
      rightView,
      bgColor,
      tintColor,
      customBackground,
      hidden,
      animated,
      statusBarStyle,
      statusBarHidden,
      statusBarInsets,
      titleStyle,
      titleTextKey,
      titleNumberOfLinesKey,
      titleAllowFontScaling,
      buttonHitSlopKey,
      linkButtonTitleKey,
      iconButtonIconKey,
      backButtonTitleKey,
      backButtonIconKey,
    } = this.state;
    return (
      <ScrollView style={{flex: 1, paddingTop: Theme.statusBarHeight}}>
        <View style={{height: Theme.navBarContentHeight, alignItems: 'center', justifyContent: 'center'}}>
          <Label style={{color: '#ccc'}} size='xl' text='ScrollView header' />
        </View>
        <View style={{height: 20}} />
        <SelectRow
          title='Type'
          value={type}
          items={this.typeItems}
          onSelected={(item, index) => this.setState({type: item})}
          topSeparator='full'
          />
        <SelectRow
          title='Title'
          value={title}
          items={this.titleItems}
          onSelected={(item, index) => this.setState({title: item})}
          />
        <SelectRow
          title='Title style'
          value={titleStyle}
          items={this.titleStyleItems}
          onSelected={(item, index) => this.setState({titleStyle: item})}
          />
        <SelectRow
          title='Left view'
          value={leftView}
          items={this.leftViewItems}
          onSelected={(item, index) => this.setState({leftView: item})}
          />
        <SelectRow
          title='Right view'
          value={rightView}
          items={this.rightViewItems}
          onSelected={(item, index) => this.setState({rightView: item})}
          />
        <SelectRow
          title='Background color'
          value={bgColor}
          items={this.bgColorItems}
          onSelected={(item, index) => this.setState({bgColor: item})}
          />
        <SelectRow
          title='Tint color'
          value={tintColor}
          items={this.tintColorItems}
          onSelected={(item, index) => this.setState({tintColor: item})}
          />
        <ListRow
          title='Background element(Image)'
          detail={<Switch value={customBackground} onValueChange={value => this.setState({customBackground: value})} />}
          />
        <ListRow
          title='Hidden'
          detail={<Switch value={hidden} onValueChange={value => this.setState({hidden: value})} />}
          />
        <ListRow
          title='Animated'
          detail={<Switch value={animated} onValueChange={value => this.setState({animated: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <SelectRow
          title='Status bar style'
          value={statusBarStyle}
          items={this.statusBarStyleItems}
          onSelected={(item, index) => this.setState({statusBarStyle: item})}
          topSeparator='full'
          />
        <ListRow
          title='Status bar color'
          detail={this.renderStatusBarColorPreview()}
          />
        <ListRow
          title='Status bar hidden'
          detail={<Switch value={statusBarHidden} onValueChange={value => this.setState({statusBarHidden: value})} />}
          />
        <ListRow
          title='Status bar insets'
          detail={<Switch value={statusBarInsets} onValueChange={value => this.setState({statusBarInsets: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='NavigationBar.Title props' />
        <SelectRow
          title='text'
          value={titleTextKey}
          items={this.titleTextItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({titleTextKey: item.key})}
          topSeparator='full'
          />
        <SelectRow
          title='numberOfLines'
          value={titleNumberOfLinesKey}
          items={this.titleNumberOfLinesItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({titleNumberOfLinesKey: item.key})}
          />
        <ListRow
          title='allowFontScaling'
          detail={<Switch value={titleAllowFontScaling} onValueChange={value => this.setState({titleAllowFontScaling: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='NavigationBar.Button props' />
        <SelectRow
          title='hitSlop'
          value={buttonHitSlopKey}
          items={this.buttonHitSlopItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({buttonHitSlopKey: item.key})}
          topSeparator='full'
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='NavigationBar.LinkButton props' />
        <SelectRow
          title='title'
          value={linkButtonTitleKey}
          items={this.linkButtonTitleItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({linkButtonTitleKey: item.key})}
          topSeparator='full'
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='NavigationBar.IconButton props' />
        <SelectRow
          title='icon'
          value={iconButtonIconKey}
          items={this.iconButtonIconItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({iconButtonIconKey: item.key})}
          topSeparator='full'
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <Label style={styles.sectionLabel} text='NavigationBar.BackButton props' />
        <SelectRow
          title='title'
          value={backButtonTitleKey}
          items={this.backButtonTitleItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({backButtonTitleKey: item.key})}
          topSeparator='full'
          />
        <SelectRow
          title='icon'
          value={backButtonIconKey}
          items={this.backButtonIconItems}
          getItemValue={item => item.key}
          getItemText={item => item.label}
          onSelected={(item, index) => this.setState({backButtonIconKey: item.key})}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }
}
