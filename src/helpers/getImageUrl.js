import btoa from 'btoa';
import env from 'config/env';

const { CloudFrontUrl } = env;

const imageRequest = (key, bucket, size, fit) => {
  let width;
  let height;
  
  const path = `public/${key}`;

  switch(size) {
    case 60:
      case  320:
      case 90:
      case 400:
      case 512:
      case 1040:
    {
      width = size;
      height = size;
      break;
    };
    default: {
      width = 100;
      height = 100;
      break;
    }
  }

  return JSON.stringify({
    bucket,
    key: path,
    edits: {
      resize: {
        width,
        height,
        fit: fit || "cover"
      }
    }
  });
};

export default getImageUrl = ({ bucket, key }, size, fit) => (
  `${CloudFrontUrl}/${btoa(imageRequest(key, bucket, size, fit))}`
);