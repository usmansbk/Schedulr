import React from 'react';
import MasonryList from 'react-native-masonry-list';
import getImageUrl from 'helpers/getImageUrl';

export default class List extends React.Component {
  shouldComponentUpdate = (nextProps) => this.props.images.length !== nextProps.images.length
  render() {
    const { images } = this.props;
    return (
      <MasonryList
        images={images.map(image => ({ uri: getImageUrl(image, 320)}))}
        sorted
        rerender
      />
    );
  }
}