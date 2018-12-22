import React from 'react';
import { Appbar } from 'react-native-paper';
import Events from '../../lists/Events';
import Fab from '../../common/Fab';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class GroupEvents extends React.Component {
  static defaultProps = {
    id: 1,
    name: 'Demo dev',
    description: 'lorem Ipsum Dolor Amet Schdlr Studio Code',
    isMember: true,
    isAdmin: true,
  };

  render() {
    const {
      id,
      name,
      description,
      isAdmin,
      onPress,
      navigateToGroupInfo,
      navigateToNewEvent
    } = this.props;
    
    return (
      <React.Fragment>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={onPress} />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon="info-outline"
            onPress={navigateToGroupInfo}
            color={colors.gray}
          />
        </Appbar.Header>
        <Events listType="group" />
        {
          isAdmin && (
            <Fab
              icon="edit"
              onPress={() => navigateToNewEvent(id)}
            />
          )
        }
      </React.Fragment>
    );
  }
}