import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer((props) => (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[props.stores.styles.datePicker.pickerButton, props.style]}>
      <Text
        style={[
          {
            color: props.disabled
              ? props.stores.theme.colors.gray
              : props.stores.theme.colors.black,
          },
          props.stores.styles.datePicker.pickerButton,
        ]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )),
);
