import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ error, loading, stores }) => loading ? null : (
    <View style={stores.appStyles.commentsList.empty}>
      <Headline style={stores.appStyles.commentsList.emptyTitle}>
        {
          error ? 'Network error' : 'No comments'
        }
      </Headline>
      {
        error && (
          <Paragraph style={stores.appStyles.commentsList.paragraph}>
            Check your internet connection. Pull to refresh.
          </Paragraph>
        )
      }
    </View>
  )
));
