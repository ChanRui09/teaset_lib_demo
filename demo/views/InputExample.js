// InputExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, Input, Label} from 'teaset';

export default class InputExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Input',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueSM: null,
      valueMD: null,
      valueLG: null,
      valueReadonly: 'Readonly',
      valueDisable: 'Disable true',
      valueCustom: null,
      valueCallback: '',
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Size sm' detail={
          <Input
            style={{width: 200}}
            size='sm'
            value={this.state.valueSM}
            placeholder='Size sm'
            onChangeText={text => this.setState({valueSM: text})}
            />
        } topSeparator='full' />
        <View style={{height: 20 }} />
        <ListRow title='Size md' detail={
          <Input
            style={{width: 200}}
            size='md'
            value={this.state.valueMD}
            placeholder='Size md'
            
            onChangeText={text => this.setState({valueMD: text})}
            />
        }/>
        <View style={{height: 20}} />
        <ListRow title='Size lg' detail={
          <Input
            style={{width: 200}}
            size='lg'
            value={this.state.valueLG}
            placeholder='Size lg'
            onChangeText={text => this.setState({valueLG: text})}
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Readonly(editable={false})' detail={
          <Input
            style={{width: 200}}
            editable={false}
            value={this.state.valueReadonly}
            />
        } topSeparator='full' />
        <ListRow title='editable(true)' detail={
          <Input
            style={{width: 200}}
            editable={true}
            placeholder="editable"
            />
        } topSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Disabled(true)' detail={
          <Input
            style={{width: 200}}
            disabled={true}
            value={this.state.valueDisable}
            />
        } bottomSeparator='full' />
        <ListRow title='Disabled(false)' detail={
          <Input
            style={{width: 200}}
            disabled={false}
            placeholder="Disable false"
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='underlineColorAndroid string' detail={
          <Input
            style={{width: 150, paddingVertical:0, borderWidth: 0.01}}
            placeholder='Visible underline'
            underlineColorAndroid='#ff5722'
            />
        } topSeparator='full' />
        <ListRow title='underlineColorAndroid rgba' detail={
          <Input
            style={{width: 150, paddingVertical:0, borderWidth: 0.01}}
            placeholder='Visible underline'
            underlineColorAndroid='rgba(36, 22, 228, 1)'
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='onChangeText callback' detail={
          <Input
            style={{width: 200}}
            placeholder='Type here'
            value={this.state.valueCallback}
            onChangeText={text => {
              this.setState({valueCallback: text});
              if (text.length >= 1) {
                alert(`Input text: ${text}`);
              }
            }}
            />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={
          <Input
            style={{width: 200, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', color: '#8a6d3b', textAlign: 'right'}}
            value={this.state.valueCustom}
            placeholder='Custom'
            onChangeText={text => this.setState({valueCustom: text})}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
