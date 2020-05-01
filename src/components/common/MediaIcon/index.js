import React from 'react';
import Image from 'react-native-fast-image';

export default ({ type="", style, uri }) => {
  let source;

  if (type.includes('image')) {
    source = { uri };
  } else if (type.includes('audio')) {
    source = require('../../../assets/audio.png');
  } else if (type.includes('video')) {
    source = require('../../../assets/video.png');
  } else if (type.includes('pdf')) {
    source = require('../../../assets/pdf.png');
  } else if (type.includes('text')) {
    source = require('../../../assets/txt.png');
  } else if (type.includes('zip') || (type.includes('compressed') || type.includes('archive'))) {
    source = require('../../../assets/zip.png'); 
  } else {
    source = require('../../../assets/doc.png'); 
  }
  
  return (
    <Image
      source={source}
      style={style}
      resizeMode="contain"
    />
  );
};