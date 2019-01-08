import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
  state = {
    isStarred: this.props.isStarred,
    starsCount: this.props.starsCount
  };

  toggle = () => {
    this.setState(({ isStarred, starsCount }) => ({
      isStarred: !isStarred,
      starsCount: isStarred ? starsCount - 1 : starsCount + 1
    }), this._onContinue)
  };

  _onContinue = () => {
    const {
      id,
      isStarred,
      onUnstarEvent,
      onStarEvent,
    } = this.props;
    const input = { id };
    try {
      if (isStarred) {
        onUnstarEvent(input);
      } else {
        onStarEvent(input);
      }
    } catch (error) {
    }
  }

  render() {
    const {
      color,
      size,
      activeColor,
    } = this.props;

    const {
      isStarred,
      starsCount,
    } = this.state;

    return (
      <IconBadge
        icon={`star${isStarred ? '' : '-border'}`}
        onPress={this.toggle}
        size={size}
        color={isStarred ? activeColor : color}
        count={starsCount}
      />
    );
  }
}