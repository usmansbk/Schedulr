import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import Error from 'components/common/Error';

export default inject('stores')(observer(
  ({ isAuthor, error, stores }) => {
    if (error) return <Error />
    return (
      <View style={stores.appStyles.followersList.empty}>
        <Headline style={stores.appStyles.followersList.emptyTitle}>
          {
            isAuthor ? "Send invites!" : "Be the first to follow!"
          }
        </Headline>
      </View>
    );
  }
));
