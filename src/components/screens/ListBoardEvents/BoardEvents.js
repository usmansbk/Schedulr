import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/BoardEvents';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class BoardEvents extends React.Component {
  static defaultProps = {
    events: []
  };

  render() {
    const {
      board,
      events,
      error,
      loading,
      loadingEvents,
      loadingEventsError,
      onPress,
      onRefresh,
    } = this.props;
    if (loading) return <Loading />;
    if (!board && error) return <Error onRefresh={onRefresh} />;

    const {
      name,
      description,
    } = board;

    return (
      <>
        <Appbar.Header style={styles.elevatedHeader} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={onPress} />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
        <List
          listType="board"
          events={events}
          loading={loadingEvents}
          error={loadingEventsError}
        />
      </>
    );
  }
}