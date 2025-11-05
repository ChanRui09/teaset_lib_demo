// SelectExample.js

'use strict';

import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import {NavigationPage, ListRow, Select, Label} from 'teaset';

export default class SelectExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Select',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.items = [
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
    this.customItems = [
      {
        text: 'Long long long long long long long',
        value: 1,
      }, {
        text: 'Short',
        value: 2,
      }, {
        text: <Image style={{width: 40, height: 40}} source={require('../images/teaset1_s.jpg')} />,
        value: 3,
      },
    ];
    this.objectItems = [
      {id: '0', name: 'Aged Pu\'er', origin: 'Yunnan'},
      {id: '1', name: 'Jasmine', origin: 'Fujian'},
      {id: '2', name: 'Tieguanyin', origin: 'Beijing'},
    ];
    Object.assign(this.state, {
      valueSM: null,
      valueMD: null,
      valueLG: null,
      valueAuto: null,
      valuePull: null,
      valuePopover: null,
      valueReadonly: 'Readonly',
      valueDisable: null,
      valueCustom: null,
      valueIconTintColor: null,
      valuePlaceholderColor: null,
      valueCallback: null,
      valueObject: null,
      valueObjectLabel: null,
    });
  }

  renderPage() {
    let {valueSM, valueMD, valueLG, valueAuto, valuePull, valuePopover, valueReadonly, valueDisable, valueCustom, valueIconTintColor, valuePlaceholderColor, valueCallback, valueObject, valueObjectLabel} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow
          title='Size sm'
          detail={
            <Select
              style={{width: 200}}
              size='sm'
              value={valueSM}
              items={this.items}
              placeholder='Select item'
              pickerTitle='Size sm'
              onSelected={(item, index) => this.setState({valueSM: item})}
              />
          } topSeparator='full' />
        <ListRow
          title='Size md'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueMD}
              items={this.items}
              placeholder='Select item'
              pickerTitle='Size md'
              onSelected={(item, index) => this.setState({valueMD: item})}
              />
          } />
        <ListRow
          title='Size lg'
          detail={
            <Select
              style={{width: 200}}
              size='lg'
              value={valueLG}
              items={this.items}
              placeholder='Select item'
              pickerTitle='Size lg'
              onSelected={(item, index) => this.setState({valueLG: item})}
              />
          } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='PickerType auto'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueAuto}
              items={this.items}
              placeholder='Select item'
              pickerType='auto'
              pickerTitle='PickerType auto'
              onSelected={(item, index) => this.setState({valueAuto: item})}
              />
          } />
        <ListRow
          title='PickerType pull'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valuePull}
              items={this.items}
              placeholder='Select item'
              pickerType='pull'
              pickerTitle='PickerType pull'
              onSelected={(item, index) => this.setState({valuePull: item})}
              />
          } />
        <ListRow
          title='PickerType popover'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valuePopover}
              items={this.items}
              placeholder='Select item'
              pickerType='popover'
              pickerTitle='PickerType popover'
              onSelected={(item, index) => this.setState({valuePopover: item})}
              />
          } />
        <View style={{height: 20}} />
        <ListRow
          title='Readonly'
          detail={
            <Select
              style={{width: 200}}
              placeholder='Select item'
              editable={false}
              value={valueReadonly}
              />
          } topSeparator='full' />
        <ListRow
          title='Disabled'
          detail={
            <Select
              style={{width: 200}}
              items={this.items}
              placeholder='Select item'
              disabled={true}
              value={valueDisable}
              />
          } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='Custom'
          detail={
            <Select
              style={{width: 200, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}
              size='lg'
              value={valueCustom}
              valueStyle={{flex: 1, color: '#8a6d3b', textAlign: 'right'}}
              items={this.customItems}
              getItemValue={(item, index) => item.value}
              getItemText={(item, index) => item.text}
              icon={<Text style={{color: '#8a6d3b', fontSize: 16, paddingRight: 4}}>▼</Text>}
              placeholder='Select item'
              pickerTitle='Custom'
              onSelected={(item, index) => this.setState({valueCustom: item.value})}
              />
          } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='Data'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueObject}
              items={this.objectItems}
              placeholder='Select tea'
              pickerTitle='Data demo'
              getItemValue={(item, index) => item.id}
              getItemText={(item, index) => `${item.name} · ${item.origin}`}
              onSelected={(item, index) => this.setState({
                valueObject: item.id,
                valueObjectLabel: `${item.name} (${item.origin})`,
              })}
              />
          } topSeparator='full' />
        <ListRow
          title='Selected id (getItemValue)'
          detail={<Label text={valueObject || 'None'} />}
        />
        <ListRow
          title='Selected label (getItemText)'
          detail={<Label text={valueObjectLabel || 'None'} />}
          bottomSeparator='full'
        />
        <View style={{height: 20}} />
        <ListRow
          title='IconTintColor'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueIconTintColor}
              items={this.items}
              iconTintColor='#ff5722'
              placeholder='Select item'
              pickerTitle='IconTintColor'
              onSelected={(item, index) => this.setState({valueIconTintColor: item})}
              />
          } topSeparator='full' />
        <ListRow
          title='PlaceholderTextColor'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valuePlaceholderColor}
              items={this.items}
              placeholder='Placeholder with color'
              placeholderTextColor='#2196f3'
              pickerTitle='PlaceholderTextColor'
              onSelected={(item, index) => this.setState({valuePlaceholderColor: item})}
              />
          } />
        <ListRow
          title='OnSelected callback'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueCallback}
              items={this.items}
              placeholder='Select item'
              pickerTitle='OnSelected callback'
              onSelected={(item, index) => {
                this.setState({valueCallback: item});
                alert(`Selected: ${item} (index: ${index})`);
              }}
              />
          } bottomSeparator='full' />
      </ScrollView>
    );
  }

}
