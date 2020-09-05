import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {TextInput as PaperInput, useTheme} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {dark as colors} from 'config/colors';

export default inject('stores')(
  observer(({error, stores, label, bold, ...rest}) => {
    const styles = stores.styles.textInput;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholderTextColor={stores.theme.colors.placeholder}
          autoCorrect={false}
          underlineColorAndroid={error && stores.theme.colors.light_red}
          style={[
            styles.input,
            bold ? {fontWeight: 'bold', fontSize: 25} : null,
          ]}
          {...rest}
        />
      </View>
    );
  }),
);

function CustomPaperInput({stores, style = [], ...rest}) {
  return (
    <PaperInput
      theme={{roundness: 0, colors: {text: '#000'}}}
      style={[
        {
          backgroundColor: stores.theme.colors.light_gray,
        },
        style,
      ]}
      {...rest}
    />
  );
}

export const TextField = inject('stores')(observer(CustomPaperInput));

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    // backgroundColor: colors.gray,
    backgroundColor: colors.bg,
    // height: 56,
    padding: 8,
    margin: 0,
    fontSize: 18,
    color: colors.black,
  },
  label: {
    marginLeft: 8,
    color: colors.black,
  },
});
