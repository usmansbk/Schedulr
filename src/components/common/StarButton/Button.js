import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      isStarred,
      starsCount,
      onUnstarEvent,
      onStarEvent,
    } = this.props;
    const input = { id };
    const prev = { isStarred, starsCount };
    try {
      if (isStarred) {
        await onUnstarEvent(input, prev);
      } else {
        await onStarEvent(input, prev);
      }
    } catch (error) {
    }
  };

  render() {
    const {
      color,
      size,
      activeColor,
      isStarred,
      starsCount,
    } = this.props;

    return (
      <IconBadge
        icon={`star${isStarred ? '' : '-border'}`}
        onPress={this._onContinue}
        size={size}
        color={isStarred ? activeColor : color}
        count={starsCount}
      />
    );
  }
}