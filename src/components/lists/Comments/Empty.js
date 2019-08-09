import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ error, loading, stores }) => loading ? null : (
    <View style={stores.appStyles.commentsList.empty}>
      <Headline style={stores.appStyles.commentsList.emptyTitle}>
        {
          error ? I18n.get("ERROR_networkError") : I18n.get("COMMENTS_emptyList")
        }
      </Headline>
      {
        error && (
          <Paragraph style={stores.appStyles.commentsList.paragraph}>
            {I18n.get("ERROR_noInternetConnection")}
          </Paragraph>
        )
      }
    </View>
  )
));
