// ToastExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator, Switch} from 'react-native';

import {NavigationPage, ListRow, Toast, Theme, Label} from 'teaset';

export default class ToastExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Toast',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      testPosition: 'center',
      testDuration: 'short',
      defaultPosition: Toast.defaultPosition || 'center',
      defaultDuration: Toast.defaultDuration || 'short',
    });
  }

  componentWillUnmount() {
    this.hideCustom();
  }

  showModal() {
    ToastExample.toastKey = Toast.show({
      text: 'Toast modal',
      icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
      position: 'center',
      duration: 5000,
      overlayOpacity: 0.4,
      modal: true,
    });
  }

  static toastKey = null;

  showCustom() {
    if (ToastExample.toastKey) return;
    ToastExample.toastKey = Toast.show({
      text: 'Toast custom',
      icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
      position: 'top',
      duration: 1000000,
    });
  }

  hideCustom() {
    if (!ToastExample.toastKey) return;
    Toast.hide(ToastExample.toastKey);
    ToastExample.toastKey = null;
  }

  cycleDefaultPosition() {
    const order = ['center', 'top', 'bottom'];
    const currentIndex = order.indexOf(this.state.defaultPosition);
    const nextValue = order[(currentIndex + 1) % order.length];
    Toast.defaultPosition = nextValue;
    this.setState({defaultPosition: nextValue}, () => {
      ToastExample.toastKey = Toast.info(`defaultPosition → ${nextValue}`);
    });
  }

  cycleDefaultDuration() {
    const order = ['short', 'long'];
    const currentIndex = order.indexOf(this.state.defaultDuration);
    const nextValue = order[(currentIndex + 1) % order.length];
    Toast.defaultDuration = nextValue;
    this.setState({defaultDuration: nextValue}, () => {
      ToastExample.toastKey = Toast.info(`defaultDuration → ${nextValue}`);
    });
  }

  showSuccessWithDefaults() {
    const {defaultPosition, defaultDuration} = this.state;
    ToastExample.toastKey = Toast.success(`默认值 position=${defaultPosition} duration=${defaultDuration}`);
  }

  showSuccessWithPosition(position) {
    ToastExample.toastKey = Toast.success(`覆盖 position=${position}`, undefined, position);
  }

  showSuccessWithDuration(duration) {
    ToastExample.toastKey = Toast.success(`覆盖 duration=${duration}`, duration);
  }

  showMessageWithPosition(position) {
    ToastExample.toastKey = Toast.message(`Toast.message position=${position}`, undefined, position);
  }

  showMessageWithDuration(duration) {
    ToastExample.toastKey = Toast.message(`Toast.message duration=${duration}`, duration);
  }

  showPositionTest() {
    let {testPosition} = this.state;
    ToastExample.toastKey = Toast.success(`位置: ${testPosition}`, 'short', testPosition);
  }

  showDurationTest() {
    let {testDuration} = this.state;
    ToastExample.toastKey = Toast.info(`显示时长: ${testDuration}`, testDuration, 'center');
  }

  showOverlayOpacityTest(opacity) {
    ToastExample.toastKey = Toast.show({
      text: `背景透明度: ${opacity}`,
      icon: 'info',
      position: 'center',
      duration: 3000,
      overlayOpacity: opacity,
      modal: opacity > 0,
    });
  }

  renderPage() {
    let {testPosition, testDuration, defaultPosition, defaultDuration} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <View style={{marginHorizontal: 12, padding: 12, backgroundColor: '#f1f8ff', borderRadius: 8, borderWidth: 1, borderColor: '#90caf9'}}>
          <Label style={{fontSize: 12, color: '#0d47a1', fontWeight: 'bold'}} text='属性对比说明' />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 6}} text='• position：单次调用时指定显示位置 (top/center/bottom)' />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 2}} text='• defaultPosition：success/fail 等静态方法的默认位置' />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 2}} text='• defaultDuration：success/fail 等静态方法的默认停留时长' />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 2}} text='• duration：单次调用时的停留时长 (short=2000ms / long=3500ms)' />
        </View>
        <View style={{height: 16}} />
        <ListRow
          title='切换 defaultPosition'
          detail={`${defaultPosition} (点击切换)`}
          onPress={() => this.cycleDefaultPosition()}
          topSeparator='full'
        />
        <ListRow
          title='切换 defaultDuration'
          detail={`${defaultDuration} (点击切换)`}
          onPress={() => this.cycleDefaultDuration()}
          bottomSeparator='full'
        />
        <View style={{height: 20}} />
        <ListRow
          title='Success (使用默认位置/时长)'
          detail={`position=${defaultPosition} · duration=${defaultDuration}`}
          onPress={() => this.showSuccessWithDefaults()}
          topSeparator='full'
        />
        <ListRow title='Success (position=top)' onPress={() => this.showSuccessWithPosition('top')} />
        <ListRow title='Success (position=center)' onPress={() => this.showSuccessWithPosition('center')} />
        <ListRow title='Success (position=bottom)' onPress={() => this.showSuccessWithPosition('bottom')} />
        <ListRow title='Success (duration=short)' onPress={() => this.showSuccessWithDuration('short')} />
        <ListRow title='Success (duration=long)' onPress={() => this.showSuccessWithDuration('long')} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='Message (position=top)'
          onPress={() => this.showMessageWithPosition('top')}
          topSeparator='full'
        />
        <ListRow title='Message (position=center)' onPress={() => this.showMessageWithPosition('center')} />
        <ListRow title='Message (position=bottom)' onPress={() => this.showMessageWithPosition('bottom')} />
        <ListRow title='Message (duration=short)' onPress={() => this.showMessageWithDuration('short')} />
        <ListRow title='Message (duration=long)' onPress={() => this.showMessageWithDuration('long')} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Message' onPress={() => ToastExample.toastKey = Toast.message('Toast message')} topSeparator='full' />
        <ListRow title='Success' onPress={() => ToastExample.toastKey = Toast.success('Toast success')} />
        <ListRow title='Fail' onPress={() => ToastExample.toastKey = Toast.fail('Toast fail')} />
        <ListRow title='Smile' onPress={() => ToastExample.toastKey = Toast.smile('Toast smile')} />
        <ListRow title='Sad' onPress={() => ToastExample.toastKey = Toast.sad('Toast sad')} />
        <ListRow title='Info' onPress={() => ToastExample.toastKey = Toast.info('Toast info')} />
        <ListRow title='Stop' onPress={() => ToastExample.toastKey = Toast.stop('Toast stop')} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Modal' onPress={() => this.showModal()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow
          title='position (显示位置)'
          titlePlace='top'
          detail={
            <View style={{paddingTop: 8}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8}}>
                <Label 
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 5,
                    backgroundColor: testPosition === 'top' ? '#4caf50' : '#e0e0e0',
                    color: testPosition === 'top' ? '#fff' : '#666',
                  }}
                  text='top'
                  onPress={() => this.setState({testPosition: 'top'})}
                />
                <Label 
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 5,
                    backgroundColor: testPosition === 'center' ? '#4caf50' : '#e0e0e0',
                    color: testPosition === 'center' ? '#fff' : '#666',
                  }}
                  text='center'
                  onPress={() => this.setState({testPosition: 'center'})}
                />
                <Label 
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 5,
                    backgroundColor: testPosition === 'bottom' ? '#4caf50' : '#e0e0e0',
                    color: testPosition === 'bottom' ? '#fff' : '#666',
                  }}
                  text='bottom'
                  onPress={() => this.setState({testPosition: 'bottom'})}
                />
              </View>
              <ListRow 
                title={`测试 position: ${testPosition}`}
                onPress={() => this.showPositionTest()}
                topSeparator='full'
              />
            </View>
          }
          topSeparator='full'
          bottomSeparator='full'
        />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#e3f2fd', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#1976d2', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• position: 控制 Toast 显示位置 (top/center/bottom)' />
        </View>
        <View style={{height: 20}} />
        <ListRow
          title='duration (显示时长)'
          titlePlace='top'
          detail={
            <View style={{paddingTop: 8}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8}}>
                <Label 
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 5,
                    backgroundColor: testDuration === 'short' ? '#ff9800' : '#e0e0e0',
                    color: testDuration === 'short' ? '#fff' : '#666',
                  }}
                  text='short (2s)'
                  onPress={() => this.setState({testDuration: 'short'})}
                />
                <Label 
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 5,
                    backgroundColor: testDuration === 'long' ? '#ff9800' : '#e0e0e0',
                    color: testDuration === 'long' ? '#fff' : '#666',
                  }}
                  text='long (3.5s)'
                  onPress={() => this.setState({testDuration: 'long'})}
                />
              </View>
              <ListRow 
                title={`测试 duration: ${testDuration}`}
                onPress={() => this.showDurationTest()}
                topSeparator='full'
              />
            </View>
          }
          topSeparator='full'
          bottomSeparator='full'
        />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#fff3e0', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#e65100', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• duration: 控制 Toast 显示时长' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• short: 2000 毫秒 (2秒)' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• long: 3500 毫秒 (3.5秒)' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='overlayOpacity: 0' onPress={() => this.showOverlayOpacityTest(0)} topSeparator='full' />
        <ListRow title='overlayOpacity: 0.2' onPress={() => this.showOverlayOpacityTest(0.2)} />
        <ListRow title='overlayOpacity: 0.4' onPress={() => this.showOverlayOpacityTest(0.4)} />
        <ListRow title='overlayOpacity: 0.6' onPress={() => this.showOverlayOpacityTest(0.6)} bottomSeparator='full' />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#f3e5f5', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#6a1b9a', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• overlayOpacity: 背景蒙层透明度 (0-1)' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 值越大背景越暗，0 为完全透明' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='Show custom' onPress={() => this.showCustom()} topSeparator='full' />
        <ListRow title='Hide custom' onPress={() => this.hideCustom()} bottomSeparator='full' />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
