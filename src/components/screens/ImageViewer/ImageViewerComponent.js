import React, { PureComponent } from 'react';
import Firebase from 'react-native-firebase';

const EVENT_VIEWER_PATH = '../../../containers/EventImageViewer';
const GROUP_VIEWER_PATH = '../../../containers/GroupImageViewer';

let Viewer = null;

export default class ImageViewerComponent extends PureComponent {
  componentDidMount = () => Firebase.analytics().setCurrentScreen('image_viewer');
  
  static navigationOptions = () => {
    return {
      header: null
    }
  };
  
  render() {
    const title = this.props.navigation.getParam('name');
    const action = this.props.navigation.getParam('action');
    const id = this.props.navigation.getParam('id');

    // if (action === 'event') {
    //   Viewer = require(EVENT_VIEWER_PATH).default;
    // } else if (action === 'group') {
      Viewer = require(GROUP_VIEWER_PATH).default;
    // }
    return (
      <Viewer
        id={id}
        title={title}
        navigation={this.props.navigation}
      />
    );
  }
}