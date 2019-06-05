import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/BoardEvents';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

@inject('stores')
@observer
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
      stores
    } = this.props;
    if (loading) return <Loading />;
    if (!board && error) return <Error onRefresh={onRefresh} />;

    const {
      name,
      description,
    } = board;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

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