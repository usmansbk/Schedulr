import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
  shouldComponentUpdate = (nextProps) => (this.props.starsCount !== nextProps.starsCount);

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