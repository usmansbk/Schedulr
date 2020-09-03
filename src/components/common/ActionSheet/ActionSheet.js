import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {inject, observer} from 'mobx-react';
import Icon from '../Icon';

class ActionSheet extends React.Component {
  static defaultProps = {
    dismissOnPress: true,
    onPress: () => null,
  };

  _actionSheet = (ref) => (this.actionSheet = ref);
  open = () => this.actionSheet.open();
  close = () => this.actionSheet.close();

  _onPress = (value) => {
    this.props.onPress(value);
    if (this.props.dismissOnPress) {
      this.close();
    }
  };

  render() {
    const {title, options = [], height = 300, stores} = this.props;
    const styles = stores.styles.actionsheet;
    return (
      <RBSheet
        ref={this._actionSheet}
        height={height}
        closeOnDragDown
        customStyles={{
          container: styles.container,
        }}>
        <View style={styles.content}>
          <View style={[styles.header, styles.row]}>
            <TouchableOpacity onPress={this.close}>
              <Icon name="back" size={28} style={styles.icon} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.body}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => this._onPress(option.value)}>
                <View style={styles.row}>
                  {option.icon ? (
                    <Icon style={styles.icon} name={option.icon} size={24} />
                  ) : null}
                  <Text style={styles.label}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </RBSheet>
    );
  }
}

export default inject('stores')(observer(ActionSheet));
