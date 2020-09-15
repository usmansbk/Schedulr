import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {inject, observer} from 'mobx-react';

const TextField = ({error, stores, label, bold, ...rest}, ref) => {
  const styles = stores.styles.textInput;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={stores.theme.colors.placeholder}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

export default inject('stores')(observer(React.forwardRef(TextField)));
