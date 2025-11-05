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
      valueTextInput: 'Search me',
      valueInputStyled: 'Styled content',
      valueCallback: '',
    });
  }

  renderPage() {
    let {valueTextInput, valueInputStyled, valueCallback} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' detail={
          <SearchInput
            style={{width: 200}}
            value={valueTextInput}
            placeholder='Supports TextInput props'
            clearButtonMode='while-editing'
            onChangeText={text => this.setState({valueTextInput: text})}
          />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='style' detail={
          <SearchInput
            style={{width: 200, backgroundColor: '#f5f5f5', borderColor: '#2196f3', borderWidth: 1, borderRadius: 6}}
            placeholder='Container styled'
          />
        } topSeparator='full' />
        <ListRow title='inputStyle' detail={
          <SearchInput
            style={{width: 200}}
            value={valueInputStyled}
            inputStyle={{color: '#4caf50', fontSize: 18, textAlign: 'right'}}
            placeholder='Input styled'
            onChangeText={text => this.setState({valueInputStyled: text})}
          />
        } />
        <ListRow title='iconSize small(14)' detail={
          <SearchInput style={{width: 200}} placeholder='Small icon' iconSize={14} />
        } />
        <ListRow title='iconSize large(28)' detail={
          <SearchInput style={{width: 200}} placeholder='Large icon' iconSize={28} />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='disabled' detail={
          <SearchInput style={{width: 200}} placeholder='Disabled input' value='Disabled' disabled={true} />
        } topSeparator='full' />
        <ListRow title='disabled (default false)' detail={
          <SearchInput style={{width: 200}} placeholder='Interactive input' />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='underlineColorAndroid' detail={
          <SearchInput
            style={{width: 200}}
            placeholder='string'
            underlineColorAndroid='#ff5722'
          />
        } topSeparator='full' bottomSeparator='full' />
        <ListRow title='underlineColorAndroid' detail={
          <SearchInput
            style={{width: 200}}
            placeholder='rgba'
            underlineColorAndroid='rgba(115, 228, 22, 1)'
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
