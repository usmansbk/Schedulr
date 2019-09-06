import React from 'react';
import { Appbar } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import List from './ListHoc';

export default class ScheduleEvents extends React.Component {

  render() {
    const {
      schedule,
      error,
      loading,
      onPress,
      onRefresh,
      stores,
    } = this.props;

    if (loading && !schedule) return <Loading />;
    if (!schedule && error) return <Error onRefresh={onRefresh} />;
    if (!schedule) return <Error
      icon="meh"
      message={I18n.get("ERROR_404")}
      caption={I18n.get("ERROR_404_caption")}
    />;

    const {
      id,
      name,
      description,
      isFollowing,
      isPublic,
      isOwner,
      eventsCount
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

    const isAuth = isPublic || isOwner || isFollowing;

    return (
      <>
        <Appbar style={styles.header} collapsable>
          <Appbar.Action
            onPress={onPress}
            size={24}
            color={colors.gray}
            icon={({ size, color }) => <Icon
              name="arrow-left"
              color={color}
              size={size}
            />}
          />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <List
          id={id}
          eventsCount={eventsCount}
          isAuth={isAuth}
        />
      </>
    );
  }
}