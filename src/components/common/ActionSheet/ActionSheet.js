import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet'; 
import { I18n } from 'aws-amplify';
import Button from '../Button';
import colors from 'config/colors';

export default class ActionSheet extends React.Component {
  _actionSheet = ref => this.actionSheet = ref;
  open = () => this.actionSheet.open();

  _cancel = () => this.actionSheet.close();

  render() {
    const { title, options=[] } = this.props;
    return (
      <RBSheet
        ref={this._actionSheet}
        height={options.length * 100}
        closeOnDragDown
        customStyles={{
          container: styles.container
        }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</Text>
          </View>
          <View style={styles.body}>
            {
              options.map(option => (
                <TouchableOpacity style={styles.option}>
                  <Text style={styles.label}>{option}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16
  },
  content: {
    padding: 16
  },
  header: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.light_gray_3,
  },
  body: {},
  footer: {},
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.light_gray_3
  },
  option: {
    marginVertical: 16
  }
});