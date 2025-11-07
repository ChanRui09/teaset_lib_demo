// OverlayExample.js

'use strict';

import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableWithoutFeedback, Switch, TextInput } from 'react-native';

import { Theme, NavigationPage, ListRow, Overlay, Label, Button, Checkbox, Toast } from 'teaset';

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
      showArrow: true,
      useAutoKeyboard: false,
      useContainerStyle: false,
      useAutoDirection: true,
      useAlignInsets: false,
      usePaddingCorner: false,
      customOverlayOpacity: 1,
      lastEvent: '',
      lastDetail: '',
    });
  }

  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
    if (this.overlayPullView) {
      this.overlayPullView.close();
    }
    if (this.overlayView) {
      this.overlayView.close();
    }
    if (this.overlayPopView) {
      this.overlayPopView.close();
    }
    if (this.overlayViewCallbacksRef) {
      this.overlayViewCallbacksRef.close();
    }
    if (this.overlayPointerRef) {
      this.overlayPointerRef.close();
      this.overlayPointerRef = null;
    }
    if (this.customPopView) {
      this.customPopView.close();
    }
    if (this.pullAdvancedRef) {
      this.pullAdvancedRef.close();
    }
    if (this.pullAnimatedRef) {
      this.pullAnimatedRef.close();
      this.pullAnimatedRef = null;
    }
    if (this.keyboardOverlay) {
      this.keyboardOverlay.close();
    }
  }

  logOverlayEvent(event, detail = '', duration = 1600) {
    const message = detail ? `${event}: ${detail}` : event;
    console.log(`[OverlayExample] ${message}`);
    this.setState({ lastEvent: event, lastDetail: detail });
    Toast.message(message, { position: 'top', duration });
  }

  renderSectionTitle(text) {
    return (
      <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fafafa' }}>
        <Label style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }} text={text} />
      </View>
    );
  }

  showViewCallbacks() {
    const overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
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
        <View style={{ backgroundColor: '#fff', padding: 30, borderRadius: 12, alignItems: 'center' }}>
          <Label type='title' size='md' text='Overlay.View 回调示例' />
          <View style={{ height: 12 }} />
          <Label style={{ color: '#666', textAlign: 'center' }} text='点击周围半透明区域或使用下方按钮观察回调触发顺序' />
          <View style={{ height: 18 }} />
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

  showStyledOverlay() {
    const overlayView = (
      <Overlay.View
        style={{ alignItems: 'flex-end', justifyContent: 'flex-start', padding: 40 }}
        modal={false}
        overlayOpacity={0.25}
      >
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6 }}>
          <Label type='title' size='md' text='style: 自定义布局' />
          <View style={{ height: 8 }} />
          <Label style={{ fontSize: 12, color: '#666', lineHeight: 18 }} text='浮层根节点使用 alignItems + justifyContent + padding 定位内容' />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showDefault(transparent, modal, text) {
    let overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={modal}
        overlayOpacity={transparent ? 0 : null}
        ref={v => this.overlayView = v}
      >
        <View style={{ backgroundColor: transparent ? '#333' : Theme.defaultColor, padding: 40, borderRadius: 15, alignItems: 'center' }}>
          <Label type='danger' size='xl' text={text} />
          {modal ? <View style={{ height: 20 }} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayView && this.overlayView.close()} /> : null}
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showOpacityOverlay(value) {
    const overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={false}
        overlayOpacity={value}
      >
        <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, alignItems: 'center' }}>
          <Label type='title' size='md' text={`overlayOpacity = ${value ?? 'Theme 默认'}`} />
          <View style={{ height: 10 }} />
          <Label style={{ fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 }} text='调整蒙版透明度，对比背景内容的可见程度' />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showAnimatedOverlay(animated) {
    const overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={false}
        animated={animated}
      >
        <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, alignItems: 'center' }}>
          <Label type='title' size='md' text={`animated: ${animated ? 'true (默认无动画→有动画)' : 'false'}`} />
          <View style={{ height: 10 }} />
          <Label style={{ fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 }} text={animated ? '带入场动画，关闭时同样带动画' : '无动画，立即出现与消失'} />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showPointerEvents(pointerEvents) {
    let description;
    switch (pointerEvents) {
      case 'auto':
        description = '半透明区域会拦截点击，需点击按钮关闭浮层';
        break;
      case 'none':
        description = '所有事件透传到底部视图 (2 秒后自动关闭)';
        break;
      default:
        description = '';
    }

    let overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={false}
        overlayOpacity={0.3}
        overlayPointerEvents={pointerEvents}
        ref={v => this.overlayPointerRef = v}
      >
        <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, alignItems: 'center' }}>
          <Label type='title' size='md' text={`overlayPointerEvents: ${pointerEvents}`} />
          <View style={{ height: 10 }} />
          <Label style={{ fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 }} text={description} />
          <View style={{ height: 15 }} />
          {pointerEvents === 'auto' ? (
            <Button title='关闭浮层' onPress={() => this.overlayPointerRef && this.overlayPointerRef.close()} />
          ) : (
            <Label style={{ fontSize: 12, color: '#aaa' }} text='等待自动关闭…' />
          )}
        </View>
      </Overlay.View>
    );
    const key = Overlay.show(overlayView);
    if (pointerEvents !== 'auto') {
      setTimeout(() => {
        Overlay.hide(key);
      }, 2000);
    }
  }

  showPop(type, modal, text) {
    let { useContainerStyle } = this.state;
    let containerStyle = useContainerStyle ? {
      borderWidth: 3,
      borderColor: '#ff9800',
      borderRadius: 20,
    } : null;

    let overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        type={type}
        modal={modal}
        containerStyle={containerStyle}
        ref={v => this.overlayPopView = v}
      >
        <View style={{ backgroundColor: Theme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
          <Label type='title' size='xl' text={text} />
          {modal ? <View style={{ height: 60 }} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  }

  showPopAnimated(animated) {
    const overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        animated={animated}
      >
        <View style={{ backgroundColor: Theme.defaultColor, minWidth: 220, padding: 24, borderRadius: 12, alignItems: 'center' }}>
          <Label type='title' size='md' text={`PopView animated: ${animated}`} />
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  }

  showPopCustom(imageSource, fromView, animated = true) {
    if (!fromView) return;
    let { customOverlayOpacity } = this.state;
    fromView.measure((x, y, width, height, pageX, pageY) => {
      const bounds = { x: pageX, y: pageY, width, height };
      const overlayView = (
        <Overlay.PopView
          style={{ alignItems: 'center', justifyContent: 'center' }}
          overlayOpacity={customOverlayOpacity}
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
      this.logOverlayEvent('PopView customBounds', `from (${Math.round(pageX)}, ${Math.round(pageY)}) size ${Math.round(width)}x${Math.round(height)}，animated=${animated}, overlayOpacity=${customOverlayOpacity}`);
      Overlay.show(overlayView);
    });
  }

  showPull(side, modal, text, rootTransform, pullContainerStyle) {
    let overlayView = (
      <Overlay.PullView
        side={side}
        modal={modal}
        rootTransform={rootTransform}
        containerStyle={pullContainerStyle}
        ref={v => this.overlayPullView = v}
      >
        <View style={{ backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center' }}>
          <Label type='title' size='xl' text={text} />
          {modal ? <View style={{ height: 60 }} /> : null}
          {modal ? <Button title='Close' onPress={() => this.overlayPullView && this.overlayPullView.close()} /> : null}
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  showPullAnimated(animated) {
    const overlayView = (
      <Overlay.PullView side='bottom' modal={false} animated={animated} ref={v => this.pullAnimatedRef = v}>
        <View style={{ backgroundColor: Theme.defaultColor, minWidth: 260, padding: 30, alignItems: 'center', borderRadius: 12 }}>
          <Label type='title' size='md' text={`animated: ${animated}`} />
          <View style={{ height: 12 }} />
          <Button title='关闭' onPress={() => this.pullAnimatedRef && this.pullAnimatedRef.close()} />
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  showPullWithContainerStyle() {
    this.showPull(
      'bottom',
      false,
      'containerStyle: padding + radius',
      null,
      { backgroundColor: '#fffbe6', paddingVertical: 24, borderTopLeftRadius: 18, borderTopRightRadius: 18 }
    );
  }

  showPullAdvanced() {
    const overlayView = (
      <Overlay.PullView
        side='left'
        modal={false}
        containerStyle={{ backgroundColor: '#fff3e0', paddingVertical: 30 }}
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
        <View style={{ paddingHorizontal: 24 }}>
          <Label type='title' size='md' text='高级 PullView 示范' />
          <View style={{ height: 12 }} />
          <Label style={{ color: '#555' }} text='• side: left' />
          <Label style={{ color: '#555' }} text='• containerStyle: 自定义背景 + padding' />
          <Label style={{ color: '#555' }} text='• rootTransform: translate' />
          <Label style={{ color: '#555' }} text='• animated: true (默认动画)' />
          <View style={{ height: 18 }} />
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
    let { black, showArrow, useAutoDirection, useAlignInsets, usePaddingCorner } = this.state;
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
    let popoverStyle = black ? blackStyle : whiteStyle;

    view.measure((x, y, width, height, pageX, pageY) => {
      let fromBounds = { x: pageX, y: pageY, width, height };
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
          <Label style={{ color: black ? '#fff' : '#000' }} size='md' text={direction + ' ' + align} />
        </Overlay.PopoverView>
      );
      this.overlayKey = Overlay.show(overlayView);
    });
  }

  showPopoverWithOverlayOpacity(opacity) {
    const buttonRef = this.downcenterRef.current;
    if (!buttonRef) return;
    buttonRef.measure((x, y, width, height, pageX, pageY) => {
      const overlayView = (
        <Overlay.PopoverView
          popoverStyle={{ backgroundColor: 'rgba(0,0,0,0.85)', paddingVertical: 8, paddingHorizontal: 12 }}
          fromBounds={{ x: pageX, y: pageY, width, height }}
          direction='up'
          align='center'
          overlayOpacity={opacity}
        >
          <Label style={{ color: '#fff' }} text={`overlayOpacity: ${opacity}`} />
        </Overlay.PopoverView>
      );
      Overlay.show(overlayView);
    });
  }

  showPopoverWithDirectionInsets(insets) {
    const buttonRef = this.upcenterRef.current;
    if (!buttonRef) return;
    buttonRef.measure((x, y, width, height, pageX, pageY) => {
      const overlayView = (
        <Overlay.PopoverView
          popoverStyle={{ backgroundColor: '#4caf50', paddingVertical: 10, paddingHorizontal: 14 }}
          fromBounds={{ x: pageX, y: pageY, width, height }}
          direction='down'
          align='center'
          directionInsets={insets}
          showArrow={true}
        >
          <Label style={{ color: '#fff' }} text={`directionInsets: ${insets}`} />
        </Overlay.PopoverView>
      );
      Overlay.show(overlayView);
    });
  }

  showMulti() {
    let overlayView = (
      <Overlay.PullView modal={false}>
        <View style={{ backgroundColor: Theme.defaultColor, minWidth: 200, minHeight: 260, justifyContent: 'center', alignItems: 'center' }}>
          <Label type='title' size='xl' text='Overlay' />
          <View style={{ height: 60 }} />
          <Button title='New overlay' onPress={() => this.showDefault(false, true, 'New overlay')} />
        </View>
      </Overlay.PullView>
    );
    this.overlayKey = Overlay.show(overlayView);
  }

  showAutoKeyboard() {
    let { useAutoKeyboard } = this.state;
    let overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={true}
        autoKeyboardInsets={useAutoKeyboard}
        ref={v => this.keyboardOverlay = v}
      >
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300 }}>
          <Label type='title' size='md' text={useAutoKeyboard ? 'autoKeyboardInsets: true' : 'autoKeyboardInsets: false'} />
          <View style={{ height: 10 }} />
          <Label style={{ fontSize: 12, color: '#666', lineHeight: 18 }} text={useAutoKeyboard ? '点击输入框弹出键盘时，浮层会自动上移避开键盘' : '点击输入框弹出键盘时，浮层不会移动'} />
          <View style={{ height: 15 }} />
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
          <View style={{ height: 15 }} />
          <Button title='关闭' onPress={() => this.keyboardOverlay && this.keyboardOverlay.close()} />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  showAutoDirectionDemo(view, requestedDirection) {
    let { useAutoDirection } = this.state;
    let popoverStyle = {
      backgroundColor: useAutoDirection ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      minWidth: 150,
    };

    view.measure((x, y, width, height, pageX, pageY) => {
      let fromBounds = { x: pageX, y: pageY, width, height };
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
          <Label style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }} text={useAutoDirection ? 'autoDirection: ON' : 'autoDirection: OFF'} />
          <Label style={{ color: '#fff', fontSize: 12, marginTop: 4 }} text={`请求方向: ${requestedDirection}`} />
          <Label style={{ color: '#fff', fontSize: 12 }} text={useAutoDirection ? '空间不足时会自动反向' : '强制按请求方向显示'} />
        </Overlay.PopoverView>
      );
      this.overlayKey = Overlay.show(overlayView);
    });
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    let {
      useAutoDirection,
      lastEvent,
      lastDetail,
      useAutoKeyboard,
      useContainerStyle,
      customOverlayOpacity,
      useAlignInsets,
      usePaddingCorner,
      black,
      showArrow
    } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 16 }} />
        <View style={{ marginHorizontal: 12, padding: 10, borderRadius: 8, backgroundColor: '#f1f8ff', borderWidth: 1, borderColor: '#90caf9' }}>
          <Label style={{ fontSize: 12, color: '#0d47a1', fontWeight: 'bold' }} text='最新覆盖层事件' />
          <Label style={{ fontSize: 12, color: '#0d47a1', marginTop: 4 }} text={lastEvent ? `事件：${lastEvent}` : '事件：暂无'} />
          <Label style={{ fontSize: 12, color: '#0d47a1', marginTop: 2 }} text={lastDetail ? `详情：${lastDetail}` : ''} />
        </View>
        <View style={{ height: 16 }} />
        {this.renderSectionTitle('Overlay 静态属性')}
        <View style={{ marginHorizontal: 12, padding: 12, borderRadius: 8, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#e0e0e0' }}>
          <Label style={{ fontSize: 12, color: '#333' }} text='• View: 基础浮层组件' />
          <Label style={{ fontSize: 12, color: '#333', marginTop: 4 }} text='• PullView: 抽屉效果浮层' />
          <Label style={{ fontSize: 12, color: '#333', marginTop: 4 }} text='• PopView: 弹出效果浮层' />
          <Label style={{ fontSize: 12, color: '#333', marginTop: 4 }} text='• PopoverView: 气泡效果浮层' />
        </View>

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('<Overlay.View /> Props')}
        <ListRow
          title='style: 自定义布局'
          detail='alignItems / justifyContent'
          onPress={() => this.showStyledOverlay()}
          topSeparator='full'
        />
        <ListRow title='modal: true (阻止点击透传)' onPress={() => this.showDefault(false, true, 'modal = true')} />
        <ListRow title='animated: false (默认)' onPress={() => this.showAnimatedOverlay(false)} />
        <ListRow title='animated: true (带动画)' onPress={() => this.showAnimatedOverlay(true)} />
        <ListRow title='overlayOpacity: 0 (完全透明)' onPress={() => this.showOpacityOverlay(0)} />
        <ListRow title='overlayOpacity: 0.6 (半透明蒙版)' onPress={() => this.showOpacityOverlay(0.6)} />
        <ListRow title='overlayPointerEvents: auto' onPress={() => this.showPointerEvents('auto')} />
        <ListRow title='overlayPointerEvents: none' onPress={() => this.showPointerEvents('none')} />
        <ListRow
          title='autoKeyboardInsets'
          detail={<Switch value={useAutoKeyboard} onValueChange={value => this.setState({ useAutoKeyboard: value })} />}
          onPress={() => this.setState({ useAutoKeyboard: !useAutoKeyboard })}
        />
        <ListRow title='autoKeyboardInsets 示例' detail={useAutoKeyboard ? 'true' : 'false'} onPress={() => this.showAutoKeyboard()} bottomSeparator='full' />

        <ListRow
          title='<Overlay.View /> 事件 (Appear / Disappear / Close)'
          detail='调用并观察日志'
          onPress={() => this.showViewCallbacks()}
          topSeparator='full'
          bottomSeparator='full'
        />

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('<Overlay.PullView /> Props')}
        <ListRow title='side: bottom' onPress={() => this.showPull('bottom', false, 'side: bottom')} topSeparator='full' />
        <ListRow title='side: top' onPress={() => this.showPull('top', false, 'side: top')} />
        <ListRow title='side: left' onPress={() => this.showPull('left', false, 'side: left')} />
        <ListRow title='side: right' onPress={() => this.showPull('right', false, 'side: right')} />
        <ListRow title='modal: true' onPress={() => this.showPull('bottom', true, 'modal: true')} />
        <ListRow title='containerStyle: 自定义 padding/圆角' detail='点击查看效果' onPress={() => this.showPullWithContainerStyle()} />
        <ListRow title='rootTransform: none (默认)' onPress={() => this.showPull('bottom', false, 'rootTransform: none')} />
        <ListRow title='rootTransform: scale' onPress={() => this.showPull('bottom', false, 'rootTransform: scale', 'scale')} />
        <ListRow title='rootTransform: translate' onPress={() => this.showPull('left', false, 'rootTransform: translate', 'translate')} />
        <ListRow title='animated: false' onPress={() => this.showPullAnimated(false)} />
        <ListRow title='animated: true' onPress={() => this.showPullAnimated(true)} bottomSeparator='full' />
        <ListRow title='PullView 事件示例' detail='onAppear/onCloseRequest' onPress={() => this.showPullAdvanced()} topSeparator='full' bottomSeparator='full' />

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('<Overlay.PopView /> Props')}
        <ListRow title='type: zoomOut' onPress={() => this.showPop('zoomOut', false, 'type: zoomOut')} topSeparator='full' />
        <ListRow title='type: zoomIn' onPress={() => this.showPop('zoomIn', false, 'type: zoomIn')} />
        <ListRow
          title='type: custom (customBounds)'
          detail={<Image style={{ width: 40, height: 40 }} source={img} resizeMode='cover' ref={v => this.imgView = v} />}
          onPress={() => this.showPopCustom(img, this.imgView, true)}
        />
        <ListRow
          title='containerStyle 切换'
          detail={<Switch value={useContainerStyle} onValueChange={value => this.setState({ useContainerStyle: value })} />}
          onPress={() => this.setState({ useContainerStyle: !useContainerStyle })}
        />
        <ListRow
          title='overlayOpacity 调整 (customBounds)'
          detail={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Label style={{ fontSize: 12, color: '#666', marginRight: 8 }} text={customOverlayOpacity.toFixed(1)} />
              <Button title='0' size='sm' type={customOverlayOpacity === 0 ? 'primary' : 'default'} onPress={() => this.setState({ customOverlayOpacity: 0 })} />
              <View style={{ width: 4 }} />
              <Button title='0.5' size='sm' type={customOverlayOpacity === 0.5 ? 'primary' : 'default'} onPress={() => this.setState({ customOverlayOpacity: 0.5 })} />
              <View style={{ width: 4 }} />
              <Button title='1' size='sm' type={customOverlayOpacity === 1 ? 'primary' : 'default'} onPress={() => this.setState({ customOverlayOpacity: 1 })} />
            </View>
          }
          accessory='none'
        />
        <ListRow title='customBounds (animated=true)' detail='触发上方图片按钮' onPress={() => this.showPopCustom(img, this.imgView, true)} />
        <ListRow title='customBounds (animated=false)' detail='无动画' onPress={() => this.showPopCustom(img, this.imgView, false)} />
        <ListRow title='animated: false (普通 PopView)' onPress={() => this.showPopAnimated(false)} bottomSeparator='full' />
        <ListRow title='animated: true (普通 PopView)' onPress={() => this.showPopAnimated(true)} topSeparator='full' bottomSeparator='full' />

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('<Overlay.PopoverView /> Props')}
        <View style={{ marginHorizontal: 12, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Checkbox title='Black 样式' checked={black} onChange={value => this.setState({ black: value })} />
          <Checkbox title='showArrow' checked={showArrow} onChange={value => this.setState({ showArrow: value })} />
          <Checkbox title='autoDirection' checked={useAutoDirection} onChange={value => this.setState({ useAutoDirection: value })} />
        </View>
        <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8 }}>
          <Checkbox title='alignInsets' checked={useAlignInsets} onChange={value => this.setState({ useAlignInsets: value })} />
          <Checkbox title='paddingCorner' checked={usePaddingCorner} onChange={value => this.setState({ usePaddingCorner: value })} />
        </View>
        <View style={{ marginHorizontal: 12, paddingBottom: 12 }}>
          <Button
            title='popoverStyle / fromBounds 示例'
            onPress={() => {
              if (this.downcenterRef.current) {
                this.showPopover(this.downcenterRef.current, 'down', 'center');
              }
            }}
          />
        </View>
        <View style={{ paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Button title='down start' ref={this.downstartRef} onPress={() => this.showPopover(this.downstartRef.current, 'down', 'start')} />
          <Button title='down center' ref={this.downcenterRef} onPress={() => this.showPopover(this.downcenterRef.current, 'down', 'center')} />
          <Button title='down end' ref={this.downendRef} onPress={() => this.showPopover(this.downendRef.current, 'down', 'end')} />
        </View>
        <View style={{ paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Button title='right start' ref={this.rightstartRef} onPress={() => this.showPopover(this.rightstartRef.current, 'right', 'start')} />
          <Button title='left start' ref={this.leftstartRef} onPress={() => this.showPopover(this.leftstartRef.current, 'left', 'start')} />
        </View>
        <View style={{ paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Button title='right center' ref={this.rightcenterRef} onPress={() => this.showPopover(this.rightcenterRef.current, 'right', 'center')} />
          <Button title='left center' ref={this.leftcenterRef} onPress={() => this.showPopover(this.leftcenterRef.current, 'left', 'center')} />
        </View>
        <View style={{ paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Button title='right end' ref={this.rightendRef} onPress={() => this.showPopover(this.rightendRef.current, 'right', 'end')} />
          <Button title='left end' ref={this.leftendRef} onPress={() => this.showPopover(this.leftendRef.current, 'left', 'end')} />
        </View>
        <View style={{ paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
          <Button title='up start' ref={this.upstartRef} onPress={() => this.showPopover(this.upstartRef.current, 'up', 'start')} />
          <Button title='up center' ref={this.upcenterRef} onPress={() => this.showPopover(this.upcenterRef.current, 'up', 'center')} />
          <Button title='up end' ref={this.upendRef} onPress={() => this.showPopover(this.upendRef.current, 'up', 'end')} />
        </View>
        <View style={{ marginHorizontal: 12, marginTop: 12 }}>
          <Button title='directionInsets: 0' onPress={() => this.showPopoverWithDirectionInsets(0)} />
          <View style={{ height: 8 }} />
          <Button title='directionInsets: 12' onPress={() => this.showPopoverWithDirectionInsets(12)} />
        </View>
        <View style={{ marginHorizontal: 12, marginTop: 12 }}>
          <Button title='overlayOpacity: 0 (默认)' onPress={() => this.showPopoverWithOverlayOpacity(0)} />
          <View style={{ height: 8 }} />
          <Button title='overlayOpacity: 0.4' onPress={() => this.showPopoverWithOverlayOpacity(0.4)} />
        </View>

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('Popover autoDirection 事件')}
        <View style={{ padding: 12, backgroundColor: '#f5f5f5', marginHorizontal: 12, borderRadius: 6 }}>
          <Label style={{ fontSize: 12, color: useAutoDirection ? '#2e7d32' : '#c62828' }} text={useAutoDirection ? 'autoDirection: 开启' : 'autoDirection: 关闭'} />
          <View style={{ height: 8 }} />
          <Switch value={useAutoDirection} onValueChange={value => this.setState({ useAutoDirection: value })} />
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title='左边缘 →' size='sm' ref={this.leftEdgeRef} onPress={() => this.showAutoDirectionDemo(this.leftEdgeRef.current, 'left')} />
            <Button title='← 右边缘' size='sm' ref={this.rightEdgeRef} onPress={() => this.showAutoDirectionDemo(this.rightEdgeRef.current, 'right')} />
          </View>
        </View>

        <View style={{ height: 16 }} />
        {this.renderSectionTitle('叠加示例')}
        <ListRow title='Multi overlay (多个浮层叠加)' onPress={() => this.showMulti()} topSeparator='full' bottomSeparator='full' />
        <View style={{ height: Theme.screenInset.bottom }} />
      </ScrollView>
    );
  }

}
