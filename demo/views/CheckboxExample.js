// CheckboxExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';

import {NavigationPage, ListRow, Checkbox, Label} from 'teaset';

export default class CheckboxExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Checkbox',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      checkedSM: false,
      checkedMD: false,
      checkedLG: false,
      checkedEmpty: false,
      checkedDisableT: true,
      checkedDisableF: true,
      checkedCustom: false,
      checkedHitSlop: false,
      checkedOnChange: false,
      checkedTitleNumber: false,
      checkedTitleElement: false,
      checkedTitleStyleBold: false,
      checkedTitleStyleSpaced: false,
      checkedIconRequire: false,
      checkedIconUri: false,
      checkedHitSlopXL: false,
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Size sm' detail={
          <Checkbox
            title='Checkbox'
            size='sm'
            checked={this.state.checkedSM}
            onChange={value => this.setState({checkedSM: value})}
            />
        } topSeparator='full' />
        <ListRow title='Size md' detail={
          <Checkbox
            title='Checkbox'
            size='md'
            checked={this.state.checkedMD}
            onChange={value => this.setState({checkedMD: value})}
            />
        } />
        <ListRow title='Size lg' detail={
          <Checkbox
            title='Checkbox'
            size='lg'
            checked={this.state.checkedLG}
            onChange={value => this.setState({checkedLG: value})}
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Empty title' detail={
          <Checkbox
            checked={this.state.checkedEmpty}
            onChange={value => this.setState({checkedEmpty: value})}
            />
        } topSeparator='full' />
        <ListRow title='Title number' detail={
          <Checkbox
            title={2025}
            checked={this.state.checkedTitleNumber}
            onChange={value => this.setState({checkedTitleNumber: value})}
            />
        } />
        <ListRow title='Title element(Label)' detail={
          <Checkbox
            title={<Label text='Element Title' />}
            checked={this.state.checkedTitleElement}
            onChange={value => this.setState({checkedTitleElement: value})}
            />
        } />
        <ListRow title='titleStyle bold' detail={
          <Checkbox
            title='Bold Text'
            titleStyle={{fontWeight: '700', fontSize: 16}}
            checked={this.state.checkedTitleStyleBold}
            onChange={value => this.setState({checkedTitleStyleBold: value})}
            />
        } />
        <ListRow title='titleStyle spaced' detail={
          <Checkbox
            title='Spaced Text'
            titleStyle={{letterSpacing: 2, color: '#3f51b5'}}
            checked={this.state.checkedTitleStyleSpaced}
            onChange={value => this.setState({checkedTitleStyleSpaced: value})}
            />
        } />
        <ListRow title='Disabled(true)' detail={
          <Checkbox
            title='Checkbox'
            disabled={true}
            checked={this.state.checkedDisableT}
            onChange={value => this.setState({checkedDisableT: value})}
            />
        } bottomSeparator='full' />
        <ListRow title='Disabled(false)' detail={
          <Checkbox
            title='Checkbox'
            disabled={false}
            checked={this.state.checkedDisableF}
            onChange={value => this.setState({checkedDisableF: value})}
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='defaultChecked(true)' detail={
          <View style={{alignItems: 'flex-end'}}>
            <Checkbox
              title='Default Checked'
              defaultChecked={true}
              />
          </View>
        } topSeparator='full' />
        <Label
            style={{color: '#9e9e9e', fontSize: 10, marginTop: 6, textAlign: 'left'}}
            text='  defaultChecked 仅决定初始勾选，当前实现中为 true 时点击不会反选'
            />
        <ListRow title='defaultchecked(false)' detail={
          <View style={{alignItems: 'flex-end'}}>
            <Checkbox
              title='Default Unchecked'
              defaultChecked={false}
              />
          </View>
        } />
        <Label
            style={{color: '#9e9e9e', fontSize: 10, marginTop: 6, textAlign: 'left'}}
            text=' defaultChecked={false} 只设置起始未选中，后续点击依旧会锁定为选中'
        />
        <ListRow title='checkedIcon element(Image)' detail={
          <Checkbox
            title='Asset Icons'
            checkedIcon = {<Image source={require('../icons/me_active.png')} />}
            checkedIconStyle={{tintColor: '#4caf50', width: 22, height: 22}}
            uncheckedIcon={<Image  source={require('../icons/me.png')} />}
            uncheckedIconStyle={{tintColor: '#9e9e9e', width: 18, height: 18}}
            checked={this.state.checkedIconRequire}
            onChange={value => this.setState({checkedIconRequire: value})}
            />
        } />
        <ListRow title='hitSlop(40)' detail={
          <Checkbox
            title='Large Touch Area'
            hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
            checked={this.state.checkedHitSlop}
            onChange={value => this.setState({checkedHitSlop: value})}
            />
        } />
        <ListRow title='hitSlop xl(80)' detail={
          <Checkbox
            title='Extra Large Touch Area'
            hitSlop={{top: 80, bottom: 80, left: 80, right: 80}}
            checked={this.state.checkedHitSlopXL}
            onChange={value => this.setState({checkedHitSlopXL: value})}
            />
        } />
        <ListRow title='onChange alert' detail={
          <Checkbox
            title='Click Me'
            checked={this.state.checkedOnChange}
            onChange={value => {
              this.setState({checkedOnChange: value});
              alert(`Checkbox ${value ? 'checked' : 'unchecked'}!`);
            }}
            />
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={
          <Checkbox
            title='Custom'
            titleStyle={{color: '#8a6d3b', paddingLeft: 4}}
            checkedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('../icons/checkbox_checked.png')} />}
            uncheckedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('../icons/checkbox_unchecked.png')} />}
            checked={this.state.checkedCustom}
            onChange={value => this.setState({checkedCustom: value})}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
