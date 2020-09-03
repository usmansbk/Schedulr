import React from 'react';
import {Appbar} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Icon from 'components/common/Icon';
import {I18n} from 'aws-amplify';
import Fab from 'components/common/Fab';
import Error from 'components/common/Error';
import Suspense from 'components/common/Suspense';
import {SCHEDULE_CLOSED} from 'lib/constants';
import List from './ListHoc';
import {handleShareSchedule} from 'helpers/share';

class Schedule extends React.Component {
  state = {
    display: false,
  };

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  _navigateToScheduleInfo = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('ScheduleInfo', {id});
  };

  _navigateToNewEvent = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId: id,
      locked: true,
    });
  };

  _handleShare = ({id, name}) => {
    handleShareSchedule({
      id,
      title: name,
    });
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {
      schedule,
      error,
      loading,
      onPress,
      onRefresh,
      navigation,
      stores,
    } = this.props;

    if (error && !schedule)
      return <Error onRefresh={onRefresh} loading={loading} />;
    if (!(loading || schedule))
      return (
        <Error
          notFound
          message={I18n.get('ERROR_404')}
          caption={I18n.get('ERROR_404_caption')}
        />
      );

    const {id, name, description, isOwner, isFollowing, isPublic, status} =
      schedule || {};

    const styles = stores.appStyles.styles;
    const colors = stores.theme.colors;
    const isAuth = isPublic || isOwner || isFollowing;

    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            onPress={onPress}
            icon={() => (
              <Icon name="arrow-left" color={colors.primary} size={24} />
            )}
          />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          {(isPublic || isOwner) && (
            <Appbar.Action
              size={24}
              color={colors.primary}
              icon={({size, color}) => (
                <Icon name="share" size={size} color={color} />
              )}
              onPress={() => this._handleShare({name, id})}
            />
          )}
          <Appbar.Action
            size={24}
            color={colors.primary}
            icon={({size, color}) => (
              <Icon name="info" size={size} color={color} />
            )}
            onPress={this._navigateToScheduleInfo}
          />
        </Appbar.Header>
        <List
          id={id}
          navigation={navigation}
          isAuth={isAuth}
          isOwner={isOwner}
          loading={loading}
          error={error}
        />
        {!(Boolean(error) && this.events.length) &&
          isOwner &&
          status !== SCHEDULE_CLOSED && (
            <Fab icon="edit" onPress={this._navigateToNewEvent} />
          )}
      </>
    );
  }
}

export default inject('stores')(observer(Schedule));
