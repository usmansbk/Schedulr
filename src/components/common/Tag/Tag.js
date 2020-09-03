import React from 'react';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

export default inject('stores')(
  observer(({status, stores}) => {
    const styles = stores.styles.tag;
    let statusStyle = styles[status];
    return (
      <Text style={[styles.text, statusStyle, {marginVertical: 4}]}>
        {I18n.get(`STATUS_${status.toLowerCase()}`)}
      </Text>
    );
  }),
);
