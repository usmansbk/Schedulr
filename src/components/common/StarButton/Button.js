import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
  shouldComponentUpdate = (nextProps) => (this.props.starsCount !== nextProps.starsCount);

  _onContinue = async () => {
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
      alert(error.message);
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