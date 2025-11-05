// ListRowExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import {NavigationPage, ListRow, Label} from 'teaset';

export default class ListRowExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: ' ListRow',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{height: 20}} />
        <ListRow title='Title' detail='Detail' topSeparator='full' />
        <ListRow title='Title style' detail='Styled with titleStyle' titleStyle={{fontSize: 18, color: '#31708f'}} />
        <ListRow title={<Label style={{fontSize: 18, color: '#31708f'}} text='Custom title' />} />
        <ListRow title='Detail style' detail='Primary detail text' detailStyle={{color: '#1b5e20', fontSize: 16}} />
        <ListRow title='Custom detail' detail={
          <View style={{backgroundColor: '#5bc0de', width: 60, height: 24, borderRadius: 4}} />
        } />
        <ListRow title='Long detail' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } />
        <ListRow
          title='Detail multiline'
          detail={
            'This row sets detailMultiLine to explicitly allow wrapping even with title on the left. React Native makes it painless to create cross-platform apps.'
          }
          detailMultiLine
        />
        <ListRow title='Title place top' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } titlePlace='top' />
        <ListRow title='Title place none' titlePlace='none' detail='Only detail content will render when titlePlace is set to none.' />
        <ListRow title='Icon' icon={require('../icons/config.png')} />
        <ListRow title='Accessory indicator' accessory='indicator' />
        <ListRow title='Accessory check' accessory='check' detail='Mark as selected' />
        <ListRow title='Accessory empty' accessory='empty' detail='Reserve indicator spacing' />
        <ListRow title='Custom accessory' accessory={<Image source={require('../icons/location.png')} />} />
        <ListRow title='Press able' onPress={() => alert('Press!')} />
        <ListRow
          title='Swipe able - Basic'
          detail='Swipe to show action buttons'
          swipeActions={[
            <ListRow.SwipeActionButton title='Cancel' />,
            <ListRow.SwipeActionButton title='Remove' type='danger' onPress={() => alert('Remove')}/>,          
          ]}
          />
        <ListRow
          title='Swipe - type: default'
          detail='Default type button (gray)'
          swipeActions={[
            <ListRow.SwipeActionButton title='Edit' type='default' onPress={() => alert('Edit')}/>,
            <ListRow.SwipeActionButton title='Share' type='default' onPress={() => alert('Share')}/>,
          ]}
          />
        <ListRow
          title='Swipe - type: danger'
          detail='Danger type button (red)'
          swipeActions={[
            <ListRow.SwipeActionButton title='Delete' type='danger' onPress={() => alert('Delete')}/>,
            <ListRow.SwipeActionButton title='Block' type='danger' onPress={() => alert('Block')}/>,
          ]}
          />
        <ListRow
          title='Swipe - Custom titleStyle'
          detail='Custom text style'
          swipeActions={[
            <ListRow.SwipeActionButton 
              title='Info' 
              type='default'
              titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}
              onPress={() => alert('Info')}
            />,
            <ListRow.SwipeActionButton 
              title='Star' 
              type='default'
              titleStyle={{fontSize: 14, fontStyle: 'italic', color: '#ffeb3b'}}
              onPress={() => alert('Star')}
            />,
          ]}
          />
        <ListRow
          title='Swipe - Custom title (element)'
          detail='Use custom React component'
          swipeActions={[
            <ListRow.SwipeActionButton 
              type='default'
              title={
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#fff', fontSize: 16}}>📝</Text>
                  <Text style={{color: '#fff', fontSize: 12}}>Edit</Text>
                </View>
              }
              onPress={() => alert('Edit')}
            />,
            <ListRow.SwipeActionButton 
              type='danger'
              title={
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#fff', fontSize: 16}}>🗑️</Text>
                  <Text style={{color: '#fff', fontSize: 12}}>Delete</Text>
                </View>
              }
              onPress={() => alert('Delete')}
            />,
          ]}
          />
        <ListRow
          title='Swipe - Multiple actions'
          detail='Show 3+ action buttons'
          swipeActions={[
            <ListRow.SwipeActionButton title='Archive' type='default' onPress={() => alert('Archive')}/>,
            <ListRow.SwipeActionButton title='Flag' type='default' onPress={() => alert('Flag')}/>,
            <ListRow.SwipeActionButton title='Delete' type='danger' onPress={() => alert('Delete')}/>,
          ]}
          />
        <ListRow
          title='Swipe - Number title'
          detail='Title can be string or number'
          swipeActions={[
            <ListRow.SwipeActionButton title={123} type='default' onPress={() => alert('Number: 123')}/>,
            <ListRow.SwipeActionButton title={456} type='danger' onPress={() => alert('Number: 456')}/>,
          ]}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
