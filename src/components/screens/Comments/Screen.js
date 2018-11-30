import React from 'react';
import Comments from '../../routes/Comments';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Comments
        goBack={this._goBack}
      />
    )
  }
}