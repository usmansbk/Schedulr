import React from 'react';
import { Appbar } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import Icon from 'components/common/Icon';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import List from './ListHoc';
import Suspense from 'components/common/Suspense';

export default class ScheduleEvents extends React.Component {
  state = {
    display: false 
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  render() {

    if (!this.state.display) return <Suspense />;
    const {
      schedule,
      error,
      loading,
      onPress,
      onRefresh,
      stores,
    } = this.props;

    if (loading && !schedule) return <Loading loading={loading} />;
    if (!schedule && error) return <Error onRefresh={onRefresh} loading={loading} />;
    if (!schedule) return <Error
      notFound
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
            color={colors.primary}
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