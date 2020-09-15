import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from '../Icon';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer((props) => (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[props.stores.styles.datePicker.pickerButton]}>
      <View style={props.stores.styles.datePicker.buttonContent}>
        <Icon
          name={props.icon}
          size={24}
          color={props.stores.theme.colors.tint}
        />
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
      </View>
    </TouchableOpacity>
  )),
);
