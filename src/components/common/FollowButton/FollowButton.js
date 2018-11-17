import React, { Component } from 'react';
import IconButton from '../IconButton';
import UnfollowModal from '../../../containers/modals/LeaveGroup';

export default class FollowButton extends Component {
  state = {
    isVisible: false
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props.isMember !== nextProps.isMember ||
      this.state.isVisible !== nextState.isVisible
  }

  handleAction = (isMember) => {
    const { followClass } = this.props;
    if (isMember) {
      this.setState({ isVisible: true })
    } else {
      followClass();
    } 
  }

  handleClose = () => this.setState({ isVisible: false });

  render() {
    const {
      id,
      name,
      isMember,
      color
    } = this.props;

    return (
      <React.Fragment>
        <IconButton
          onPress={() => this.handleAction(isMember)}
          name={ isMember ? "user" : "user-plus"}
          type="Feather"
          color={color}
        />
        <UnfollowModal
          id={id}
          name={name}
          title={`Unfollow "${name}"?`}
          isVisible={this.state.isVisible}
          message="You stop receiving class notifications."
          handleClose={this.handleClose}
        />
      </React.Fragment>
    )
  }
}