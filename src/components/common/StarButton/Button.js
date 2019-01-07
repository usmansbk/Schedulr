import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
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