// LabelExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, Label} from 'teaset';

export default class LabelExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Label',
    showBackButton: true,
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Type default' detail={<Label text='Label' />} topSeparator='full' />
        <ListRow title='Type title' detail={<Label text='Label' type='title' />} />
        <ListRow title='Type detail' detail={<Label text='Label' type='detail' />} />
        <ListRow title='Type danger' detail={<Label text='Label' type='danger' />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Size xs' detail={<Label text='Label' size='xs'/>} topSeparator='full' />
        <ListRow title='Size sm' detail={<Label text='Label' size='sm'/>} />
        <ListRow title='Size md' detail={<Label text='Label' size='md'/>} />
        <ListRow title='Size lg' detail={<Label text='Label' size='lg'/>} />
        <ListRow title='Size xl' detail={<Label text='Label' size='xl'/>} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Text number' detail={<Label text={123} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='numberOfLines 1' detail={<Label style={{width: 200}} text='This is a very long text that will be truncated to one line' numberOfLines={1} />} topSeparator='full' />
        <ListRow title='numberOfLines 2' detail={<Label style={{width: 200}} text='This is a very long text that will be truncated to two lines when it exceeds the width' numberOfLines={2} />} />
        <ListRow title='numberOfLines 3' detail={<Label style={{width: 200}} text='This is a very long text that will be truncated to three lines when it exceeds the width limit of the container' numberOfLines={3} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <ListRow title='Custom' detail={<Label style={{color: '#8a6d3b', fontSize: 16}} text='Custom' />} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
