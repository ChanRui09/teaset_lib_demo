// TabViewExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Image, Switch, Platform} from 'react-native';

import {Theme, TeaNavigator, NavigationPage, BasePage, ListRow, TabView, Label, PullPicker} from 'teaset';

import SelectRow from './SelectRow';

class DemoTabView extends TabView {
  renderBar() {
    let {barStyle, onChange} = this.props;
    let {bottom: bottomInset} = Theme.screenInset;

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
    let {height, paddingTop, paddingBottom} = barStyle;
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
      <View style={{height: barStyle.height}} pointerEvents='box-none'>
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
                icon={icon}
                activeIcon={activeIcon}
                active={type === 'sheet' ? sheetIndex === this.activeIndex : false}
                iconContainerStyle={iconContainerStyle}
                badge={badge}
                titleStyle={titleStyle}
                activeTitleStyle={activeTitleStyle}
                onPress={e => {
                  if (type === 'sheet') {
                    this.setState({activeIndex: sheetIndex}, () => {
                      const carousel = this.carouselRef.current;
                      carousel && carousel.scrollToPage(sheetIndex);
                      onChange && onChange(sheetIndex);
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
    Object.assign(this.state, {
      type: 'projector',
      custom: false,
      activeIndex: 0,
      useTitleStyle: false,
    });
  }

  renderCustomButton() {
    let bigIcon = (
        <View style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          shadowColor: '#ccc',
          shadowOffset: {height: -1},
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image
            style={{width: 44, height: 44, borderRadius: 22}}
            source={require('../images/faircup.jpg')}
            />
        </View>
    );
    return (
      <TabView.Sheet
        type='button'
        title='Custom'
        icon={bigIcon}
        iconContainerStyle={{justifyContent: 'flex-end'}}
        onPress={() => alert('Custom button press')}
        />
    );
  }

  renderPage() {
    let {type, custom, activeIndex, useTitleStyle} = this.state;
    let customBarStyle = Platform.OS == 'android'  ? null : {
      borderTopWidth: 0,
      shadowColor: '#ccc',
      shadowOffset: {height: -1},
      shadowOpacity: 0.4,
      shadowRadius: 0.5,
    };
    return (
      <DemoTabView 
        style={{flex: 1}} 
        barStyle={custom ? customBarStyle : null} 
        type={type}
        activeIndex={activeIndex}
        onChange={index => {
          this.setState({activeIndex: index});
          alert(`切换到标签页: ${index}`);
        }}
      >
        <TabView.Sheet
          title='Home'
          icon={require('../icons/home.png')}
          activeIcon={require('../icons/home_active.png')}
          titleStyle={useTitleStyle ? {fontSize: 10, color: '#999'} : undefined}
          activeTitleStyle={useTitleStyle ? {fontSize: 12, color: '#ff5722', fontWeight: 'bold'} : undefined}
        >
          <HomePage
            type={type}
            custom={custom}
            useTitleStyle={useTitleStyle}
            onChangeType={type => this.setState({type})}
            onChangeCustom={custom => this.setState({custom})}
            onChangeTitleStyle={useTitleStyle => this.setState({useTitleStyle})}
            />
        </TabView.Sheet>
        {custom ? this.renderCustomButton() : null}
        <TabView.Sheet
          title='Store'
          titleStyle={useTitleStyle ? {fontSize: 10, color: '#999'} : undefined}
          activeTitleStyle={useTitleStyle ? {fontSize: 12, color: '#ff5722', fontWeight: 'bold'} : undefined}
          badge={3}
        >
          <StorePage />
        </TabView.Sheet>
        <TabView.Sheet
          title='Me'
          icon={require('../icons/me.png')}
          activeIcon={require('../icons/me_active.png')}
          badge={1}
          titleStyle={useTitleStyle ? {fontSize: 10, color: '#999'} : undefined}
          activeTitleStyle={useTitleStyle ? {fontSize: 12, color: '#ff5722', fontWeight: 'bold'} : undefined}
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
    let {type, custom, useTitleStyle, onChangeCustom, onChangeType, onChangeTitleStyle} = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <SelectRow title='Type' value={type} items={['projector', 'carousel']} onSelected={(item, index) => onChangeType && onChangeType(item)} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={<Switch value={custom} onValueChange={value => onChangeCustom(value)} />} topSeparator='full' />
        <ListRow title='titleStyle & activeTitleStyle' detail={<Switch value={useTitleStyle} onValueChange={value => onChangeTitleStyle(value)} />} bottomSeparator='full' />
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label type='detail' size='xl' text='Store (纯文字标题)' />
        <Label type='detail' text='此标签页展示 titleStyle 和 activeTitleStyle 效果' style={{marginTop: 10}} />
      </View>
    );
  }

}
