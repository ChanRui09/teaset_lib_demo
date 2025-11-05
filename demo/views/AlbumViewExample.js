// AlbumViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StatusBar, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, AlbumView, Overlay, Button, ListRow, Label, Toast} from 'teaset';

export default class AlbumViewExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: ' AlbumView',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.images = [
      require('../images/teaset1.jpg'),
      require('../images/teaset2.jpg'),
      require('../images/teaset3.jpg'),
      require('../images/faircup.jpg'),
      {uri: 'https://invalid.teaset.dev/missing-album-image.jpg'},
    ];
    this.thumbs = [
      require('../images/teaset1_s.jpg'),
      require('../images/teaset2_s.jpg'),
      require('../images/teaset3_s.jpg'),
      require('../images/faircup_s.jpg'),
      require('../images/teaset1_s.jpg'),
    ];
    this.imageRefs = {};
    Object.assign(this.state, {
      controlledIndex: 0,
      useControlledMode: false,
      maxScale: 3,
      space: 20,
      showBackground: false,
      loadInfo: '',
      eventLogs: [],
    });
  }

  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
    if (this.toastKey) {
      Toast.hide(this.toastKey);
      this.toastKey = null;
    }
  }

  showToast(message, duration = 1500) {
    this.toastKey = Toast.message(message, {position: 'top', duration});
  }

  appendEventLog(eventName, detail = '', extraState = {}) {
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
      return Object.assign({}, extraState, {eventLogs: nextLogs});
    });
  }

  onImagePress(index) {
    let {useControlledMode, controlledIndex, maxScale, space, showBackground} = this.state;
    let pressView = this.imageRefs['it' + index];
    pressView.measure((x, y, width, height, pageX, pageY) => {
      let overlayView = (
        <Overlay.PopView
          style={{}}
          containerStyle={{flex: 1, backgroundColor: showBackground ? '#2c3e50' : '#000'}}
          overlayOpacity={1}
          type='custom'
          customBounds={{x: pageX, y: pageY, width, height}}
          ref={v => this.fullImageView = v}
        >
          <AlbumView
            style={{flex: 1}}
            control={true}
            images={this.images}
            thumbs={this.thumbs}
            defaultIndex={useControlledMode ? undefined : index}
            index={useControlledMode ? controlledIndex : undefined}
            maxScale={maxScale}
            space={space}
            onWillChange={(currentIndex, newIndex) => {
              console.log('onWillChange', currentIndex, newIndex);
              const info = `即将从图片${currentIndex + 1}切换到图片${newIndex + 1}`;
              this.appendEventLog('onWillChange', info, {loadInfo: info});
              this.showToast(info);
            }}
            onChange={(currentIndex, oldIndex) => {
              console.log('onChange', currentIndex, oldIndex);
              const info = `已切换：图片${oldIndex + 1} → 图片${currentIndex + 1}`;
              const extraState = {loadInfo: info};
              if (useControlledMode) {
                extraState.controlledIndex = currentIndex;
              }
              this.appendEventLog('onChange', info, extraState);
              this.showToast(info, 1800);
            }}
            onPress={(currentIndex) => {
              const info = `轻触关闭：图片${currentIndex + 1}`;
              this.appendEventLog('onPress', info);
              this.showToast(info, 1200);
              setTimeout(() => this.fullImageView && this.fullImageView.close(), 300);
            }}
            onLongPress={(currentIndex, event) => {
              const info = `长按图片 ${currentIndex + 1}`;
              this.appendEventLog('onLongPress', info);
              this.showToast(info, 1800);
            }}
            onWillLoadImage={(currentIndex) => {
              console.log('onWillLoadImage', currentIndex);
              const info = `正在加载图片 ${currentIndex + 1}...`;
              this.appendEventLog('onWillLoadImage', info, {loadInfo: info});
              this.showToast(info, 1200);
            }}
            onLoadImageSuccess={(currentIndex, width, height) => {
              console.log('onLoadImageSuccess', currentIndex, width, height);
              const info = `图片${currentIndex + 1}加载成功 (${width}x${height})`;
              this.appendEventLog('onLoadImageSuccess', info, {loadInfo: info});
              this.showToast(info, 2000);
            }}
            onLoadImageFailure={(currentIndex, error) => {
              console.error('onLoadImageFailure', currentIndex, error);
              const errorMessage = error && error.message ? error.message : 'Unknown error';
              const info = `图片${currentIndex + 1}加载失败 (${errorMessage})`;
              this.appendEventLog('onLoadImageFailure', info, {loadInfo: info});
              this.showToast(info, 2500);
            }}
            />
          <StatusBar animated={false} hidden={true} />
        </Overlay.PopView>
      );
      this.overlayKey = Overlay.show(overlayView);
    });

  }

  renderPage() {
    let {useControlledMode, controlledIndex, maxScale, space, showBackground, eventLogs} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{height: 10}} />
          <ListRow
            title='index (受控模式)'
            detail={<Switch value={useControlledMode} onValueChange={value => this.setState({useControlledMode: value})} />}
            topSeparator='full'
          />
          {useControlledMode && (
            <ListRow
              title='当前索引'
              detail={controlledIndex.toString()}
              accessory='none'
            />
          )}
          <ListRow
            title='maxScale (最大缩放)'
            detail={maxScale.toString()}
            onPress={() => this.setState({maxScale: maxScale === 3 ? 5 : 3})}
          />
          <ListRow
            title='space (图片间隔)'
            detail={`${space}px ${space === 80 ? '(大间隔)' : space === 20 ? '(默认)' : ''}`}
            onPress={() => this.setState({space: space === 20 ? 80 : 20})}
          />
          <ListRow
            title='背景色 (显示间隔效果)'
            detail={<Switch value={showBackground} onValueChange={value => this.setState({showBackground: value})} />}
            bottomSeparator='full'
          />
          <View style={{height: 10}} />
          <ListRow
            title='打开加载失败示例'
            detail='最后一张图'
            onPress={() => this.onImagePress(this.images.length - 1)}
            accessory='indicator'
            bottomSeparator='full'
          />
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#f5f5f5', marginHorizontal: 10, borderRadius: 5}}>
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='说明：' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• space 是图片左右切换时的间隔距离' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 开启背景色后，拖动切换时可看到深色背景露出的间隔' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 设置大间隔(80px)后效果更明显' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 最后一张图片使用无效链接，可触发 onLoadImageFailure 回调' />
            <Label style={{fontSize: 12, color: '#ff6b6b', lineHeight: 18, fontWeight: 'bold'}} text='• 打开图片时会自动预加载相邻图片，提升浏览流畅度' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='  例如打开第1张图，会同时加载第2张' />
          </View>
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#fff8e1', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ffe082'}}>
            <Label style={{fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold'}} text='回调日志 (最新在顶部，可滚动查看)' />
            <View style={{height: 180, marginTop: 8, backgroundColor: '#fffdf3', borderRadius: 4, borderWidth: 1, borderColor: '#ffe082'}}>
              <ScrollView nestedScrollEnabled={true} contentContainerStyle={{padding: 8}}>
                {eventLogs.length ? eventLogs.map(log => (
                  <View key={log.id} style={{marginBottom: 8}}>
                    <Label style={{fontSize: 12, color: '#ff8f00', lineHeight: 18, fontWeight: 'bold'}} text={`[${log.timestamp}] ${log.event}`} />
                    {log.detail ? <Label style={{fontSize: 12, color: '#795548', lineHeight: 18}} text={log.detail} /> : null}
                  </View>
                )) : (
                  <Label style={{fontSize: 12, color: '#ffb74d', lineHeight: 18}} text='暂无日志，点击缩略图体验回调事件' />
                )}
              </ScrollView>
            </View>
          </View>
          <View style={{height: 20}} />
          <View style={{padding: 20, flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start'}}>
            {this.thumbs.map((item, index) => (
              <View style={{width: 100, height: 100, padding: 10}} key={index}>
                <TouchableOpacity style={{flex: 1}} ref={ref => this.imageRefs['it' + index] = ref} onPress={() => this.onImagePress(index)}>
                  <Image style={{width: null, height: null, flex: 1}} source={item} resizeMode='cover' />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
/*
      {uri: 'https://b-ssl.duitang.com/uploads/item/201207/23/20120723200549_ZhRre.thumb.700_0.jpeg'},
      {uri: 'https://b-ssl.duitang.com/uploads/item/201207/23/20120723200511_8ihrP.thumb.700_0.jpeg'},
      {uri: 'https://b-ssl.duitang.com/uploads/item/201207/23/20120723200118_acfUi.thumb.700_0.jpeg'},
      {uri: 'http://img.warting.com/allimg/2017/0308/exsaicsvc5w-92.jpg'},
      {uri: 'http://img.warting.com/allimg/2017/0308/o4ovnsq2uqj-96.jpg'},

import AlbumSheet from 'teaset/components/AlbumView/AlbumSheet';

        <View style={{flexDirection:'row', flex: 1}}>
          <View style={{width: 100}} />
          <AlbumSheet
            style={{backgroundColor: '#faa', flex: 1}}
            image={require('../images/teaset1.jpg')}
            ref='albumSheet'
            />
        </View>
        <View style={{flexDirection:'row'}}>
          <Button title='left' onPress={() => this.refs.albumSheet.scrollTo('left')} />
          <Button title='center' onPress={() => this.refs.albumSheet.scrollTo('center')} />
          <Button title='right' onPress={() => this.refs.albumSheet.scrollTo('right')} />
        </View>

*/