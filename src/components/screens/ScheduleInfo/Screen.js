import React from 'react';
import ScheduleInfo from './Hoc';
import DeleteConfirm from 'components/dialogs/DeleteSchedule';
import UnarchiveConfirm from 'components/dialogs/OpenSchedule';
import ArchiveConfirm from 'components/dialogs/CloseSchedule';
import Suspense from 'components/common/Suspense';
import { handleShareSchedule } from 'helpers/share';

export default class Screen extends React.Component {
  state = {
    pictureKey: null,
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _goBack = () => this.props.navigation.goBack();
  _handleShare = ({ id, name }) => {
    handleShareSchedule({
      id,
      title: name,
    });
  };
  _handleSelectMenu = (option, pictureKey) => {
    const id = this.props.navigation.getParam('id');
    switch (option) {
      case 'edit':
        this.props.navigation.navigate('EditSchedule', { id });
        break;
      case 'delete':
        this.deleteConfirmRef.wrappedInstance.open();
        break;
      case 'close':
        this.archiveConfirmRef.getWrappedInstance().open();
        break;
      case 'open':
        this.unarchiveConfirmRef.getWrappedInstance().open();
        break;
      default:
        this.setState({ visibleDialog: option, pictureKey});
        break;
    }
  };
  _navigateToFollowers = (id) => this.props.navigation.navigate('Followers', { id });
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToEvents = (id) => this.props.navigation.navigate('ScheduleEvents', { id });
  _navigateToPicture = (id) => this.props.navigation.navigate('SchedulePicture', { id });

  render() {
    const { display, pictureKey } = this.state;
    if (!display) return <Suspense/>;

    const id = this.props.navigation.getParam('id');
    return (
      <>
        <ScheduleInfo
          id={id}
          goBack={this._goBack}
          handleShare={this._handleShare}
          handleSelectMenu={this._handleSelectMenu}
          navigateToFollowers={this._navigateToFollowers}
          navigateToProfile={this._navigateToProfile}
          navigateToEvents={this._navigateToEvents}
          navigateToPicture={this._navigateToPicture}
        />
        <DeleteConfirm
          id={id}
          pictureKey={pictureKey}
          onRef={ref => this.deleteConfirmRef = ref}
        />
        <UnarchiveConfirm
          id={id}
          ref={ref => this.unarchiveConfirmRef = ref}
        />
        <ArchiveConfirm
          id={id}
          ref={ref => this.archiveConfirmRef = ref}
        />
      </>
    );
  }
}
