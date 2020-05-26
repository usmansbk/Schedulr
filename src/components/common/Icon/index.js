import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const names = {
  "arrow-left": "arrow-left",
  "add": "plus-a",
  "calendar": "calendar",
  "search": "search",
  "list": "pinboard",
  "share": "share-2",
  "map": "map-pin",
  "trash": "trash",
  "list": "list"
};

export default ({ name, color, size, style }) => {
  return <Icon
    size={size}
    name={names[name] || name}
    color={color}
    style={style}
  />;
};