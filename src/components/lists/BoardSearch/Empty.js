import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ stores }) => {
    return (
      <View style={stores.appStyles.boardSearch.empty}>
        <Headline style={stores.appStyles.boardSearch.emptyTitle}>What interests you?</Headline>
        <Caption style={stores.appStyles.boardSearch.paragraph}>Find a board, follow, and get notified on event updates.</Caption>
      </View>
    );
  }
));
