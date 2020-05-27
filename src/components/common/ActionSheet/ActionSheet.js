import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet'; 
import Icon from '../Icon';
import colors from 'config/colors';

export default class ActionSheet extends React.Component {
  static defaultProps = {
    dismissOnPress: true,
    onPress: () => null,
  };

  _actionSheet = ref => this.actionSheet = ref;
  open = () => this.actionSheet.open();

  _cancel = () => this.actionSheet.close();
  _onPress = (value) =>  {
    this.props.onPress(value);
    if (this.props.dismissOnPress) {
      this._cancel();
    }
  };

  render() {
    const { title, options=[] } = this.props;
    return (
      <RBSheet
        ref={this._actionSheet}
        height={300}
        closeOnDragDown
        customStyles={{
          container: styles.container
        }}
      >
        <View style={styles.content}>
          <View style={[styles.header, styles.row]}>
            <TouchableOpacity onPress={this._cancel}>
              <Icon name="x" size={28} style={styles.icon} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</Text>
          </View>
          <View style={styles.body}>
            {
              options.map(option => (
                <TouchableOpacity style={styles.option} onPress={() => this._onPress(option.value)}>
                  <View style={styles.row}>
                    {option.icon ? <Icon style={styles.icon} name={option.icon} size={24} /> : null}
                    <Text style={styles.label}>{option.label}</Text>
                  </View>
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
    paddingHorizontal: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  content: {
    padding: 16
  },
  header: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.light_gray_3,
    paddingBottom: 16
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 16 
  }
});