import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';

class Fab extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const shouldUpdate =
      nextProps.disabled !== this.props.disabled ||
      nextProps.icon !== this.props.icon ||
      nextProps.label !== this.props.label;
    return shouldUpdate;
  };

  _renderIcon = () => <Icon size={24} color="white" name={this.props.icon} />;

  _onPress = () => this.props.onPress();

  render() {
    const {label, small, stores, secondary, disabled, danger} = this.props;
    return (
      <FAB
        label={label}
        onPress={this._onPress}
        theme={{
          colors: {
            accent: danger
              ? stores.theme.colors.light_red
              : stores.theme.colors.primary_dark,
          },
        }}
        style={secondary ? styles.secondary : styles.fab}
        color="#fff"
        icon={this._renderIcon}
        small={small || secondary}
        disabled={disabled}
      />
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  secondary: {
    position: 'absolute',
    margin: 16,
    right: 6,
    bottom: 80,
  },
});

export default inject('stores')(observer(Fab));
