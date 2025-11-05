// ThemeExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import { Theme, NavigationPage, ListRow, PullPicker, Label } from 'teaset';

export default class ThemeExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Theme',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLandscape: Theme.isLandscape,
      statusBarHeight: Theme.statusBarHeight,
      screenInset: Theme.screenInset,
      primaryColor: Theme.primaryColor,
    };
  }

  componentDidMount() {
    this.dimListener = Dimensions.addEventListener('change', this.handleDimensionChange);
  }

  componentWillUnmount() {
    this.dimListener && this.dimListener.remove();
    if (this.pickerKey) {
      PullPicker.hide(this.pickerKey);
      this.pickerKey = null;
    }
  }

  handleDimensionChange = () => {
    this.refreshThemeInfo();
  }

  refreshThemeInfo() {
    this.setState({
      isLandscape: Theme.isLandscape,
      statusBarHeight: Theme.statusBarHeight,
      screenInset: Theme.screenInset,
      primaryColor: Theme.primaryColor,
    });
  }

  changeTheme() {
    this.pickerKey = PullPicker.show(
      'Select theme',
      Object.keys(Theme.themes),
      -1,
      (item, index) => {
        this.pickerKey = null;
        Theme.set(Theme.themes[item]);
        this.refreshThemeInfo();
        this.navigator.popToTop();
      }
    );
  }

  customPrimaryColor() {
    const color = '#f55e5d';
    Theme.set({
      primaryColor: color,
      navColor: color,
      navSeparatorColor: color,
      btnPrimaryColor: color,
      btnBorderColor: color,
      btnPrimaryBorderColor: color,
      btnTitleColor: color,
      tvBarBtnIconActiveTintColor: color,
      tvBarBtnActiveTitleColor: color,
      sbBtnActiveTitleColor: color,
      sbIndicatorLineColor: color,
    });
    this.refreshThemeInfo();
    this.navigator.popToTop();
  }

  customBackButtonTitle() {
    Theme.set({
      backButtonTitle: '返回',
    });
    this.refreshThemeInfo();
    this.navigator.popToTop();
  }

  renderPage() {
    let { isLandscape, statusBarHeight, screenInset, primaryColor } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <ListRow title='Select theme' detail={Object.keys(Theme.themes).join(', ')} onPress={() => this.changeTheme()} topSeparator='full' />
        <ListRow title='Custom primaryColor' detail='Set to #f55e5d' onPress={() => this.customPrimaryColor()} />
        <ListRow title='Custom backButtonTitle' detail='Set to 返回' onPress={() => this.customBackButtonTitle()} bottomSeparator='full' />
        <View style={{ height: 20 }} />
        <ListRow title='isLandscape' detail={String(isLandscape)} topSeparator='full' bottomSeparator='indent' />
        <ListRow title='statusBarHeight' detail={`${statusBarHeight}`} bottomSeparator='indent' />
        <ListRow
          title='screenInset'
          detail={` left: ${screenInset.left}
                    right: ${screenInset.right}
                    top: ${screenInset.top}
                    bottom: ${screenInset.bottom}`}
          detailMultiLine
          bottomSeparator='full'
        />
        <View style={{ height: 20 }} />
        <View style={{ paddingHorizontal: 12 }}>
          <Label style={{ fontSize: 12, color: '#666', lineHeight: 18 }} text='Primary Color Preview' />
        </View>
        <View style={{ paddingHorizontal: 12, marginTop: 8, marginBottom: 12 }}>
          <View style={{ height: 50, borderRadius: 8, backgroundColor: primaryColor, alignItems: 'center', justifyContent: 'center' }}>
            <Label style={{ color: '#fff', fontWeight: 'bold' }} text={primaryColor} />
          </View>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

}
