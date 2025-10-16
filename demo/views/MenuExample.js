// MenuExample.js

'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationPage, Menu, Button, Theme} from 'teaset';

export default class MenuExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Menu',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.btn1Ref = React.createRef();
    this.btn2Ref = React.createRef();
    this.btn3Ref = React.createRef();
    this.btn4Ref = React.createRef();
    this.btn5Ref = React.createRef();
    this.btn6Ref = React.createRef();
  }

  show(view, align) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Search', icon: require('../icons/search.png'), onPress: () => alert('Search')},
        {title: 'Edit', icon: require('../icons/edit.png'), onPress: () => alert('Edit')},
        {title: 'Remove', icon: require('../icons/trash.png'), onPress: () => alert('Remove')},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items, {align});
    });
  }

  renderPage() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button title='Start' ref={this.btn1Ref} onPress={() => this.show(this.btn1Ref.current, 'start')} />
          <Button title='Center' ref={this.btn2Ref} onPress={() => this.show(this.btn2Ref.current, 'center')} />
          <Button title='End' ref={this.btn3Ref} onPress={() => this.show(this.btn3Ref.current, 'end')} />
        </View>
        <View style={{flex: 1}} />
        <View style={{height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button title='Start' ref={this.btn4Ref} onPress={() => this.show(this.btn4Ref.current, 'start')} />
          <Button title='Center' ref={this.btn5Ref} onPress={() => this.show(this.btn5Ref.current, 'center')} />
          <Button title='End' ref={this.btn6Ref} onPress={() => this.show(this.btn6Ref.current, 'end')} />
        </View>
        <View style={{height: Theme.screenInset.bottom}} />
      </View>
    );
  }

}
