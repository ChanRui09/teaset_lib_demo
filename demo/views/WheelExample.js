// WheelExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Switch} from 'react-native';

import {NavigationPage, Theme, Wheel, ListRow, Label, Toast} from 'teaset';

export default class WheelExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Wheel',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.years = [];
    for (let i = 1970; i <= 2100; ++i) this.years.push(i);
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.daysCount = [
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    ];
    Object.assign(this.state, {
      date: new Date(),
  useHoleStyle: false,
  useMaskStyle: false,
  holeLineMode: 'default',
      useDefaultIndex: false,
      useItemStyle: false,
    });
  }

  isLeapYear(year) {
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  }

  onDateChange(year, month, day) {
    let {date} = this.state;
    date.setFullYear(year);

    let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
    if (day > daysCount) {
      day = daysCount;
      date.setDate(day);
      date.setMonth(month);
    } else {
      date.setMonth(month);
      date.setDate(day);      
    }
    
    this.setState({date});
  }

  resetDate() {
    let {useDefaultIndex} = this.state;
    if (useDefaultIndex) {
      alert('非受控模式下无法重置\n\n原因：\n• 非受控模式下，滚轮自己管理状态\n• defaultIndex 只在组件初始化时生效\n• 外部无法控制滚轮位置\n\n请切换到受控模式再试');
    } else {
      let newDate = new Date(2025, 0, 1); // 2025年1月1日
      this.setState({date: newDate});
      alert('已重置为 2025年1月1日\n\n受控模式下：\n• 通过更新 state 改变 index 属性\n• 滚轮会自动跳转到对应位置');
    }
  }

  renderPage() {
  let {date, useHoleStyle, useMaskStyle, holeLineMode, useDefaultIndex, useItemStyle} = this.state;
    let year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
    let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
    let days = [];
    for (let i = 1; i <= daysCount; ++i) days.push(i);

    // 定义样式
    let holeStyle = useHoleStyle ? {
      height: 40,
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ff9800',
    } : {height: 40};

    let maskStyle = useMaskStyle ? {
      backgroundColor: 'rgba(63, 81, 181, 0.3)',
    } : undefined;

    let holeLine;
    switch (holeLineMode) {
      case 'number':
        holeLine = 2;
        break;
      case 'element':
        holeLine = <View style={{height: 2, backgroundColor: '#e91e63'}} />;
        break;
      default:
        holeLine = undefined;
    }

    let itemStyle = useItemStyle ? {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2196f3',
    } : {textAlign: 'center'};

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{height: 20}} />
          <View style={{backgroundColor: useDefaultIndex ? '#fff3e0' : '#e8f5e9', padding: 10, marginHorizontal: 10, borderRadius: 5, borderWidth: 2, borderColor: useDefaultIndex ? '#ff9800' : '#4caf50'}}>
            <Label style={{fontSize: 14, color: useDefaultIndex ? '#e65100' : '#2e7d32', fontWeight: 'bold'}} text={useDefaultIndex ? '当前：非受控模式 (defaultIndex)' : '当前：受控模式 (index)'} />
            <Label style={{fontSize: 12, color: '#666', marginTop: 5}} text={useDefaultIndex ? '滚轮自己管理状态，外部无法控制' : '外部通过 state 控制滚轮位置'} />
          </View>
          <View style={{height: 10}} />
          <View style={{backgroundColor: Theme.defaultColor, padding: 20, flexDirection: 'row', justifyContent: 'center'}}>
            <Wheel
              style={{height: 200, width: 80}}
              itemStyle={itemStyle}
              holeStyle={holeStyle}
              maskStyle={maskStyle}
              holeLine={holeLine}
              items={this.years}
              index={useDefaultIndex ? undefined : this.years.indexOf(year)}
              defaultIndex={useDefaultIndex ? this.years.indexOf(year) : undefined}
              onChange={index => {
                this.onDateChange(this.years[index], month, day);
                Toast.message(`年份切换：${this.years[index]}年`);
              }}
              />
            <Wheel
              style={{height: 200, width: 80}}
              itemStyle={itemStyle}
              holeStyle={holeStyle}
              maskStyle={maskStyle}
              holeLine={holeLine}
              items={this.months}
              index={useDefaultIndex ? undefined : this.months.indexOf(month + 1)}
              defaultIndex={useDefaultIndex ? this.months.indexOf(month + 1) : undefined}
              onChange={index => {
                const selectedMonth = this.months[index] - 1;
                this.onDateChange(year, selectedMonth, day);
                Toast.message(`月份切换：${selectedMonth + 1}月`);
              }}
              />
            <Wheel
              style={{height: 200, width: 80}}
              itemStyle={itemStyle}
              holeStyle={holeStyle}
              maskStyle={maskStyle}
              holeLine={holeLine}
              items={days}
              index={useDefaultIndex ? undefined : days.indexOf(day)}
              defaultIndex={useDefaultIndex ? days.indexOf(day) : undefined}
              onChange={index => {
                const selectedDay = days[index];
                this.onDateChange(year, month, selectedDay);
                Toast.message(`日期切换：${selectedDay}日`);
              }}
              />
          </View>
          <View style={{height: 20}} />
          <ListRow
            title='defaultIndex (切换模式)'
            detail={<Switch value={useDefaultIndex} onValueChange={value => this.setState({useDefaultIndex: value})} />}
            topSeparator='full'
          />
          <ListRow
            title='重置为 2025-01-01'
            accessory='none'
            onPress={() => this.resetDate()}
          />
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#e3f2fd', marginHorizontal: 10, borderRadius: 5}}>
            <Label style={{fontSize: 14, color: '#1976d2', fontWeight: 'bold'}} text={`当前日期: ${year}年 ${month + 1}月 ${day}日`} />
          </View>
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#fff9c4', marginHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#fbc02d'}}>
            <Label style={{fontSize: 12, color: '#f57f17', fontWeight: 'bold'}} text='测试步骤：' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='2. 点击"重置为2025-01-01"按钮' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='3. 受控模式：滚轮会跳转到2025-01-01' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='4. 非受控模式：滚轮位置不变（只在初始化时生效）' />
          </View>
          <View style={{height: 10}} />
          <ListRow
            title='itemStyle (选项文字样式)'
            detail={<Switch value={useItemStyle} onValueChange={value => this.setState({useItemStyle: value})} />}
            topSeparator='full'
          />
          <ListRow
            title='holeStyle (当前项窗口样式)'
            detail={<Switch value={useHoleStyle} onValueChange={value => this.setState({useHoleStyle: value})} />}
          />
          <ListRow
            title='maskStyle (蒙版样式)'
            detail={<Switch value={useMaskStyle} onValueChange={value => this.setState({useMaskStyle: value})} />}
          />
          <ListRow
            title='holeLine: 默认样式'
            accessory={holeLineMode === 'default' ? 'check' : 'none'}
            topSeparator='full'
            onPress={() => this.setState({holeLineMode: 'default'})}
          />
          <ListRow
            title='holeLine: 数字高度 (2)'
            accessory={holeLineMode === 'number' ? 'check' : 'none'}
            onPress={() => this.setState({holeLineMode: 'number'})}
          />
          <ListRow
            title='holeLine: 自定义元素'
            detail={holeLineMode === 'element' ? '自定义 View' : null}
            accessory={holeLineMode === 'element' ? 'check' : 'none'}
            bottomSeparator='full'
            onPress={() => this.setState({holeLineMode: 'element'})}
          />
          <View style={{height: 10}} />
          <View style={{padding: 10, backgroundColor: '#f5f5f5', marginHorizontal: 10, borderRadius: 5}}>
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='说明：' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• itemStyle: 选项文字样式（fontSize, fontWeight, color等），当 items 是组件时无效' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• holeStyle: 当前项窗口的样式，需指定 height 属性' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• maskStyle: 当前项上下蒙版的样式' />
            <Label style={{fontSize: 12, color: '#666', lineHeight: 18}} text='• holeLine: 当前项窗口的分隔线' />
          </View>
        </ScrollView>
      </View>
    );
  }

}
