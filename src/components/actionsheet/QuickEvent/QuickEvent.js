import React from 'react';
import {StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import QuickEventForm from 'components/forms/QuickEvent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default class QuickEvent extends React.Component {
  _ref = (ref) => (this.sheet = ref);
  open = () => this.sheet.open();
  render() {
    return (
      <RBSheet height={300} ref={this._ref} customStyles={styles}>
        <QuickEventForm />
      </RBSheet>
    );
  }
}
