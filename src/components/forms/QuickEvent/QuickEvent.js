import React from 'react';
import {View, StyleSheet} from 'react-native';
import {I18n} from 'aws-amplify';
import {Text} from 'react-native-paper';
import TextInput from 'components/common/TextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default class QuickEvent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={I18n.get('PLACEHOLDER_untitledEvent')}
          label={I18n.get('EVENT_FORM_title')}
        />
      </View>
    );
  }
}
