// BadgeExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {NavigationPage, ListRow, Badge} from 'teaset';

export default class BadgeExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Badge',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Type capsule' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge count={6} />
            <View style={{width: 4}} />
            <Badge count={68} />
            <View style={{width: 4}} />
            <Badge count={689} />
            <View style={{width: 4}} />
            <Badge count='new' />
          </View>
        } topSeparator='full' />
        <ListRow title='Type square' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge type='square' count={6} />
            <View style={{width: 4}} />
            <Badge type='square' count={68} />
            <View style={{width: 4}} />
            <Badge type='square' count={689} />
            <View style={{width: 4}} />
            <Badge type='square' count='new' />
          </View>
        } />
        <ListRow title='Type dot' detail={<Badge type='dot' />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Count string' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge style={{backgroundColor: '#5bc0de'}} type='square' count='hhhhh' />
          </View>
        } topSeparator='full' bottomSeparator='full' />
        <ListRow title='CountStyle' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge count={6} countStyle={{color: '#fff', fontSize: 16, fontWeight: 'bold'}} />
            <View style={{width: 4}} />
            <Badge type='square' count={88} countStyle={{color: '#ff0', fontSize: 12}} />
          </View>
        } topSeparator='full' />
        <ListRow title='MaxCount' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge count={100} maxCount={99} />
            <View style={{width: 4}} />
            <Badge count={500} maxCount={200} />
            <View style={{width: 4}} />
            <Badge count={1000} maxCount={999} />
          </View>
        } bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Count string' detail={
          <View style={{flexDirection: 'row'}}>
            <Badge style={{backgroundColor: '#5bc0de'}} type='square' count='券' />
            <View style={{width: 4}} />
            <Badge style={{backgroundColor: '#777', paddingLeft: 0, paddingRight: 0}}>
              <Text style={{color: '#fff'}}>$</Text>
            </Badge>
          </View>
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
