import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  (props) => (
    <TouchableRipple
      disabled={props.disabled}
      onPress={props.onPress}
      style={[props.stores.appStyles.datePicker.pickerButton, props.style]}
    >
      <Text style={[
        {
        color: props.disabled ? props.stores.themeStore.colors.gray : props.stores.themeStore.colors.black
      }, props.stores.appStyles.datePicker.pickerButton]}>{props.children}</Text>
    </TouchableRipple>
  )
));