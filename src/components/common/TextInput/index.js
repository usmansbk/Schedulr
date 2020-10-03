import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import Icon from '../Icon';

const TextField = (
  {
    error,
    stores,
    label,
    bold,
    autoFocus,
    rightIcon,
    leftIcon,
    onPressRightIcon,
    onPressLeftIcon,
    ...rest
  },
  ref,
) => {
  const styles = stores.styles.textInput;
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeftIcon}>
            <Icon
              name={leftIcon}
              size={24}
              color={stores.theme.colors.tint}
              style={{paddingHorizontal: 4}}
            />
          </TouchableOpacity>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={stores.theme.colors.placeholder}
          autoCorrect={false}
          autoFocus={autoFocus}
          underlineColorAndroid="transparent"
          style={styles.input}
          leftIcon={leftIcon}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            <Icon
              name={rightIcon}
              size={24}
              color={stores.theme.colors.tint}
              style={{paddingHorizontal: 4}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default inject('stores')(observer(React.forwardRef(TextField)));
