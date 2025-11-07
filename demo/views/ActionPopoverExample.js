// ActionPopoverExample.js

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Switch} from 'react-native';

import {NavigationPage, ActionPopover, Button, Label, Theme, Overlay} from 'teaset';

export default class ActionPopoverExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ActionPopover',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.apButtonRef = React.createRef();
    this.customTitleRef = React.createRef();
  this.titleEnumRef = React.createRef();
    this.arrowDemoRef = React.createRef();
    this.separatorNoneRef = React.createRef();
    this.separatorLeftRef = React.createRef();
    this.separatorRightRef = React.createRef();
    this.separatorBothRef = React.createRef();
    this.directItemRef = React.createRef();
    this.alignStartRef = React.createRef();
    this.alignCenterRef = React.createRef();
    this.alignEndRef = React.createRef();
    this.directionUpRef = React.createRef();
    this.directionDownRef = React.createRef();
    this.directionLeftRef = React.createRef();
    this.directionRightRef = React.createRef();

    this.state = {
      showArrow: true,
      directItemSelected: null,
    };
  }
  
  componentWillUnmount() {
    if (this.overlayKey) {
      Overlay.hide(this.overlayKey);
      this.overlayKey = null;
    }
  }

  getDefaultItems() {
    return [
      {title: 'Copy', onPress: () => alert('Copy')},
      {title: 'Remove', onPress: () => alert('Remove')},
      {title: 'Share', onPress: () => alert('Share')},
    ];
  }

  measureView(view, callback) {
    if (!view || !view.measure) {
      return;
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      callback({x: pageX, y: pageY, width, height});
    });
  }

  show(view) {
    this.measureView(view, fromBounds => {
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = ActionPopover.show(fromBounds, this.getDefaultItems());
    });
  }


  showTitleVariants(view) {
    this.measureView(view, fromBounds => {
      const items = [
        { title: '字符串 title', onPress: () => alert('title: string') },
        { title: 2025, onPress: () => alert('title: number 2025') },
        {
          title: (
            <View style={{ alignItems: 'center' }}>
              <Label style={{ fontSize: 16, color: Theme.apItemTitleColor, fontWeight: 'bold' }} text='React 组件标题' />
              <Label style={{ fontSize: 12, color: '#999', marginTop: 4 }} text='(element)' />
            </View>
          ),
          onPress: () => alert('title: element'),
        },
      ];
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = ActionPopover.show(fromBounds, items, { direction: 'down' });
    });
  }

  showArrowDemo(view) {
    let {showArrow} = this.state;
    this.measureView(view, fromBounds => {
      const items = [
        {title: `showArrow = ${showArrow}`, onPress: () => alert(`showArrow=${showArrow}`)},
        {title: '常规项', onPress: () => alert('常规项')},
      ];
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = ActionPopover.show(fromBounds, items, {direction: 'down', showArrow});
    });
  }

  showSeparatorNone(view) {
    this.showSeparatorExample(view, [
      {title: '无分隔线 A'},
      {title: '无分隔线 B'},
    ], '无分隔线');
  }

  showSeparatorLeft(view) {
    this.showSeparatorExample(view, [
      {title: '左边界', leftSeparator: true},
      {title: '第二项'},
    ], '仅左侧分隔线');
  }

  showSeparatorRight(view) {
    this.showSeparatorExample(view, [
      {title: '第一项'},
      {title: '右边界', rightSeparator: true},
    ], '仅右侧分隔线');
  }

  showSeparatorBoth(view) {
    this.showSeparatorExample(view, [
      {title: '左右分隔线', leftSeparator: true, rightSeparator: true},
      {title: '参考项'},
    ], '左右分隔线');
  }

  showSeparatorExample(view, items, alertPrefix) {
    if (!view) return;
    this.measureView(view, fromBounds => {
      const content = (
        <Overlay.PopoverView
          fromBounds={fromBounds}
          direction='up'
          align='center'
          showArrow
          overlayOpacity={0}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              borderRadius: Theme.apBorderRadius,
              borderWidth: Theme.apSeparatorWidth,
              borderColor: '#ff9800',
              overflow: 'hidden',
            }}
          >
            {items.map((item, index) => {
              const titleNode = (
                <Text style={{color: '#d35400', fontSize: Theme.apItemFontSize, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
              );
              return (
                <ActionPopover.ActionPopoverView.Item
                  key={`separator-${index}`}
                  title={titleNode}
                  leftSeparator={item.leftSeparator}
                  rightSeparator={item.rightSeparator}
                  style={[
                    {backgroundColor: '#fffbe6'},
                    item.leftSeparator ? {borderLeftWidth: 2, borderLeftColor: '#ff9800'} : {borderLeftWidth: 0},
                    item.rightSeparator ? {borderRightWidth: 2, borderRightColor: '#ff9800'} : {borderRightWidth: 0},
                  ]}
                  onPress={() => {
                    if (this.overlayKey) {
                      Overlay.hide(this.overlayKey);
                      this.overlayKey = null;
                    }
                    alert(`${alertPrefix}: ${item.title}`);
                  }}
                />
              );
            })}
          </View>
        </Overlay.PopoverView>
      );
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = Overlay.show(content);
    });
  }

  showWithAlign(view, align) {
    this.measureView(view, fromBounds => {
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = ActionPopover.show(fromBounds, this.getDefaultItems(), {align});
    });
  }

  showWithDirection(view, direction) {
    this.measureView(view, fromBounds => {
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = ActionPopover.show(fromBounds, this.getDefaultItems(), {direction});
    });
  }

  showUsingActionPopoverItems(view) {
    if (!view || !view.measure) {
      return;
    }
    this.measureView(view, fromBounds => {
      const items = [
        {title: '复制 (Item 组件)'},
        {title: '转发 (Item 组件)'},
        {title: '删除 (Item 组件)'}
      ];
      const hideOverlay = () => {
        if (this.overlayKey) {
          Overlay.hide(this.overlayKey);
          this.overlayKey = null;
        }
      };
      const content = (
        <Overlay.PopoverView
          fromBounds={fromBounds}
          direction='up'
          align='center'
          showArrow
          shadow
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Theme.apColor,
              borderRadius: Theme.apBorderRadius,
              overflow: 'hidden',
              minWidth: 220,
            }}
          >
            {items.map((item, index) => (
              <ActionPopover.ActionPopoverView.Item
                key={`direct-item-${index}`}
                title={item.title}
                leftSeparator={index !== 0}
                style={{alignItems: 'center', justifyContent: 'center', minWidth: 70}}
                onPress={() => {
                  hideOverlay();
                  this.setState({directItemSelected: item.title});
                  setTimeout(() => alert(`ActionPopoverView.Item 触发：${item.title}`), 10);
                }}
              />
            ))}
          </View>
        </Overlay.PopoverView>
      );
      if (this.overlayKey) {
        Overlay.hide(this.overlayKey);
        this.overlayKey = null;
      }
      this.overlayKey = Overlay.show(content);
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='md' text='基本用法' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <View style={{alignItems: 'center'}}>
          <Button title='Show ActionPopover' ref={this.apButtonRef} onPress={() => this.show(this.apButtonRef.current)} />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='showArrow 开关' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          showArrow 属性演示 - 控制是否显示气泡箭头 (默认 true)
        </Text>
        <View style={{marginHorizontal: 10, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, color: '#333'}}>showArrow: {this.state.showArrow ? 'true' : 'false'}</Text>
            <Switch value={this.state.showArrow} onValueChange={value => this.setState({showArrow: value})} />
          </View>
          <View style={{height: 12}} />
          <Button
            title='展示 showArrow 示例'
            ref={this.arrowDemoRef}
            onPress={() => this.showArrowDemo(this.arrowDemoRef.current)}
            type='secondary'
          />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='align 对齐方式' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          align 属性演示 - 控制气泡内容相对触发点的水平对齐 (start/center/end)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 12}}>
          <Button title='Start' ref={this.alignStartRef} onPress={() => this.showWithAlign(this.alignStartRef.current, 'start')} />
          <Button title='Center' ref={this.alignCenterRef} onPress={() => this.showWithAlign(this.alignCenterRef.current, 'center')} />
          <Button title='End' ref={this.alignEndRef} onPress={() => this.showWithAlign(this.alignEndRef.current, 'end')} />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='direction 弹出方向' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          direction 属性演示 - 控制气泡从触发点弹出的方向 (up/down/left/right)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 12}}>
          <Button title='Up' ref={this.directionUpRef} onPress={() => this.showWithDirection(this.directionUpRef.current, 'up')} />
          <Button title='Down' ref={this.directionDownRef} onPress={() => this.showWithDirection(this.directionDownRef.current, 'down')} />
        </View>
        <View style={{alignItems: 'center', marginTop: 12}}>
          <Button title='Left' ref={this.directionLeftRef} onPress={() => this.showWithDirection(this.directionLeftRef.current, 'left')} style={{marginBottom: 12}} />
          <Button title='Right' ref={this.directionRightRef} onPress={() => this.showWithDirection(this.directionRightRef.current, 'right')} />
        </View>

        <View style={{height: 20}} />
        <Label type='detail' size='md' text='title 作为组件' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          title 属性演示 - 支持字符串、数字或自定义 React 组件
        </Text>
        <View style={{alignItems: 'center'}}>
          <View style={{height: 12}} />
          <Button
            title='title 类型枚举 (string / number / element)'
            ref={this.titleEnumRef}
            onPress={() => this.showTitleVariants(this.titleEnumRef.current)}
            type='secondary'
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='leftSeparator / rightSeparator' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          leftSeparator / rightSeparator 属性演示 - 控制操作项左右分隔线的显示
        </Text>
        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              style={{flex: 1, marginRight: 6}}
              title='无分隔线'
              size='sm'
              ref={this.separatorNoneRef}
              onPress={() => this.showSeparatorNone(this.separatorNoneRef.current)}
            />
            <Button
              style={{flex: 1, marginLeft: 6}}
              title='仅左侧'
              size='sm'
              ref={this.separatorLeftRef}
              onPress={() => this.showSeparatorLeft(this.separatorLeftRef.current)}
            />
          </View>
          <View style={{height: 12}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              style={{flex: 1, marginRight: 6}}
              title='仅右侧'
              size='sm'
              ref={this.separatorRightRef}
              onPress={() => this.showSeparatorRight(this.separatorRightRef.current)}
            />
            <Button
              style={{flex: 1, marginLeft: 6}}
              title='左右都有'
              size='sm'
              ref={this.separatorBothRef}
              onPress={() => this.showSeparatorBoth(this.separatorBothRef.current)}
            />
          </View>
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='md' text='直接使用 ActionPopover.ActionPopoverView.Item' style={{fontWeight: 'bold', color: '#000'}} />
        <View style={{height: 10}} />
        <Text style={{marginLeft: 20, marginRight: 20, color: '#999', fontSize: 12, lineHeight: 18}}>
          通过 Overlay.PopoverView 手动组合 ActionPopover.ActionPopoverView.Item，可灵活扩展个性化操作面板
        </Text>
        <View style={{alignItems: 'center', marginTop: 12}}>
          <Button
            title={this.state.directItemSelected ? `最近选择：${this.state.directItemSelected}` : '使用 ActionPopover.Item'}
            type='secondary'
            ref={this.directItemRef}
            onPress={() => this.showUsingActionPopoverItems(this.directItemRef.current)}
          />
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    );
  }

}
