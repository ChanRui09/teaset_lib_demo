// ActionPopoverExample.js

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Switch, TouchableOpacity} from 'react-native';

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
    this.arrowDemoRef = React.createRef();
    this.separatorNoneRef = React.createRef();
    this.separatorLeftRef = React.createRef();
    this.separatorRightRef = React.createRef();
    this.separatorBothRef = React.createRef();

    this.state = {
      showArrow: true,
    };
  }

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Copy', onPress: () => alert('Copy')},
        {title: 'Remove', onPress: () => alert('Remove')},
        {title: 'Share', onPress: () => alert('Share')},
      ];
      ActionPopover.show({x: pageX, y: pageY, width, height}, items);
    });
  }

  showCustomTitle(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      // 演示 title 作为组件
      let items = [
        {
          title: (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>📋</Text>
              <Text style={{fontSize: 12, color: Theme.apItemTitleColor}}>复制</Text>
            </View>
          ),
          onPress: () => alert('复制')
        },
        {
          title: (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>🗑️</Text>
              <Text style={{fontSize: 12, color: Theme.apItemTitleColor}}>删除</Text>
            </View>
          ),
          onPress: () => alert('删除')
        },
        {
          title: (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>📤</Text>
              <Text style={{fontSize: 12, color: Theme.apItemTitleColor}}>分享</Text>
            </View>
          ),
          onPress: () => alert('分享')
        }
      ];
      ActionPopover.show({x: pageX, y: pageY, width, height}, items, {direction: 'down'});
    });
  }

  showArrowDemo(view) {
    let {showArrow} = this.state;
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Show arrow 示例', onPress: () => alert(`showArrow=${showArrow}`)},
        {title: '常规项', onPress: () => alert('常规项')},
      ];
      ActionPopover.show({x: pageX, y: pageY, width, height}, items, {direction: 'down', showArrow});
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
    view.measure((x, y, width, height, pageX, pageY) => {
      const fromBounds = {x: pageX, y: pageY, width, height};
      let overlayKey = null;
      const handlePress = message => {
        overlayKey && Overlay.hide(overlayKey);
        alert(`${alertPrefix}: ${message}`);
      };
      const overlayView = (
        <Overlay.PopoverView
          fromBounds={fromBounds}
          direction='up'
          align='center'
          showArrow={true}
          overlayOpacity={0}
        >
          <View style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ffca28',
            overflow: 'hidden',
          }}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={`separator-${index}`}
                activeOpacity={0.75}
                onPress={() => handlePress(item.title)}
                style={[{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  minWidth: 92,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#ffca28',
                  borderLeftWidth: item.leftSeparator ? 2 : 0,
                  borderRightWidth: item.rightSeparator ? 2 : 0,
                },
                index === 0 ? {borderTopLeftRadius: 10, borderBottomLeftRadius: 10} : null,
                index === items.length - 1 ? {borderTopRightRadius: 10, borderBottomRightRadius: 10} : null,
                ]}
              >
                <Text style={{color: '#fff8e1', fontSize: 14}}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Overlay.PopoverView>
      );
      overlayKey = Overlay.show(overlayView);
    });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        
        <Label type='detail' size='xl' text='基本用法' />
        <View style={{height: 10}} />
        <View style={{alignItems: 'center'}}>
          <Button title='Show ActionPopover' ref={this.apButtonRef} onPress={() => this.show(this.apButtonRef.current)} />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='showArrow 开关' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • showArrow：控制是否显示气泡箭头（默认 true）{'\n'}
            • 通过下方开关切换，再点击按钮观察箭头变化
          </Text>
        </View>
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
        <Label type='detail' size='xl' text='title 作为组件' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • title 可以是字符串、数字或 React Native 组件{'\n'}
            • 自定义组件可以实现图标+文字的组合效果{'\n'}
            • 本示例展示了 emoji 图标 + 文字的垂直布局
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button 
            title='自定义 Title 组件' 
            ref={this.customTitleRef} 
            onPress={() => this.showCustomTitle(this.customTitleRef.current)}
            type='primary'
          />
        </View>
        
        <View style={{height: 20}} />
        <Label type='detail' size='xl' text='leftSeparator / rightSeparator' />
        <View style={{height: 10}} />
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 15,
          margin: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc'
        }}>
          <Text style={{fontSize: 14, color: '#666', lineHeight: 20}}>
            <Text style={{fontWeight: 'bold'}}>说明：</Text>{'\n'}
            • leftSeparator：控制左侧竖线{'\n'}
            • rightSeparator：控制右侧竖线{'\n'}
            • “无分隔线”：两项均无分隔线{'\n'}
            • “仅左侧”：第一项左边缘绘制竖线{'\n'}
            • “仅右侧”：第二项右边缘绘制竖线{'\n'}
            • “左右都有”：第一项左右两侧同时显示竖线
          </Text>
        </View>
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
      </ScrollView>
    );
  }

}
