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
    this.iconAsset = require('../icons/config.png');
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
      valueIconDefault: null,
      valueIconNone: null,
      valueIconAsset: null,
      valueStyled: null,
      valueIconElement: null,
      valueEditableTrue: null,
      valueDisabledFalse: null,
    });
  }

  getTeaValue = item => item.id;

  getTeaLabel = item => `${item.name} · ${item.origin}`;

  renderPage() {
    let {
      valueSM,
      valueMD,
      valueLG,
      valueAuto,
      valuePull,
      valuePopover,
      valueReadonly,
      valueDisable,
      valueCustom,
      valueIconTintColor,
      valuePlaceholderColor,
      valueCallback,
      valueObject,
      valueObjectLabel,
      valueIconDefault,
      valueIconNone,
      valueIconAsset,
      valueStyled,
      valueIconElement,
      valueEditableTrue,
      valueDisabledFalse,
    } = this.state;
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
          title='Readonly(editable={fasle})'
          detail={
            <Select
              style={{width: 200}}
              placeholder='Select item'
              editable={false}
              value={valueReadonly}
              />
          } topSeparator='full' />
        <ListRow
          title='editable(true)'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueEditableTrue}
              items={this.items}
              placeholder='Editable selects'
              editable={true}
              pickerType='pull'
              pickerTitle='Editable demo'
              onSelected={(item, index) => {this.setState({valueEditableTrue: item});}}
              />
          } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='Disabled(true)'
          detail={
            <Select
              style={{width: 200}}
              items={this.items}
              placeholder='Select item'
              disabled={true}
              value={valueDisable}
              />
          } topSeparator='full' />
        <ListRow
          title='Disabled(false)'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueDisabledFalse}
              items={this.items}
              placeholder='Active select'
              disabled={false}
              pickerType='pull'
              pickerTitle='Disabled false demo'
              onSelected={(item, index) => this.setState({valueDisabledFalse: item})}
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
            <View style={{width: 200}}>
              <Select
                style={{marginBottom: 6}}
                size='md'
                value={valueObject}
                items={this.objectItems}
                placeholder='Select tea'
                pickerTitle='Data demo'
                getItemValue={this.getTeaValue}
                getItemText={this.getTeaLabel}
                onSelected={(item, index) => this.setState({
                  valueObject: this.getTeaValue(item),
                  valueObjectLabel: `${item.name} (${item.origin})`,
                })}
                />
            </View>
          } topSeparator='full' />
          <Label
              style={{color: '#9e9e9e', fontSize: 10, lineHeight: 16}}
              text=' 示例自定义 getItemValue 返回 item.id 作为存储值，getItemText 拼接名称与产地'
          />
          <Label
              style={{color: '#9e9e9e', fontSize: 10, lineHeight: 16}}
              text=' 可按需替换成任意逻辑或元素'
          />
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
          title='Icon default'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueIconDefault}
              items={this.items}
              icon='default'
              placeholder='Uses default chevron'
              pickerTitle='Icon default'
              onSelected={(item, index) => this.setState({valueIconDefault: item})}
              />
          } topSeparator='full' />
        <ListRow
          title='Icon none'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueIconNone}
              items={this.items}
              icon='none'
              placeholder='No icon'
              pickerTitle='Icon none'
              onSelected={(item, index) => this.setState({valueIconNone: item})}
              />
          } />
        <ListRow
          title='Icon asset(Image)'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueIconAsset}
              items={this.items}
              icon={this.iconAsset}
              iconTintColor={null}
              placeholder='Bundled icon'
              pickerTitle='Icon asset'
              onSelected={(item, index) => this.setState({valueIconAsset: item})}
              />
          } />
        <ListRow
          title='Icon element(View-Text)'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueIconElement}
              items={this.items}
              icon={
                <View style={{width: 18, height: 18, borderRadius: 9, backgroundColor: '#673ab7', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', fontSize: 12}}>★</Text>
                </View>
              }
              placeholder='Element icon'
              pickerTitle='Icon element'
              onSelected={(item, index) => this.setState({valueIconElement: item})}
              />
          }
        />
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
          title='valueStyle'
          detail={
            <Select
              style={{width: 200}}
              size='md'
              value={valueStyled}
              items={this.items}
              valueStyle={{flex: 1, color: '#4caf50', textAlign: 'right', fontWeight: '600'}}
              placeholder='Styled value'
              pickerTitle='valueStyle'
              onSelected={(item, index) => this.setState({valueStyled: item})}
              />
          }
        />
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
