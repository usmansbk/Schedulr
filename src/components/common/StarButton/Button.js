import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue =  async () => {
    const {
      id,
      isStarred,
      onUnstarEvent,
      onStarEvent,
    } = this.props;
    const input = { id };
    try {
      if (isStarred) {
        await onUnstarEvent(input);
      } else {
        await onStarEvent(input);
      }
    } catch (error) {
    }
  }

  render() {
    const {
      isStarred,
      starsCount,
      color,
      size,
      activeColor,
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