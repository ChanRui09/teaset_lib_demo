// ThemeExample.js

'use strict';

import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Theme, NavigationPage, ListRow, PullPicker, Label } from 'teaset';

// 使用 HOC 将 navigation 注入到组件中
function withNavigation(WrappedComponent) {
  // Forward the ref so NavigationPage can still obtain it
  const WithNavigationComponent = (props, ref) => {
    const navigation = useNavigation();
    return <WrappedComponent {...props} reactNavigation={navigation} ref={ref} />;
  };
  const Forwarded = React.forwardRef(WithNavigationComponent);
  Forwarded.displayName = `withNavigation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Forwarded;
}

class ThemeExample extends NavigationPage {

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
      currentOrientation: 'portrait', // 'portrait', 'landscape', 'all'
    };
  }

  componentDidMount() {
    this.dimListener = Dimensions.addEventListener('change', this.handleDimensionChange);
  }

  componentWillUnmount() {
    this.dimListener && this.dimListener.remove();
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
    PullPicker.show(
      'Select theme',
      Object.keys(Theme.themes),
      -1,
      (item, index) => {
        Theme.set(Theme.themes[item]);
        this.refreshThemeInfo();
        this.navigator.popToTop();
      }
    );
  }

  changeOrientation() {
    const orientations = ['all', 'portrait', 'portrait_up', 'portrait_down', 'landscape', 'landscape_left', 'landscape_right'];
    const orientationLabels = [
      'All - 所有方向',
      'Portrait - 竖屏',
      'Portrait Up - 竖屏向上',
      'Portrait Down - 竖屏向下',
      'Landscape - 横屏',
      'Landscape Left - 横屏向左',
      'Landscape Right - 横屏向右'
    ];
    
    const currentIndex = orientations.indexOf(this.state.currentOrientation);
    
    PullPicker.show(
      'Select orientation',
      orientationLabels,
      currentIndex,
      (item, index) => {
        const selectedOrientation = orientations[index];
        this.setState({ currentOrientation: selectedOrientation });
        
        // 使用 react-navigation 设置屏幕方向
        try {
          const navigation = this.props.reactNavigation;
          if (navigation && typeof navigation.setOptions === 'function') {
            navigation.setOptions({
              orientation: selectedOrientation,
            });
            console.log('Screen orientation set to:', selectedOrientation);
          } else {
            console.log('Navigation object not available');
          }
        } catch (error) {
          console.log('Failed to set orientation:', error);
        }
      }
    );
  }

  renderPage() {
    let { isLandscape, statusBarHeight, screenInset, primaryColor, currentOrientation } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <ListRow title='Select theme' detail={Object.keys(Theme.themes).join(', ')} onPress={() => this.changeTheme()} topSeparator='full' bottomSeparator='indent' />
        <ListRow 
          title='Screen orientation' 
          detail={currentOrientation} 
          onPress={() => this.changeOrientation()} 
          bottomSeparator='full' 
        />
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
      </ScrollView>
    );
  }

}

export default withNavigation(ThemeExample);