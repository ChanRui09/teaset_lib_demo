// AlbumViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StatusBar, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, AlbumView, Overlay, Button, ListRow, Label, Toast} from 'teaset';

import SelectRow from './SelectRow';

const CustomAlbumControl = ({index, total}) => (
  <View style={{position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.55)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16}}>
    <Label style={{color: '#fff', fontSize: 12}} text={`自定义控制器 ${index + 1} / ${total}`} />
  </View>
);

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
    this.controlItems = [
      {key: 'none', label: 'false（不显示控制器）'},
      {key: 'default', label: 'true（默认控制器）'},
      {key: 'custom', label: '自定义控制器'},
    ];
    this.maxScaleItems = [
      {key: '1.5', label: '1.5x', value: 1.5},
      {key: '2', label: '2.0x', value: 2},
      {key: '2.5', label: '2.5x', value: 2.5},
      {key: '3', label: '3.0x（默认）', value: 3},
      {key: '5', label: '5.0x', value: 5},
    ];
    this.spaceItems = [
      {key: '0', label: '0 px（无间隔）', value: 0},
      {key: '20', label: '20 px（默认）', value: 20},
      {key: '40', label: '40 px', value: 40},
      {key: '80', label: '80 px（大间隔）', value: 80},
    ];
    this.defaultIndexItems = this.images.map((item, idx) => ({
      key: String(idx),
      label: `${idx} （第${idx + 1}张）`,
      value: idx,
    }));
    Object.assign(this.state, {
      controlledIndex: 0,
      useControlledMode: false,
      controlKey: this.controlItems[1].key,
      maxScaleKey: this.maxScaleItems[3].key,
      spaceKey: this.spaceItems[1].key,
      defaultIndexKey: this.defaultIndexItems[0].key,
      usePresetDefaultIndex: false,
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

  getSelectedItem(items, key) {
    if (!items || !items.length) return null;
    return items.find(item => item.key === key) || items[0];
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
    let {
      useControlledMode,
      controlledIndex,
      controlKey,
      maxScaleKey,
      spaceKey,
      defaultIndexKey,
      usePresetDefaultIndex,
      showBackground,
    } = this.state;
    let maxScaleItem = this.getSelectedItem(this.maxScaleItems, maxScaleKey);
    let maxScale = maxScaleItem ? maxScaleItem.value : 3;
    let spaceItem = this.getSelectedItem(this.spaceItems, spaceKey);
    let space = spaceItem ? spaceItem.value : 20;
    let defaultIndexItem = this.getSelectedItem(this.defaultIndexItems, defaultIndexKey);
    let manualDefaultIndex = defaultIndexItem ? defaultIndexItem.value : 0;
    let controlProp = false;
    if (controlKey === 'default') controlProp = true;
    else if (controlKey === 'custom') controlProp = <CustomAlbumControl />;
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
            control={controlProp}
            images={this.images}
            thumbs={this.thumbs}
            defaultIndex={useControlledMode ? undefined : (usePresetDefaultIndex ? manualDefaultIndex : index)}
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
    let {
      useControlledMode,
      controlledIndex,
      controlKey,
      maxScaleKey,
      spaceKey,
      defaultIndexKey,
      usePresetDefaultIndex,
      showBackground,
      eventLogs,
    } = this.state;
    let selectedControl = this.getSelectedItem(this.controlItems, controlKey);
    let selectedMaxScale = this.getSelectedItem(this.maxScaleItems, maxScaleKey);
    let selectedSpace = this.getSelectedItem(this.spaceItems, spaceKey);
    let selectedDefaultIndex = this.getSelectedItem(this.defaultIndexItems, defaultIndexKey);
    let controlDesc = selectedControl ? selectedControl.label : 'false';
    let maxScaleDesc = selectedMaxScale ? selectedMaxScale.label : '';
    let spaceDesc = selectedSpace ? selectedSpace.label : '';
    let defaultIndexDesc = usePresetDefaultIndex
      ? (selectedDefaultIndex ? selectedDefaultIndex.label : '0')
      : '使用点击缩略图索引';
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
            <SelectRow
              title='index （受控当前索引）'
              value={String(controlledIndex)}
              items={this.defaultIndexItems}
              getItemValue={item => item.key}
              getItemText={item => item.label}
              onSelected={item => this.setState({controlledIndex: item.value})}
            />
          )}
          <SelectRow
            title='control (控制器)'
            value={controlKey}
            items={this.controlItems}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({controlKey: item.key})}
          />
          <SelectRow
            title='maxScale (最大缩放)'
            value={maxScaleKey}
            items={this.maxScaleItems}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({maxScaleKey: item.key})}
          />
          <SelectRow
            title='space (图片间隔)'
            value={spaceKey}
            items={this.spaceItems}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({spaceKey: item.key})}
          />
          <ListRow
            title='defaultIndex (开启默认索引)'
            detail={<Switch value={usePresetDefaultIndex} onValueChange={value => this.setState({usePresetDefaultIndex: value})} />}
          />
          <SelectRow
            title='默认索引值'
            value={defaultIndexKey}
            items={this.defaultIndexItems}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => {
              if (useControlledMode || !usePresetDefaultIndex) return;
              this.setState({defaultIndexKey: item.key});
            }}
          />
          <ListRow
            title='背景色 (显示间隔效果)'
            detail={<Switch value={showBackground} onValueChange={value => this.setState({showBackground: value})} />}
            bottomSeparator='full'
          />
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#e3f2fd', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#bbdefb'}}>
            <Label style={{fontSize: 12, color: '#1565c0', lineHeight: 18, fontWeight: 'bold'}} text='AlbumView Props 列表（当前配置）' />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text='• images: 图片数据数组（已内置 5 张示例）' />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text='• thumbs: 缩略图数组（与 images 对应）' />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text={`• defaultIndex: ${defaultIndexDesc}`} />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text={`• index: ${useControlledMode ? `受控模式，当前 ${controlledIndex}` : '未开启受控模式（index 未传入）'}`} />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text={`• maxScale: ${maxScaleDesc || '自定义最大缩放'}`} />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text={`• space: ${spaceDesc}`} />
            <Label style={{fontSize: 12, color: '#1a237e', lineHeight: 18}} text={`• control: ${controlDesc}`} />
          </View>
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
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 最后一张图片使用无效链接，可触发 onLoadImageFailure 回调' />
            <Label style={{fontSize: 12, color: '#ff6b6b', lineHeight: 18, fontWeight: 'bold'}} text='• 打开图片时会自动预加载相邻图片' />
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