import React from 'react';
import Details from './Container';
import { withNavigationFocus } from 'react-navigation';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import Suspense from 'components/common/Suspense';
import { I18n } from 'aws-amplify';

class Screen extends React.Component {
  state = { display: false };
  _goBack = () => this.props.navigation.goBack();

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  shouldComponentUpdate = nextProps => nextProps.isFocused;

  _navigateToRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.navigation.getParam('id'), isNew: true });
  _navigateToEdit = ({ id }) => this.props.navigation.navigate('EditEvent', { id });
  _navigateToSchedule = (id) => this.props.navigation.navigate('Schedule', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _navigateToUser = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToBookmarks = (id) => this.props.navigation.navigate('EventBookmarks', { id });

  render() {
    const {
      display
    } = this.state;
    if (!display) return <Suspense />;

    const {
      navigation,
      event,
      error,
      loading,
      onRefresh
    } = this.props;
    const id = navigation.getParam('id');
    const from = navigation.getParam('from');

    if (loading && !event) return <Loading loading={loading} />;
    if (error && !event) return <Error onRefresh={onRefresh} loading={loading} />;
    if (!event) return <Error
      notFound
      message={I18n.get("ERROR_404")}
      caption={I18n.get("ERROR_404_caption")}
    />

    return (
      <Details
        id={id}
        from={from}
        event={event}
        handleBack={this._goBack}
        handleEdit={this._navigateToEdit}
        handleRepeat={this._navigateToRepeat}
        navigateToSchedule={this._navigateToSchedule}
        navigateToComments={this._navigateToComments}
        navigateToBanner={this._navigateToBanner}
        navigateToUser={this._navigateToUser}
        navigateToBookmarks={this._navigateToBookmarks}
      />
    );
  }
}

export default withNavigationFocus(Screen);