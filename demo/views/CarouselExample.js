// CarouselExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, Dimensions, Switch, Alert} from 'react-native';

import {NavigationPage, ListRow, Carousel, PullPicker, Label, Toast} from 'teaset';

const SIMULATED_STATUS_BAR_HEIGHT = 24;
const SIMULATED_NAV_BAR_HEIGHT = 56;
const SIMULATED_OVERLAY_HEIGHT = SIMULATED_STATUS_BAR_HEIGHT + SIMULATED_NAV_BAR_HEIGHT;

export default class CarouselExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Carousel',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.carouselRef = null;
    this.controlItems = ['none', 'default', 'custom'];
    this.directionItems = ['forward', 'backward'];
    this.intervalItems = [1000, 2000, 3000, 5000, 8000];
    this.scrollEventThrottleItems = [1, 16, 50, 100, 200, 500, 1000];
    this.scrollEventCount = 0;
    this.lastScrollEventTime = Date.now();
    Object.assign(this.state, {
      width: Dimensions.get('window').width,
      control: 'default',
      direction: 'forward',
      carousel: true,
      interval: 3000,
      startIndex: 0,
      cycle: true,
      horizontal: true,
      pagingEnabled: true,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      alwaysBounceHorizontal: false,
      alwaysBounceVertical: false,
      bounces: false,
      scrollEventThrottle: 200,
      currentIndex: 0,
      totalPages: 3,
      scrollEventCounter: 0,
      scrollEventRate: 0,
      automaticallyAdjustContentInsets: false,
      contentInsetTop: 0,
    });
  }
  
  componentWillUnmount() {
    if (this.pickerKey) {
      PullPicker.hide(this.pickerKey);
    }
  }

  selectControl() {
    this.pickerKey = PullPicker.show(
      'Control',
      this.controlItems,
      this.controlItems.indexOf(this.state.control),
      (item, index) => {
        this.pickerKey = null;
        this.setState({control: item});
        console.log('[Carousel] Control changed to:', item);
      }
    );
  }

  selectDirection() {
    this.pickerKey = PullPicker.show(
      'Direction',
      this.directionItems,
      this.directionItems.indexOf(this.state.direction),
      (item, index) => {
        this.pickerKey = null;
        this.setState({direction: item});
        console.log('[Carousel] Direction changed to:', item);
      }
    );
  }

  selectScrollEventThrottle() {
    this.pickerKey = PullPicker.show(
      'Scroll Event Throttle',
      this.scrollEventThrottleItems,
      this.scrollEventThrottleItems.indexOf(this.state.scrollEventThrottle),
      (item, index) => {
        this.pickerKey = null;
        this.setState({
          scrollEventThrottle: item,
          scrollEventCounter: 0,
          scrollEventRate: 0,
        });
        this.scrollEventCount = 0;
        console.log('[Carousel] scrollEventThrottle changed to:', item, 'ms');
        Toast.message(`Throttle: ${item}ms - Try scrolling manually to see the difference`, {position: 'top', duration: 2000});
      }
    );
  }

  selectInterval() {
    this.pickerKey = PullPicker.show(
      'Interval (milliseconds)',
      this.intervalItems,
      this.intervalItems.indexOf(this.state.interval),
      (item, index) => {
        this.pickerKey = null;
        this.setState({interval: item});
        console.log('[Carousel] interval changed to:', item, 'ms');
        Toast.message(`Interval set to ${item}ms`, {position: 'top', duration: 1500});
      }
    );
  }

  selectStartIndex() {
    const options = Array.from({length: this.state.totalPages}, (_, idx) => idx);
    this.pickerKey = PullPicker.show(
      'startIndex',
      options,
      options.indexOf(this.state.startIndex),
      (item, index) => {
        this.pickerKey = null;
        this.setState({startIndex: item, currentIndex: item}, () => {
          this.carouselRef?.scrollToPage(item, true);
        });
        console.log('[Carousel] startIndex changed to:', item);
        Toast.message(`Start at page ${item + 1}`, {position: 'top', duration: 1500});
      }
    );
  }

  handleScroll(event) {
    const now = Date.now();
    const timeDiff = now - this.lastScrollEventTime;
    this.scrollEventCount++;
    this.lastScrollEventTime = now;

    const insetTop = this.state.automaticallyAdjustContentInsets ? SIMULATED_OVERLAY_HEIGHT : 0;
    this.setState(prevState => {
      let nextState = {
        scrollEventCounter: this.scrollEventCount,
        scrollEventRate: timeDiff,
      };
      if (prevState.contentInsetTop !== insetTop) {
        nextState.contentInsetTop = insetTop;
      }
      return nextState;
    });
    
    console.log(`[Carousel] onScroll #${this.scrollEventCount} - Time since last: ${timeDiff}ms`);
  }

  resetScrollCounter() {
    this.scrollEventCount = 0;
    this.lastScrollEventTime = Date.now();
    this.setState({
      scrollEventCounter: 0,
      scrollEventRate: 0,
    });
    console.log('[Carousel] Scroll event counter reset');
    Toast.message('Counter reset - Now scroll manually', {position: 'top', duration: 1500});
  }

  handleCarouselChange(index, total) {
    this.setState({currentIndex: index, totalPages: total});
    console.log(`[Carousel] onChange callback - Current page: ${index + 1}/${total}`);
    Toast.message(`Page ${index + 1} of ${total}`, {position: 'top', duration: 1000});
  }

  scrollToSpecificPage() {
    Alert.alert(
      'Scroll to Page',
      'Choose page to scroll to:',
      [
        {text: 'Page 1', onPress: () => {
          this.carouselRef?.scrollToPage(0, true);
          console.log('[Carousel] scrollToPage(0, true) called');
        }},
        {text: 'Page 2', onPress: () => {
          this.carouselRef?.scrollToPage(1, true);
          console.log('[Carousel] scrollToPage(1, true) called');
        }},
        {text: 'Page 3', onPress: () => {
          this.carouselRef?.scrollToPage(2, true);
          console.log('[Carousel] scrollToPage(2, true) called');
        }},
        {text: 'Cancel', style: 'cancel'},
      ]
    );
  }

  scrollToNext() {
    this.carouselRef?.scrollToNextPage(true);
    console.log('[Carousel] scrollToNextPage(true) called');
    Toast.message('Scrolling to next page', {position: 'top', duration: 1000});
  }

  renderControl() {
    let {control} = this.state;
    if (control === 'default') {
      return <Carousel.Control />;
    } else if (control === 'custom') {
      return (
        <Carousel.Control
          style={{alignItems: 'flex-end', paddingRight: 10}}
          dot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4, fontSize: 20}}>□</Text>}
          activeDot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#ff5722', padding: 4, fontSize: 20}}>■</Text>}
          />
      );
    }
    return null;
  }

  renderPage() {
    let {width, carousel, interval, direction, cycle, horizontal, pagingEnabled,
      showsHorizontalScrollIndicator, showsVerticalScrollIndicator,
      alwaysBounceHorizontal, alwaysBounceVertical, bounces, scrollEventThrottle,
      automaticallyAdjustContentInsets, startIndex,
      control, currentIndex, totalPages, scrollEventCounter, scrollEventRate, contentInsetTop} = this.state;

    // 动态计算高度：横向时固定高度，纵向时根据内容调整
    const carouselHeight = horizontal ? 238 : 238;
    const imageHeight = horizontal ? 238 : 238;
    const simulatedInsetTop = automaticallyAdjustContentInsets ? SIMULATED_OVERLAY_HEIGHT : 0;
    const previewHeight = carouselHeight + SIMULATED_OVERLAY_HEIGHT;
    
    return (
      <View style={{flex: 1}}>
        <View style={{height: 10}} />
        <View style={{paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f0f0f0'}}>
          <Label style={{fontSize: 12, color: '#666'}} text={`Current: Page ${currentIndex + 1} / ${totalPages}`} />
        </View>
        <View style={{paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff3cd', borderBottomWidth: 1, borderBottomColor: '#ffc107'}}>
          <Label style={{fontSize: 11, color: '#856404', fontWeight: 'bold'}} text={`Scroll Events: ${scrollEventCounter} times | Last interval: ${scrollEventRate}ms`} />
          <Label style={{fontSize: 10, color: '#856404', marginTop: 2}} text='👆 Manually scroll the carousel above to see event frequency' />
        </View>

        <View style={{height: previewHeight, backgroundColor: '#00000008'}}>
          <View style={styles.overlayContainer} pointerEvents='none'>
            <View style={styles.overlayStatusSpacer} />
            <View style={styles.overlayNavBar}>
              <Text style={styles.overlayTitle}>Translucent Header (simulated)</Text>
            </View>
          </View>
          <View style={[styles.carouselShell, automaticallyAdjustContentInsets ? {paddingTop: simulatedInsetTop} : null]}>
            <Carousel
              ref={ref => this.carouselRef = ref}
              style={{flex: 1}}
              carousel={carousel}
              interval={interval}
              startIndex={startIndex}
              direction={direction}
              cycle={cycle}
              control={this.renderControl()}
              horizontal={horizontal}
              pagingEnabled={pagingEnabled}
              showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              alwaysBounceHorizontal={alwaysBounceHorizontal}
              alwaysBounceVertical={alwaysBounceVertical}
              bounces={bounces}
              scrollEventThrottle={scrollEventThrottle}
              automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}
              onScroll={(event) => this.handleScroll(event)}
              onChange={(index, total) => this.handleCarouselChange(index, total)}
              onLayout={e => this.setState({width: e.nativeEvent.layout.width})}
            >
              <Image style={{width, height: imageHeight}} resizeMode='cover' source={require('../images/teaset1.jpg')} />
              <Image style={{width, height: imageHeight}} resizeMode='cover' source={require('../images/teaset2.jpg')} />
              <Image style={{width, height: imageHeight}} resizeMode='cover' source={require('../images/teaset3.jpg')} />
            </Carousel>
          </View>
        </View>

        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 20}}
          nestedScrollEnabled
        >
          <View style={{height: 20}} />

          {/* 基础属性 */}
          <ListRow 
            title='Control' 
            detail={control} 
            onPress={() => this.selectControl()} 
            topSeparator='full' 
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='dot & activeDot props for custom control' />
          </View>

          <ListRow
            title='interval'
            detail={`${interval}ms`}
            onPress={() => this.selectInterval()}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Adjust autoplay delay when carousel=true' />
          </View>

          <ListRow
            title='Carousel (auto play)'
            detail={<Switch value={carousel} onValueChange={value => {
              this.setState({carousel: value});
              console.log('[Carousel] carousel prop:', value);
            }} />}
          />

          <ListRow
            title='Direction'
            detail={direction}
            onPress={() => this.selectDirection()}
          />

          <ListRow
            title='startIndex'
            detail={`Page ${startIndex + 1}`}
            onPress={() => this.selectStartIndex()}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='0-based index for initial visible page' />
          </View>

          <ListRow
            title='Cycle (loop)'
            detail={<Switch value={cycle} onValueChange={value => {
              this.setState({cycle: value});
              console.log('[Carousel] cycle prop:', value);
            }} />}
          />

          {/* ScrollView 继承属性 */}
          <View style={{height: 20}} />
          <ListRow
            title='horizontal'
            detail={<Switch value={horizontal} onValueChange={value => {
              this.setState({horizontal: value});
              console.log('[Carousel] horizontal prop:', value);
            }} />}
            topSeparator='full'
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Change scroll direction (inherited from ScrollView)' />
          </View>

          <ListRow
            title='pagingEnabled'
            detail={<Switch value={pagingEnabled} onValueChange={value => {
              this.setState({pagingEnabled: value});
              console.log('[Carousel] pagingEnabled prop:', value);
            }} />}
          />

          <ListRow
            title='showsHorizontalScrollIndicator'
            detail={<Switch value={showsHorizontalScrollIndicator} onValueChange={value => {
              this.setState({showsHorizontalScrollIndicator: value});
              console.log('[Carousel] showsHorizontalScrollIndicator prop:', value);
            }} />}
          />

          <ListRow
            title='showsVerticalScrollIndicator'
            detail={<Switch value={showsVerticalScrollIndicator} onValueChange={value => {
              this.setState({showsVerticalScrollIndicator: value});
              console.log('[Carousel] showsVerticalScrollIndicator prop:', value);
            }} />}
          />

          <ListRow
            title='alwaysBounceHorizontal'
            detail={<Switch value={alwaysBounceHorizontal} onValueChange={value => {
              this.setState({alwaysBounceHorizontal: value});
              console.log('[Carousel] alwaysBounceHorizontal prop:', value);
            }} />}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='需开启bounces，在Cycle为false的情况下，可见最后一张图片回弹' />
          </View>
          <ListRow
            title='alwaysBounceVertical'
            detail={<Switch value={alwaysBounceVertical} onValueChange={value => {
              this.setState({alwaysBounceVertical: value});
              console.log('[Carousel] alwaysBounceVertical prop:', value);
            }} />}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='需开启bounces，在Cycle为false的情况下，可见最后一张图片回弹' />
          </View>
          <ListRow
            title='bounces'
            detail={<Switch value={bounces} onValueChange={value => {
              this.setState({bounces: value});
              console.log('[Carousel] bounces prop:', value);
            }} />}
          />

          <ListRow
            title='automaticallyAdjustContentInsets'
            detail={<Switch value={automaticallyAdjustContentInsets} onValueChange={value => {
              const simulatedTop = value ? SIMULATED_OVERLAY_HEIGHT : 0;
              this.setState({
                automaticallyAdjustContentInsets: value,
                contentInsetTop: simulatedTop,
              });
              console.log('[Carousel] automaticallyAdjustContentInsets prop:', value);
            }} />}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Adjust content inset automatically (iOS only)' />
          </View>

          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label
              style={{color: '#999', fontSize: 11}}
              text='Simulated iOS effect: enabling this adds a top inset so the carousel no longer hides beneath the translucent header'
            />
            <Label
              style={{color: '#666', fontSize: 11, marginTop: 4}}
              text={`Current contentInset.top: ${contentInsetTop}px`}
            />
          </View>

          <ListRow
            title='scrollEventThrottle'
            detail={`${scrollEventThrottle}ms`}
            onPress={() => this.selectScrollEventThrottle()}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Controls scroll event frequency (1/16/50/100/200/500/1000ms)' />
            <Label style={{color: '#ff5722', fontSize: 11, marginTop: 2}} text='⚠️ Test: Turn OFF "Carousel", turn ON "bounces", then manually scroll to see difference' />
          </View>

          <ListRow
            title='Reset Scroll Counter'
            detail='Tap to reset'
            onPress={() => this.resetScrollCounter()}
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Reset counter before testing different throttle values' />
          </View>

          {/* 方法调用 */}
          <View style={{height: 20}} />
          <ListRow
            title='scrollToPage(index, animated)'
            detail='Tap to select page'
            onPress={() => this.scrollToSpecificPage()}
            topSeparator='full'
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Method: Scroll to specific page with animation' />
          </View>

          <ListRow
            title='scrollToNextPage(animated)'
            detail='Tap to scroll next'
            onPress={() => this.scrollToNext()}
            bottomSeparator='full'
          />
          <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
            <Label style={{color: '#999', fontSize: 11}} text='Method: Scroll to next page with animation' />
          </View>

          <View style={{height: 20}} />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  overlayStatusSpacer: {
    height: SIMULATED_STATUS_BAR_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayNavBar: {
    height: SIMULATED_NAV_BAR_HEIGHT,
    backgroundColor: 'rgba(33, 150, 243, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  carouselShell: {
    flex: 1,
    overflow: 'hidden',
  },
});
