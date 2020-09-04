import React from 'react';
import {observer, inject} from 'mobx-react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import Icon from 'components/common/Icon';

function SignIn(props) {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: props.stores.theme.colors.bg,
      padding: 16,
    },
  });

  return (
    <>
      <Appbar.Header style={props.stores.styles.appStyles.header}>
        <Appbar.Action
          onPress={() => props.navigation.goBack()}
          animated={false}
          icon={({size, color}) => (
            <Icon size={size} color={color} name="arrow-left" />
          )}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Email Login</Text>
      </ScrollView>
    </>
  );
}

export default inject('stores')(observer(SignIn));
