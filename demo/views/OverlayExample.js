// OverlayExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Switch, TextInput} from 'react-native';

import {Theme, NavigationPage, ListRow, Overlay, Label, Button, Checkbox, Toast} from 'teaset';

export default class OverlayExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Overlay',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    // Checkbox refs (not used but defined for completeness)
    this.blackRef = React.createRef();
    this.shadowRef = React.createRef();
    this.showArrowRef = React.createRef();
    // Button refs for popover positioning
    this.downstartRef = React.createRef();
    this.downcenterRef = React.createRef();
    this.downendRef = React.createRef();
    this.rightstartRef = React.createRef();
    this.leftstartRef = React.createRef();
    this.rightcenterRef = React.createRef();
    this.leftcenterRef = React.createRef();
    this.rightendRef = React.createRef();
    this.leftendRef = React.createRef();
    this.upstartRef = React.createRef();
    this.upcenterRef = React.createRef();
    this.upendRef = React.createRef();
    // autoDirection demo refs
    this.leftEdgeRef = React.createRef();
    this.rightEdgeRef = React.createRef();
    Object.assign(this.state, {
      black: true,
      shadow: false,
      showArrow: true,
      useAutoKeyboard: false,
      useContainerStyle: false,
      useAutoDirection: true,
      useAlignInsets: false,
      usePaddingCorner: false,
      lastEvent: '',
      lastDetail: '',
    });
  }

  logOverlayEvent(event, detail = '', duration = 1600) {
    const message = detail ? `${event}: ${detail}` : event;
    console.log(`[OverlayExample] ${message}`);
    this.setState({lastEvent: event, lastDetail: detail});
    Toast.message(message, {position: 'top', duration});
  }

  showViewCallbacks() {
    const overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center'}}
        modal={false}
        overlayOpacity={0.35}
        animated={true}
        onAppearCompleted={() => this.logOverlayEvent('Overlay.View onAppearCompleted', '浮层已显示')}
        onDisappearCompleted={() => this.logOverlayEvent('Overlay.View onDisappearCompleted', '浮层已隐藏')}
        onCloseRequest={overlay => {
          this.logOverlayEvent('Overlay.View onCloseRequest', '点击半透明区域关闭');
          overlay && overlay.close();
          return true;
        }}
        ref={v => this.overlayViewCallbacksRef = v}
      >
        <View style={{backgroundColor: '#fff', padding: 30, borderRadius: 12, alignItems: 'center'}}>
          <Label type='title' size='lg' text='Overlay.View 回调示例' />
          <View style={{height: 12}} />
          <Label style={{color: '#666', textAlign: 'center'}} text='点击周围半透明区域或使用下方按钮观察回调触发顺序' />
          <View style={{height: 18}} />
          <Button
            title='Close (手动触发关闭)'
            onPress={() => {
              this.logOverlayEvent('Overlay.View 手动关闭', '点击按钮关闭');
              this.overlayViewCallbacksRef && this.overlayViewCallbacksRef.close();
            }}
          />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showDefault(transparent, modal, text) {
    let overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center'}}
        modal={modal}
        overlayOpacity={transparent ? 0 : null}
        ref={v => this.overlayView = v}
        >
        <View style={{backgroundColor: transparent ? '#333' : Theme.defaultColor, padding: 40, borderRadius: 15, alignItems: 'center'}}>
          <Label type='danger' size='xl' text={text} />
          {modal ? <View style={{height: 20}} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayView && this.overlayView.close()} /> : null}
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showPop(type, modal, text) {
    let {useContainerStyle} = this.state;
    let containerStyle = useContainerStyle ? {
      borderWidth: 3,
      borderColor: '#ff9800',
      borderRadius: 20,
    } : null;
    
    let overlayView = (
      <Overlay.PopView
        style={{alignItems: 'center', justifyContent: 'center'}}
        type={type}
        modal={modal}
        containerStyle={containerStyle}
        ref={v => this.overlayPopView = v}
        >
        <View style={{backgroundColor: Theme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Label type='title' size='xl' text={text} />
          {modal ? <View style={{height: 60}} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  }

  showPopCustom(imageSource, fromView, animated = true) {
    if (!fromView) return;
    fromView.measure((x, y, width, height, pageX, pageY) => {
      const bounds = {x: pageX, y: pageY, width, height};
      const overlayView = (
        <Overlay.PopView
          style={{alignItems: 'center', justifyContent: 'center'}}
          overlayOpacity={1}
          type='custom'
          customBounds={bounds}
          animated={animated}
          onAppearCompleted={() => this.logOverlayEvent('PopView onAppearCompleted', animated ? 'customBounds 动画完成' : 'animated=false 无动画')}
          onDisappearCompleted={() => this.logOverlayEvent('PopView onDisappearCompleted', '弹窗已隐藏')}
          ref={v => this.customPopView = v}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.logOverlayEvent('PopView onPress 内容', '点击图片关闭');
              this.customPopView && this.customPopView.close();
            }}
          >
            <Image source={imageSource} resizeMode='cover' />
          </TouchableWithoutFeedback>
        </Overlay.PopView>
      );
      this.logOverlayEvent('PopView customBounds', `from (${Math.round(pageX)}, ${Math.round(pageY)}) size ${Math.round(width)}x${Math.round(height)}，animated=${animated}`);
      Overlay.show(overlayView);
    });
  }

  showPull(side, modal, text, rootTransform) {
    let overlayView = (
      <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
        <View style={{backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
          <Label type='title' size='xl' text={text} />
          {modal ? <View style={{height: 60}} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayPullView && this.overlayPullView.close()} /> : null}
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  showPullAdvanced() {
    const overlayView = (
      <Overlay.PullView
        side='left'
        modal={false}
        containerStyle={{backgroundColor: '#fff3e0', paddingVertical: 30}}
        rootTransform='translate'
        animated={true}
        onAppearCompleted={() => this.logOverlayEvent('PullView onAppearCompleted', 'side=left, rootTransform=translate')}
        onDisappearCompleted={() => this.logOverlayEvent('PullView onDisappearCompleted', '抽屉已收起')}
        onCloseRequest={overlay => {
          this.logOverlayEvent('PullView onCloseRequest', '点击背景关闭');
          overlay && overlay.close();
          return true;
        }}
        ref={v => this.pullAdvancedRef = v}
      >
        <View style={{paddingHorizontal: 24}}>
          <Label type='title' size='lg' text='高级 PullView 示范' />
          <View style={{height: 12}} />
          <Label style={{color: '#555'}} text='• side: left' />
          <Label style={{color: '#555'}} text='• containerStyle: 自定义背景 + padding' />
          <Label style={{color: '#555'}} text='• rootTransform: translate' />
          <Label style={{color: '#555'}} text='• animated: true (默认动画)' />
          <View style={{height: 18}} />
          <Button
            title='关闭抽屉'
            onPress={() => {
              this.logOverlayEvent('PullView 手动关闭', '点击按钮关闭');
              this.pullAdvancedRef && this.pullAdvancedRef.close();
            }}
          />
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  showPopover(view, direction, align) {
    let {black, shadow, showArrow, useAutoDirection, useAlignInsets, usePaddingCorner} = this.state;
    let blackStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 12,
      paddingRight: 12,
    };
    let whiteStyle = {
      ...blackStyle,
      backgroundColor: '#fff',
    };
    let shadowStyle = {
      shadowColor: '#777',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    };
    let popoverStyle = [].concat(black ? blackStyle : whiteStyle).concat(shadow ? shadowStyle : null);

    view.measure((x, y, width, height, pageX, pageY) => {
      let fromBounds = {x: pageX, y: pageY, width, height};
      let overlayView = (
        <Overlay.PopoverView 
          popoverStyle={popoverStyle} 
          fromBounds={fromBounds} 
          direction={direction} 
          align={align} 
          directionInsets={4} 
          showArrow={showArrow}
          autoDirection={useAutoDirection}
          alignInsets={useAlignInsets ? 20 : 0}
          paddingCorner={usePaddingCorner ? 20 : undefined}
        >
          <Label style={{color: black ? '#fff' : '#000'}} size='lg' text={direction + ' ' + align} />
        </Overlay.PopoverView>
      );
      Overlay.show(overlayView);
    });
  }

  showMulti() {
    let overlayView = (
      <Overlay.PullView modal={false}>
        <View style={{backgroundColor: Theme.defaultColor, minWidth: 200, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
          <Label type='title' size='xl' text='Overlay' />
          <View style={{height: 60}} />
          <Button title='New overlay' onPress={() => this.showDefault(false, true, 'New overlay')} />
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  showAutoKeyboard() {
    let {useAutoKeyboard} = this.state;
    let overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center'}}
        modal={true}
        autoKeyboardInsets={useAutoKeyboard}
        ref={v => this.keyboardOverlay = v}
        >
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300}}>
          <Label type='title' size='lg' text={useAutoKeyboard ? 'autoKeyboardInsets: true' : 'autoKeyboardInsets: false'} />
          <View style={{height: 10}} />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text={useAutoKeyboard ? '点击输入框弹出键盘时，浮层会自动上移避开键盘' : '点击输入框弹出键盘时，浮层不会移动'} />
          <View style={{height: 15}} />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
              paddingHorizontal: 10,
              backgroundColor: '#f5f5f5',
            }}
            placeholder='点击此处输入...'
            />
          <View style={{height: 15}} />
          <Button title='关闭' onPress={() => this.keyboardOverlay && this.keyboardOverlay.close()} />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showAutoDirectionDemo(view, requestedDirection) {
    let {useAutoDirection} = this.state;
    let popoverStyle = {
      backgroundColor: useAutoDirection ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      minWidth: 150,
    };

    view.measure((x, y, width, height, pageX, pageY) => {
      let fromBounds = {x: pageX, y: pageY, width, height};
      let overlayView = (
        <Overlay.PopoverView 
          popoverStyle={popoverStyle} 
          fromBounds={fromBounds} 
          direction={requestedDirection} 
          align='center' 
          directionInsets={8} 
          showArrow={true}
          autoDirection={useAutoDirection}
        >
          <Label style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}} text={useAutoDirection ? 'autoDirection: ON' : 'autoDirection: OFF'} />
          <Label style={{color: '#fff', fontSize: 12, marginTop: 4}} text={`请求方向: ${requestedDirection}`} />
          <Label style={{color: '#fff', fontSize: 12}} text={useAutoDirection ? '空间不足时会自动反向' : '强制按请求方向显示'} />
        </Overlay.PopoverView>
      );
      Overlay.show(overlayView);
    });
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    let {useAutoDirection, lastEvent, lastDetail} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <View style={{marginHorizontal: 12, padding: 10, borderRadius: 8, backgroundColor: '#f1f8ff', borderWidth: 1, borderColor: '#90caf9'}}>
          <Label style={{fontSize: 12, color: '#0d47a1', fontWeight: 'bold'}} text='最新覆盖层事件' />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 4}} text={lastEvent ? `事件：${lastEvent}` : '事件：暂无'} />
          <Label style={{fontSize: 12, color: '#0d47a1', marginTop: 2}} text={lastDetail ? `详情：${lastDetail}` : ''} />
        </View>
        <View style={{height: 12}} />
        <ListRow title='Overlay.View 回调示例' detail='Appear/Disappear/Close' onPress={() => this.showViewCallbacks()} topSeparator='full' />
        <ListRow title='Transparent' onPress={() => this.showDefault(true, false, 'Transparent')} />
        <ListRow title='Translucent' onPress={() => this.showDefault(false, false, 'Translucent')} />
        <ListRow title='Translucent modal' onPress={() => this.showDefault(false, true, 'Translucent modal')} bottomSeparator='full' />
        <View style={{height: 10}} />
        <ListRow
          title='autoKeyboardInsets (自动避开键盘)'
          detail={<Switch value={this.state.useAutoKeyboard} onValueChange={value => this.setState({useAutoKeyboard: value})} />}
          topSeparator='full'
        />
        <ListRow 
          title='测试键盘自动缩进'
          onPress={() => this.showAutoKeyboard()}
          bottomSeparator='full'
        />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#e3f2fd', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#1976d2', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• autoKeyboardInsets: 弹出键盘时自动缩减键盘高度空间' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 开启后，输入框不会被键盘遮挡' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='Pull from bottom' onPress={() => this.showPull('bottom', false, 'Pull from bottom')} topSeparator='full' />
        <ListRow title='Pull from top' onPress={() => this.showPull('top', false, 'Pull from top')} />
        <ListRow title='Pull from left' onPress={() => this.showPull('left', false, 'Pull from left')} />
        <ListRow title='Pull from right' onPress={() => this.showPull('right', false, 'Pull from right')} />
        <ListRow title='Pull modal' onPress={() => this.showPull('bottom', true, 'Pull modal')} />
        <ListRow title='Pull and scale' onPress={() => this.showPull('bottom', false, 'Pull and scale', 'scale')} />
        <ListRow title='Pull and translate' onPress={() => this.showPull('left', false, 'Pull and translate', 'translate')} />
        <ListRow
          title='Pull advanced (side/container/rootTransform)'
          detail='left · translate'
          onPress={() => this.showPullAdvanced()}
          bottomSeparator='full'
        />
        <View style={{height: 20}} />
        <ListRow
          title='containerStyle (PopView 容器样式)'
          detail={<Switch value={this.state.useContainerStyle} onValueChange={value => this.setState({useContainerStyle: value})} />}
          topSeparator='full'
        />
        <ListRow title='Pop zoom out' onPress={() => this.showPop('zoomOut', false, 'Pop zoom out')} />
        <ListRow title='Pop zoom in' onPress={() => this.showPop('zoomIn', false, 'Pop zoom in')} />
        <ListRow title='Pop modal' onPress={() => this.showPop('zoomOut', true, 'Pop modal')} />
        <ListRow
          title='Pop customBounds (animated)'
          detail={<Image style={{width: 40, height: 40}} source={img} resizeMode='cover' ref={v => this.imgView = v} />}
          onPress={() => this.showPopCustom(img, this.imgView, true)}
        />
        <ListRow
          title='Pop customBounds (animated=false)'
          detail='无动画'
          onPress={() => this.showPopCustom(img, this.imgView, false)}
          bottomSeparator='full'
        />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#fff3e0', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#e65100', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• containerStyle: 为 PopView 弹出框添加容器样式' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 可添加边框、圆角等效果' />
        </View>
        <View style={{height: 20}} />
        <ListRow
          title='autoDirection 测试 (PopoverView)'
          titlePlace='top'
          detail={
            <View>
              <View style={{paddingTop: 16, paddingBottom: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: useAutoDirection ? '#e8f5e9' : '#ffebee', padding: 8, borderRadius: 5}}>
                  <Label style={{fontSize: 14, fontWeight: 'bold', color: useAutoDirection ? '#2e7d32' : '#c62828'}} text={useAutoDirection ? '✓ autoDirection: 开启' : '✗ autoDirection: 关闭'} />
                  <View style={{width: 10}} />
                  <Switch value={this.state.useAutoDirection} onValueChange={value => this.setState({useAutoDirection: value})} />
                </View>
              </View>
              <View style={{backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5, marginBottom: 10}}>
                <Label style={{fontSize: 12, color: '#ff6f00', lineHeight: 18}} text='测试说明：点击屏幕边缘的按钮，观察气泡弹出方向' />
                <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 开启时：空间不足会自动反向 (绿色)' />
                <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• 关闭时：强制按请求方向显示 (红色)' />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button 
                  title='左边缘 →' 
                  size='sm'
                  ref={this.leftEdgeRef} 
                  onPress={() => this.showAutoDirectionDemo(this.leftEdgeRef.current, 'left')} 
                />
                <Button 
                  title='← 右边缘' 
                  size='sm'
                  ref={this.rightEdgeRef} 
                  onPress={() => this.showAutoDirectionDemo(this.rightEdgeRef.current, 'right')} 
                />
              </View>
            </View>
          }
          topSeparator='full'
          bottomSeparator='full'
        />
        <View style={{height: 20}} />
        <ListRow
          title='Popover'
          titlePlace='top'
          detail={
            <View>
              <View style={{paddingTop: 16, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Checkbox title='Black' ref={this.blackRef} checked={this.state.black} onChange={value => this.setState({black: value})} />
                <Checkbox title='Shadow' ref={this.shadowRef} checked={this.state.shadow} onChange={value => this.setState({shadow: value})} />
                <Checkbox title='Show arrow' ref={this.showArrowRef} checked={this.state.showArrow} onChange={value => this.setState({showArrow: value})} />
              </View>
              <View style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Checkbox title='autoDirection' checked={this.state.useAutoDirection} onChange={value => this.setState({useAutoDirection: value})} />
                <Checkbox title='alignInsets' checked={this.state.useAlignInsets} onChange={value => this.setState({useAlignInsets: value})} />
                <Checkbox title='paddingCorner' checked={this.state.usePaddingCorner} onChange={value => this.setState({usePaddingCorner: value})} />
              </View>

              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='down start' ref={this.downstartRef} onPress={() => this.showPopover(this.downstartRef.current, 'down', 'start')} />
                <Button title='down center' ref={this.downcenterRef} onPress={() => this.showPopover(this.downcenterRef.current, 'down', 'center')} />
                <Button title='down end' ref={this.downendRef} onPress={() => this.showPopover(this.downendRef.current, 'down', 'end')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='right start' ref={this.rightstartRef} onPress={() => this.showPopover(this.rightstartRef.current, 'right', 'start')} />
                <Button title='left start' ref={this.leftstartRef} onPress={() => this.showPopover(this.leftstartRef.current, 'left', 'start')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='right center' ref={this.rightcenterRef} onPress={() => this.showPopover(this.rightcenterRef.current, 'right', 'center')} />
                <Button title='left center' ref={this.leftcenterRef} onPress={() => this.showPopover(this.leftcenterRef.current, 'left', 'center')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='right end' ref={this.rightendRef} onPress={() => this.showPopover(this.rightendRef.current, 'right', 'end')} />
                <Button title='left end' ref={this.leftendRef} onPress={() => this.showPopover(this.leftendRef.current, 'left', 'end')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='up start' ref={this.upstartRef} onPress={() => this.showPopover(this.upstartRef.current, 'up', 'start')} />
                <Button title='up center' ref={this.upcenterRef} onPress={() => this.showPopover(this.upcenterRef.current, 'up', 'center')} />
                <Button title='up end' ref={this.upendRef} onPress={() => this.showPopover(this.upendRef.current, 'up', 'end')} />
              </View>
            </View>
          }
          topSeparator='full'
          />
        <View style={{height: 10}} />
        <View style={{padding: 10, backgroundColor: '#f3e5f5', marginHorizontal: 10, borderRadius: 5}}>
          <Label style={{fontSize: 12, color: '#6a1b9a', lineHeight: 18}} text='说明：' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• autoDirection: 空间不足时自动反向弹出' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• alignInsets: 对齐方向偏移量 (20px)' />
          <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• paddingCorner: 箭头与对齐角的距离 (20px)' />
        </View>
        <View style={{height: 20}} />
        <ListRow title='Multi overlay' onPress={() => this.showMulti()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
