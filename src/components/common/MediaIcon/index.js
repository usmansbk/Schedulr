import React from 'react';
import {Image} from 'react-native';
import {getFilePrefix} from 'lib/utils';

export default ({type = '', style, uri}) => {
  let source;
  const prefix = getFilePrefix(type);
  switch (prefix) {
    case 'AUD':
      source = require('../../../assets/audio.png');
      break;
    case 'IMG':
      source = uri ? {uri} : require('../../../assets/img.png');
      break;
    case 'VID':
      source = require('../../../assets/video.png');
      break;
    case 'TXT':
      source = require('../../../assets/txt.png');
      break;
    case 'ZIP':
      source = require('../../../assets/zip.png');
      break;
    case 'DOC':
      source = require('../../../assets/doc.png');
      break;
    case 'PDF':
      source = require('../../../assets/pdf.png');
      break;
  }

  return <Image source={source} style={style} resizeMode="cover" />;
};
