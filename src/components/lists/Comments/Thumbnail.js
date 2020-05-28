import React from 'react';
import MediaIcon from 'components/common/MediaIcon';
import getImageUrl from 'helpers/getImageUrl';

export default ({ attachment }) => {
  const file = attachment[0];
  const { type } = file;
  let uri;
  if (type.includes("image")) {
    uri = getImageUrl(file, 90);
  }

  return (
    <MediaIcon
      type={type}
      uri={uri}
      style={{
        width: 96,
        height: 96
      }}
    />
  );
};