import React from 'react';
import Button from '../SButton';
import colors from '../../theme';

export default class CommentButton extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.commentsCount !== this.props.commentsCount;
  }
  
  _onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  }

  render() {
    const { commentsCount } = this.props;
    return (
      <Button
        onPress={this._onPress}
        name="message-square"
        type="Feather"
        badge={commentsCount}
        color={colors.bgLight}
        isClicked
        withBadge
        normal
      />
    );
  }
}