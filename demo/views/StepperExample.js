// StepperExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, Stepper} from 'teaset';

export default class StepperExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Stepper',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueCustom: 1,
      valueCallback: 0,
      valueStyled: 5,
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' detail={<Stepper />} topSeparator='full' />
        <ListRow title='Default value 5' detail={<Stepper defaultValue={5} />} />
        <ListRow title='Default value -3' detail={<Stepper defaultValue={-3} min={-10} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Min only(0)' detail={<Stepper defaultValue={0} min={0} />} topSeparator='full' />
        <ListRow title='Max only(8)' detail={<Stepper defaultValue={8} max={8} />} />
        <ListRow title='Min(1) & max(2)' detail={<Stepper defaultValue={1} min={1} max={2} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Step integer(2)' detail={<Stepper defaultValue={4} step={2} min={0} max={10} />} topSeparator='full' />
        <ListRow title='Step fractional(0.005)' detail={<Stepper defaultValue={0.8} step={0.005} valueFormat={v => (v * 100).toFixed(1) + '%'} valueStyle={{minWidth: 60}} />} />
        <ListRow title='Step decimal(0.1)' detail={<Stepper defaultValue={1.5} step={0.1} valueFormat={v => v.toFixed(1)} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='valueStyle' detail={<Stepper defaultValue={this.state.valueStyled} value={this.state.valueStyled} valueStyle={{color: '#3f51b5', fontSize: 18, fontWeight: '600', minWidth: 70}} step={1} min={0} max={20} onChange={v => this.setState({valueStyled: v})} />} topSeparator='full' />
        <ListRow title='valueFormat suffix' detail={<Stepper defaultValue={7} valueFormat={v => `${v} 次`} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Readonly(editable={false})' detail={<Stepper editable={false} />} topSeparator='full' />
        <ListRow title='Disabled(true)' detail={<Stepper disabled={true} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Hide separator' detail={<Stepper defaultValue={3} showSeparator={false} />} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='String buttons' detail={<Stepper defaultValue={5} subButton='<' addButton='>' />} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Element buttons(View-Text)' detail={
          <Stepper
            style={{borderWidth: 0}}
            value={this.state.valueCustom}
            valueStyle={{color: '#8a6d3b'}}
            min={0}
            max={100}
            subButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>－</Text>
              </View>
            }
            addButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>＋</Text>
              </View>
            }
            showSeparator={false}
            onChange={v => this.setState({valueCustom: v})}
            />
        } topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='OnChange callback' detail={
          <Stepper
            value={this.state.valueCallback}
            min={-10}
            max={10}
            onChange={v => {
              this.setState({valueCallback: v});
              alert(`Value changed to: ${v}`);
            }}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
