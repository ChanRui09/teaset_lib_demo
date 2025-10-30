// TransformViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, TransformView, ListRow, Label} from 'teaset';

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
    });
  }

  renderPage() {
    let {magnetic, tension, containerStyle, transformInfo} = this.state;
    return (
      <View style={{flex: 1}}>
        <TransformView
          style={{backgroundColor: Theme.pageColor, flex: 1}}
          containerStyle={containerStyle}
          minScale={0.5}
          maxScale={2.5}
          magnetic={magnetic}
          tension={tension}
          onWillTransform={(translateX, translateY, scale) => {
            console.log('onWillTransform', translateX, translateY, scale);
          }}
          onTransforming={(translateX, translateY, scale) => {
            this.setState({
              transformInfo: `x: ${translateX.toFixed(0)}, y: ${translateY.toFixed(0)}, scale: ${scale.toFixed(2)}`
            });
          }}
          onDidTransform={(translateX, translateY, scale) => {
            console.log('onDidTransform', translateX, translateY, scale);
            alert(`Transform结束\nx: ${translateX.toFixed(0)}\ny: ${translateY.toFixed(0)}\nscale: ${scale.toFixed(2)}`);
          }}
          onWillMagnetic={(translateX, translateY, scale, newX, newY, newScale) => {
            console.log('onWillMagnetic', translateX, translateY, scale, newX, newY, newScale);
            return true; // 允许磁性边框效果
          }}
          onDidMagnetic={(translateX, translateY, scale) => {
            console.log('onDidMagnetic', translateX, translateY, scale);
            alert(`磁性边框效果完成\nx: ${translateX.toFixed(0)}\ny: ${translateY.toFixed(0)}\nscale: ${scale.toFixed(2)}`);
          }}
          onPress={(event) => {
            alert('单击图片');
          }}
          onLongPress={(event) => {
            alert('长按图片');
          }}
        >
          <View style={containerStyle ? {borderWidth: 5, borderColor: '#ff5722', borderRadius: 10} : null}>
            <Image style={{width: 375, height: 300}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
          </View>
        </TransformView>
        <View style={{backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, position: 'absolute', top: 60, left: 10, borderRadius: 5}}>
          <Label style={{color: '#fff'}} text={transformInfo} />
        </View>
        <ScrollView style={{backgroundColor: '#fff'}}>
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
        </ScrollView>
      </View>
    );
  }

}
