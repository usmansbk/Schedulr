import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { SCHEDULE_CLOSED } from 'lib/constants';
import List from './ListHoc';

class Schedule extends React.Component {

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _navigateToScheduleInfo = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('ScheduleInfo', { id });
  };

  _navigateToNewEvent = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('NewEvent', { eventScheduleId: id, locked: true });
  };

  render() {
    const {
      schedule,
      error,
      loading,
      onPress,
      onRefresh,
      navigation,
      stores
    } = this.props;
    if (loading && !schedule) return <Loading />;
    if (error && !schedule) return <Error onRefresh={onRefresh} />;

    const {
      id,
      name,
      description,
      isOwner,
      isFollowing,
      isPublic,
      status,
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const isAuth = isPublic || isOwner || isFollowing;

    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            onPress={onPress}
            icon={() => <Icon
              name="arrow-left"
              color={colors.gray}
              size={24}
            />}
          />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon={() => <Icon
              name="info"
              size={24}
              color={colors.gray}
            />}
            onPress={this._navigateToScheduleInfo}
          />
        </Appbar.Header>
        <List
          id={id}
          navigation={navigation}
          isAuth={isAuth}
        />
        {
          !(Boolean(error) && this.events.length) && isOwner && (status !== SCHEDULE_CLOSED ) && (
            <Fab
              icon="edit-2"
              onPress={this._navigateToNewEvent}
            />
          )
        }
      </>
    );
  }
}

export default inject("stores")(observer(Schedule));