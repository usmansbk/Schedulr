import React, { PureComponent } from 'react';
import Firebase from 'react-native-firebase';

const GROUP_EVENT_PATH = '../../../containers/screens/NewGroupEvent';
const NEW_EVENT_PATH = '../../../containers/screens/NewEvent';
const EDIT_FORM_PATH = '../../../containers/screens/EditEvent';
const RESCHDL_EVENT_PATH = '../../../containers/screens/ReschdlEvent';

let Form = null;

export default class EventForm extends PureComponent {

  _onBack = () => this.props.navigation.goBack();

  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('event_form');
  }

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  render() {
    const id = this.props.navigation.getParam('id');
    const action = this.props.navigation.getParam('action');
    const title = this.props.navigation.getParam('title');
    
    if (id && !action) {
      Form = require(GROUP_EVENT_PATH).default;
    } else if (action === 'reschdl') {
      Form = require(RESCHDL_EVENT_PATH).default;
    } else if (action === 'edit') {
      Form = require(EDIT_FORM_PATH).default;
    } else {
      Form = require(NEW_EVENT_PATH).default;
    }

    return (
      <Form
        id={id}
        title={title}
        onBack={this._onBack}
      />
    )
  }
}