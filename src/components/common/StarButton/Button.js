import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarred: props.isStarred,
      starsCount: props.starsCount
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isStarred !== this.state.isStarred) {
      this.setState({
        isStarred: nextProps.isStarred,
        starsCount: nextProps.starsCount
      });
    }
  }

  _toggle = () => {
    this.setState(prev => ({
      isStarred: !prev.isStarred,
      starsCount: prev.isStarred ? prev.starsCount - 1 : prev.starsCount + 1
    }), this._onContinue);
  }

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
      starsCount
    } = this.state;

    return (
      <IconBadge
        icon={`star${isStarred ? '' : '-border'}`}
        onPress={this._toggle}
        size={size}
        color={isStarred ? activeColor : color}
        count={starsCount}
      />
    );
  }
}