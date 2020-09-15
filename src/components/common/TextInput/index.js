import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {TextInput as PaperInput} from 'react-native-paper';
import {inject, observer} from 'mobx-react';

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

function CustomPaperInput({stores, style = [], ...rest}, ref) {
  return (
    <PaperInput
      ref={ref}
      theme={{roundness: 0, colors: {text: stores.theme.colors.black}}}
      style={[
        {
          backgroundColor: stores.theme.colors.textInput,
        },
        style,
      ]}
      {...rest}
    />
  );
}

export const TextField = inject('stores')(
  observer(React.forwardRef(CustomPaperInput)),
);
