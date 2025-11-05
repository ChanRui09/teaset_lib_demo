// SearchInputExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, SearchInput} from 'teaset';

export default class SearchInputExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SearchInput',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueControlled: 'Search me',
      valueCustom: null,
      valueCallback: '',
    });
  }

  renderPage() {
    let {valueControlled, valueCustom, valueCallback} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' />
        } topSeparator='full' bottomSeparator='full' />
        <ListRow title='Controlled value' detail={
          <SearchInput
            style={{width: 200}}
            value={valueControlled}
            placeholder='Controlled input'
            onChangeText={text => this.setState({valueControlled: text})}
          />
        } />
        <ListRow title='PlaceholderTextColor' detail={
          <SearchInput
            style={{width: 200}}
            placeholder='Accent placeholder'
            placeholderTextColor='#ff9800'
          />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Readonly (editable=false)' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' value='Readonly' editable={false} />
        } topSeparator='full' />
        <ListRow title='Disabled' detail={
          <SearchInput style={{width: 200}} placeholder='Enter text' clearButtonMode='while-editing' value='Disabled' disabled={true} />
        } />
        <ListRow title='Icon size' detail={
          <SearchInput style={{width: 200}} placeholder='Large icon' iconSize={24} />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='UnderlineColorAndroid' detail={
          <SearchInput
            style={{width: 200}}
            placeholder='Colored underline (Android)'
            underlineColorAndroid='#ff5722'
          />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom style & inputStyle' detail={
          <SearchInput
            style={{width: 200, height: 40, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}
            inputStyle={{color: '#8a6d3b', fontSize: 18}}
            iconSize={15}
            value={valueCustom}
            placeholder='Custom'
            placeholderTextColor='#aaa'
            onChangeText={text => this.setState({valueCustom: text})}
            />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='OnChangeText callback' detail={
          <SearchInput
            style={{width: 200}}
            value={valueCallback}
            placeholder='Type to search'
            onChangeText={text => {
              this.setState({valueCallback: text});
              if (text.length >= 3) {
                alert(`Searching for: ${text}`);
              }
            }}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
