// ListRowExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text, Switch, StyleSheet} from 'react-native';

import {NavigationPage, ListRow, Label} from 'teaset';
import SelectRow from './SelectRow';

const ICONS = {
  config: require('../icons/config.png'),
  location: require('../icons/location.png'),
  smile: require('../icons/smile.png'),
};

const LONG_DETAIL = 'React Native enables you to build world-class app experiences using JavaScript and React while keeping native performance.';

export default class ListRowExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'ListRow',
    showBackButton: true,
  };

  constructor(props) {
    super(props);

    this.titleOptions = [
      {key: 'text', label: 'String: "List item"', type: 'text', value: 'List item'},
      {key: 'number', label: 'Number: 2025', type: 'number', value: 2025},
      {key: 'element', label: 'Custom element (Label)', type: 'element'},
      {key: 'none', label: 'Empty (null)', type: 'none', value: null},
    ];

    this.detailOptions = [
      {key: 'text', label: 'String: "Detail"', type: 'text', value: 'Detail'},
      {key: 'long', label: 'Long string', type: 'text', value: LONG_DETAIL},
      {key: 'number', label: 'Number: 99', type: 'number', value: 99},
      {key: 'element', label: 'Custom element (View)', type: 'element'},
      {key: 'none', label: 'Empty (null)', type: 'none', value: null},
    ];

    this.iconOptions = [
      {key: 'none', label: 'None', source: null},
      {key: 'config', label: 'Config icon', source: ICONS.config},
      {key: 'location', label: 'Location icon', source: ICONS.location},
      {key: 'smile', label: 'Smile icon', source: ICONS.smile},
    ];

    this.accessoryOptions = [
      {key: 'auto', label: 'auto'},
      {key: 'none', label: 'none'},
      {key: 'indicator', label: 'indicator'},
      {key: 'check', label: 'check'},
      {key: 'empty', label: 'empty'},
      {key: 'custom', label: 'Custom element (Image)'},
    ];

    this.separatorOptions = [
      {key: 'none', label: 'none'},
      {key: 'full', label: 'full'},
      {key: 'indent', label: 'indent (view)'},
    ];

    this.titlePlaceOptions = [
      {key: 'left', label: 'left'},
      {key: 'top', label: 'top'},
      {key: 'none', label: 'none'},
    ];

    this.swipeActionOptions = [
      {key: 'none', label: 'None'},
      {key: 'default', label: 'Two default buttons'},
      {key: 'danger', label: 'Two danger buttons'},
      {key: 'mixed', label: 'Custom element buttons'},
      {key: 'configurable', label: 'ListRow.SwipeActionButton'},
    ];

    this.activeOpacityOptions = [
      {key: 'default', label: 'Default (auto)'},
      {key: '0.2', label: '0.2'},
      {key: '0.5', label: '0.5'},
      {key: '1', label: '1.0'},
    ];

    this.swipeButtonTypeOptions = [
      {key: 'default', label: 'default - danger'},
      {key: 'danger', label: 'danger - default'},
    ];

    this.swipeButtonTitleOptions = [
      {key: 'text', label: 'String: "Action"', type: 'text', value: 'Action'},
      {key: 'number', label: 'Number: 520', type: 'number', value: 520},
      {key: 'element', label: 'Custom element (View)', type: 'element'},
    ];

    this.state = {
      titleKey: 'text',
      detailKey: 'text',
      titleStyleEnabled: true,
      detailStyleEnabled: false,
      detailMultiLine: false,
      iconKey: 'config',
      accessoryKey: 'auto',
      topSeparatorKey: 'full',
      bottomSeparatorKey: 'indent',
      titlePlaceKey: 'left',
      swipeActionsKey: 'default',
      activeOpacityKey: 'default',
      swipeButtonTypeKey: 'default',
      swipeButtonTitleKey: 'text',
      swipeButtonTitleStyleEnabled: true,
    };
  }

  findOption(options, key) {
    if (!(options instanceof Array)) return null;
    return options.find(item => item.key === key) || options[0];
  }

  resolveTitle() {
    const option = this.findOption(this.titleOptions, this.state.titleKey);
    if (!option) return 'List item';
    if (option.type === 'element') {
      return (
        <Label style={{fontSize: 18, color: '#31708f'}} text='Element title' />
      );
    }
    return option.value;
  }

  resolveDetail() {
    const option = this.findOption(this.detailOptions, this.state.detailKey);
    if (!option) return 'Detail';
    if (option.type === 'element') {
      return this.renderDetailBadge();
    }
    return option.value;
  }

  resolveTitleStyle() {
    const option = this.findOption(this.titleOptions, this.state.titleKey);
    if (!this.state.titleStyleEnabled) return undefined;
    if (option && option.type === 'element') return undefined;
    return styles.titleStyle;
  }

  resolveDetailStyle() {
    const option = this.findOption(this.detailOptions, this.state.detailKey);
    if (!this.state.detailStyleEnabled) return undefined;
    if (option && option.type === 'element') return undefined;
    return styles.detailStyle;
  }

  resolveIcon() {
    const option = this.findOption(this.iconOptions, this.state.iconKey);
    return option ? option.source : null;
  }

  resolveAccessory() {
    const {accessoryKey} = this.state;
    if (accessoryKey === 'custom') {
      return this.renderCustomAccessory();
    }
    return accessoryKey;
  }

  resolveSeparator(key) {
    const option = this.findOption(this.separatorOptions, key);
    if (!option) return 'none';
    return option.key;
  }

  resolveSwipeButtonTitle() {
    const option = this.findOption(this.swipeButtonTitleOptions, this.state.swipeButtonTitleKey);
    if (!option) return 'Action';
    if (option.type === 'element') {
      return this.renderSwipeButtonTitleElement();
    }
    return option.value;
  }

  resolveSwipeButtonTitleStyle() {
    const option = this.findOption(this.swipeButtonTitleOptions, this.state.swipeButtonTitleKey);
    if (!this.state.swipeButtonTitleStyleEnabled) return undefined;
    if (option && option.type === 'element') return undefined;
    return styles.swipeButtonTitleStyle;
  }

  resolveSwipeActions() {
    switch (this.state.swipeActionsKey) {
      case 'default':
        return [
          <ListRow.SwipeActionButton key='edit' title='Edit' type='default' onPress={() => alert('Edit')} />,
          <ListRow.SwipeActionButton key='share' title='Share' type='default' onPress={() => alert('Share')} />,
        ];
      case 'danger':
        return [
          <ListRow.SwipeActionButton key='delete' title='Delete' type='danger' onPress={() => alert('Delete')} />,
          <ListRow.SwipeActionButton key='block' title='Block' type='danger' onPress={() => alert('Block')} />,
        ];
      case 'mixed':
        return [
          <ListRow.SwipeActionButton
            key='edit-element'
            type='default'
            title={
              <View style={styles.swipeTitleContainer}>
                <Text style={styles.swipeEmoji}>📝</Text>
                <Text style={styles.swipeTitleText}>Edit</Text>
              </View>
            }
            onPress={() => alert('Edit')}
          />,
          <ListRow.SwipeActionButton
            key='delete-element'
            type='danger'
            title={
              <View style={styles.swipeTitleContainer}>
                <Text style={styles.swipeEmoji}>🗑️</Text>
                <Text style={styles.swipeTitleText}>Delete</Text>
              </View>
            }
            onPress={() => alert('Delete')}
          />,
        ];
      case 'configurable': {
        const selectedType = this.state.swipeButtonTypeKey === 'danger' ? 'danger' : 'default';
        const secondaryType = selectedType === 'danger' ? 'default' : 'danger';
        return [
          <ListRow.SwipeActionButton
            key='primary-config'
            type={selectedType}
            title={this.resolveSwipeButtonTitle()}
            titleStyle={this.resolveSwipeButtonTitleStyle()}
            onPress={() => alert('Primary action')}
          />,
          <ListRow.SwipeActionButton
            key='secondary-config'
            type={secondaryType}
            title='Secondary'
            onPress={() => alert('Secondary action')}
          />,
        ];
      }
      default:
        return undefined;
    }
  }

  resolveActiveOpacity() {
    const option = this.findOption(this.activeOpacityOptions, this.state.activeOpacityKey);
    if (!option || option.key === 'default') return undefined;
    return parseFloat(option.key);
  }

  renderDetailBadge() {
    return (
      <View style={styles.detailBadge}>
        <Text style={styles.detailBadgeText}>Detail</Text>
      </View>
    );
  }

  renderCustomAccessory() {
    return (
      <View style={styles.customAccessory}>
        <Image source={ICONS.location} style={styles.customAccessoryIcon} />
      </View>
    );
  }

  renderSwipeButtonTitleElement() {
    return (
      <View style={styles.swipeTitleContainer}>
        <Text style={styles.swipeEmoji}>⭐</Text>
        <Text style={styles.swipeTitleText}>Star</Text>
      </View>
    );
  }

  renderPreviewRow() {
    const title = this.state.titlePlaceKey === 'none' ? null : this.resolveTitle();
    return (
      <ListRow
        title={title}
        detail={this.resolveDetail()}
        titleStyle={this.resolveTitleStyle()}
        detailStyle={this.resolveDetailStyle()}
        detailMultiLine={this.state.detailMultiLine}
        icon={this.resolveIcon()}
        accessory={this.resolveAccessory()}
        topSeparator={this.resolveSeparator(this.state.topSeparatorKey)}
        bottomSeparator={this.resolveSeparator(this.state.bottomSeparatorKey)}
        titlePlace={this.state.titlePlaceKey}
        swipeActions={this.resolveSwipeActions()}
        activeOpacity={this.resolveActiveOpacity()}
        onPress={() => alert('Row pressed')}
      />
    );
  }

  renderPage() {
    const {
      titleKey,
      detailKey,
      titleStyleEnabled,
      detailStyleEnabled,
      detailMultiLine,
      iconKey,
      accessoryKey,
      topSeparatorKey,
      bottomSeparatorKey,
      titlePlaceKey,
      swipeActionsKey,
      activeOpacityKey,
    } = this.state;

    return (
      <>
        <Label style={styles.previewLabel} text='Preview' />
        <View style={styles.previewContainer}>
          {this.renderPreviewRow()}
        </View>
        <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 48}}>
          <Label style={styles.sectionLabel} text='title' />
          <SelectRow
            title='Value'
            value={titleKey}
            items={this.titleOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({titleKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='detail' />
          <SelectRow
            title='Value'
            value={detailKey}
            items={this.detailOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({detailKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='titleStyle' />
          <ListRow
            title='Enable titleStyle'
            detail={<Switch value={titleStyleEnabled} onValueChange={value => this.setState({titleStyleEnabled: value})} />}
            topSeparator='full'
            bottomSeparator='full'
          />

          <Label style={styles.sectionLabel} text='detailStyle' />
          <ListRow
            title='Enable detailStyle'
            detail={<Switch value={detailStyleEnabled} onValueChange={value => this.setState({detailStyleEnabled: value})} />}
            topSeparator='full'
            bottomSeparator='full'
          />

          <Label style={styles.sectionLabel} text='detailMultiLine' />
          <ListRow
            title='Allow multi-line detail'
            detail={<Switch value={detailMultiLine} onValueChange={value => this.setState({detailMultiLine: value})} />}
            topSeparator='full'
            bottomSeparator='full'
          />

          <Label style={styles.sectionLabel} text='icon' />
          <SelectRow
            title='Source'
            value={iconKey}
            items={this.iconOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({iconKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='accessory' />
          <SelectRow
            title='Type'
            value={accessoryKey}
            items={this.accessoryOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({accessoryKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='topSeparator' />
          <SelectRow
            title='Type'
            value={topSeparatorKey}
            items={this.separatorOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({topSeparatorKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='bottomSeparator' />
          <SelectRow
            title='Type'
            value={bottomSeparatorKey}
            items={this.separatorOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({bottomSeparatorKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='titlePlace' />
          <SelectRow
            title='Position'
            value={titlePlaceKey}
            items={this.titlePlaceOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({titlePlaceKey: item.key})}
            topSeparator='full'
          />

          <Label style={styles.sectionLabel} text='swipeActions' />
          <SelectRow
            title='Preset'
            value={swipeActionsKey}
            items={this.swipeActionOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({swipeActionsKey: item.key})}
            topSeparator='full'
          />

          {swipeActionsKey === 'configurable' && (
            <>
              <Label style={styles.sectionLabel} text='SwipeActionButton.type' />
              <SelectRow
                title='type'
                value={this.state.swipeButtonTypeKey}
                items={this.swipeButtonTypeOptions}
                getItemValue={item => item.key}
                getItemText={item => item.label}
                onSelected={item => this.setState({swipeButtonTypeKey: item.key})}
                topSeparator='full'
              />
              <Label style={styles.sectionLabel} text='SwipeActionButton.title' />
              <SelectRow
                title='title'
                value={this.state.swipeButtonTitleKey}
                items={this.swipeButtonTitleOptions}
                getItemValue={item => item.key}
                getItemText={item => item.label}
                onSelected={item => this.setState({swipeButtonTitleKey: item.key})}
                topSeparator='full'
              />
              <Label style={styles.sectionLabel} text='SwipeActionButton.titleStyle' />
              <ListRow
                title='Enable titleStyle'
                detail={
                  <Switch
                    value={this.state.swipeButtonTitleStyleEnabled}
                    onValueChange={value => this.setState({swipeButtonTitleStyleEnabled: value})}
                  />
                }
                topSeparator='full'
                bottomSeparator='full'
              />
            </>
          )}

          <Label style={styles.sectionLabel} text='activeOpacity' />
          <SelectRow
            title='Value'
            value={activeOpacityKey}
            items={this.activeOpacityOptions}
            getItemValue={item => item.key}
            getItemText={item => item.label}
            onSelected={item => this.setState({activeOpacityKey: item.key})}
            topSeparator='full'
            bottomSeparator='full'
          />
        </ScrollView>
      </>
    );
  }

}

const styles = StyleSheet.create({
  previewLabel: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
    color: '#888',
  },
  previewContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 1,
  },
  sectionLabel: {
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 16,
    color: '#666',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a73e8',
  },
  detailStyle: {
    fontSize: 14,
    color: '#1b5e20',
  },
  detailBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#5bc0de',
  },
  detailBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  customAccessory: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ede7f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customAccessoryIcon: {
    width: 18,
    height: 18,
    tintColor: '#5e35b1',
  },
  swipeTitleContainer: {
    alignItems: 'center',
  },
  swipeEmoji: {
    color: '#fff',
    fontSize: 18,
  },
  swipeTitleText: {
    color: '#fff',
    fontSize: 12,
  },
  swipeButtonTitleStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
