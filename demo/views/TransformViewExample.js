// TransformViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, TransformView, ListRow, Label, Toast} from 'teaset';

export default class TransformViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: ' TransformView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      magnetic: true,
      tension: true,
      containerStyle: null,
      transformInfo: 'x: 0, y: 0, scale: 1',
      eventLogs: [],
    });
  }

  showToast(message, duration = 1500) {
    Toast.message(message, {position: 'top', duration});
  }

  appendEventLog(eventName, detail = '') {
    const now = new Date();
    const pad = value => value.toString().padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const entry = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      event: eventName,
      detail,
    };
    this.setState(prevState => {
      const nextLogs = [entry].concat(prevState.eventLogs || []).slice(0, 50);
      return {eventLogs: nextLogs};
    });
  }

  renderPage() {
    let {magnetic, tension, containerStyle, transformInfo} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <TransformView
          style={{backgroundColor: Theme.pageColor, height: 350}}
          containerStyle={containerStyle}
          minScale={0.5}
          maxScale={2.5}
          magnetic={magnetic}
          tension={tension}
          onWillTransform={(translateX, translateY, scale) => {
            console.log('onWillTransform', translateX, translateY, scale);
            const info = `Transform 开始: x=${translateX.toFixed(0)}, y=${translateY.toFixed(0)}, scale=${scale.toFixed(2)}`;
            this.appendEventLog('onWillTransform', info);
            this.showToast('Transform 开始', 1000);
          }}
          onTransforming={(translateX, translateY, scale) => {
            this.setState({
              transformInfo: `x: ${translateX.toFixed(0)}, y: ${translateY.toFixed(0)}, scale: ${scale.toFixed(2)}`
            });
          }}
          onDidTransform={(translateX, translateY, scale) => {
            console.log('onDidTransform', translateX, translateY, scale);
            const info = `Transform 结束: x=${translateX.toFixed(0)}, y=${translateY.toFixed(0)}, scale=${scale.toFixed(2)}`;
            this.appendEventLog('onDidTransform', info);
            this.showToast(`Transform 结束 (scale: ${scale.toFixed(2)})`, 1500);
          }}
          onWillMagnetic={(translateX, translateY, scale, newX, newY, newScale) => {
            console.log('onWillMagnetic', translateX, translateY, scale, newX, newY, newScale);
            const info = `磁性边框开始: (${translateX.toFixed(0)}, ${translateY.toFixed(0)}, ${scale.toFixed(2)}) → (${newX.toFixed(0)}, ${newY.toFixed(0)}, ${newScale.toFixed(2)})`;
            this.appendEventLog('onWillMagnetic', info);
            this.showToast('磁性边框效果开始', 1000);
            return true; // 允许磁性边框效果
          }}
          onDidMagnetic={(translateX, translateY, scale) => {
            console.log('onDidMagnetic', translateX, translateY, scale);
            const info = `磁性边框完成: x=${translateX.toFixed(0)}, y=${translateY.toFixed(0)}, scale=${scale.toFixed(2)}`;
            this.appendEventLog('onDidMagnetic', info);
            this.showToast('磁性边框效果完成', 1500);
          }}
          onPress={(event) => {
            console.log('onPress');
            this.appendEventLog('onPress', '单击图片');
            this.showToast('单击图片', 1000);
          }}
          onLongPress={(event) => {
            console.log('onLongPress');
            this.appendEventLog('onLongPress', '长按图片');
            this.showToast('长按图片', 1500);
          }}
        >
          <View style={containerStyle ? {borderWidth: 5, borderColor: '#ff5722', borderRadius: 10} : null}>
            <Image style={{width: 375, height: 300}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
          </View>
        </TransformView>
        <View style={{backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, position: 'absolute', top: 60, left: 10, borderRadius: 5}}>
          <Label style={{color: '#fff'}} text={transformInfo} />
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <View style={{height: 10}} />
          <ListRow
            title='magnetic (磁性边框)'
            detail={<Switch value={magnetic} onValueChange={value => this.setState({magnetic: value})} />}
            topSeparator='full'
          />
          <ListRow
            title='tension (拉拽阻力)'
            detail={<Switch value={tension} onValueChange={value => this.setState({tension: value})} />}
          />
          <ListRow
            title='containerStyle (容器样式)'
            detail={containerStyle ? 'border + borderRadius' : '默认'}
            onPress={() => this.setState({containerStyle: containerStyle ? null : {padding: 10, backgroundColor: 'rgba(255,87,34,0.1)'}})}
            bottomSeparator='full'
          />
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082'}}>
            <Label style={{fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold'}} text='回调日志 (最新在顶部，可滚动查看)' />
            <View style={{height: 200, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082'}}>
              <ScrollView nestedScrollEnabled={true} contentContainerStyle={{padding: 8}}>
                {this.state.eventLogs.length ? this.state.eventLogs.map(log => (
                  <View key={log.id} style={{marginBottom: 8}}>
                    <Label style={{fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold'}} text={`[${log.timestamp}] ${log.event}`} />
                    {log.detail ? <Label style={{fontSize: 12, color: '#795548', lineHeight: 18}} text={log.detail} /> : null}
                  </View>
                )) : (
                  <Label style={{fontSize: 12, color: '#ffb74d', lineHeight: 18}} text='暂无日志，拖动、缩放、点击图片体验回调事件' />
                )}
              </ScrollView>
            </View>
          </View>
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#f5f5f5', marginHorizontal: 10, borderRadius: 5}}>
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='说明：' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 拖动图片可触发 onWillTransform 和 onDidTransform' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 双指缩放图片可改变 scale 值' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 开启 magnetic 后，拖动到边界会自动回弹' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 单击和长按图片会触发对应事件' />
          </View>
          <View style={{height: Theme.screenInset.bottom}} />
        </View>
      </ScrollView>
    );
  }

}
