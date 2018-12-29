import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Events';
import Fab from '../../common/Fab';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class BoardEvents extends React.Component {
  static defaultProps = {
    id: 1,
    name: 'Demo dev',
    description: 'lorem Ipsum Dolor Amet Schdlr Studio Code',
    isFollowing: true,
    isAuthor: true,
  };

  render() {
    const {
      id,
      name,
      description,
      isAuthor,
      onPress,
      navigateToBoardInfo,
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
            onPress={() => navigateToBoardInfo(id)}
            color={colors.gray}
          />
        </Appbar.Header>
        <List listType="board" />
        {
          isAuthor && (
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