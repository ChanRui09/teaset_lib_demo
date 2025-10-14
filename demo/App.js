import React, {Component} from 'react';

import {TeaNavigator, Theme} from 'teaset';
import TeasetExampleHome from './views/Home';

class App extends Component {
  render() {
    return <TeaNavigator rootView={<TeasetExampleHome />} />;
  }
}

export default {
  displayName: 'teaset',
  framework: 'React',
  category: 'UI',
  title: 'teaset',
  documentationURL: 'teaset',
  description: '',
  examples: [
    {
      title: 'teaset',
      render: function () {
        return <App />;
      },
    },
  ],
};