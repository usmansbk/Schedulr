import env from 'config/env';

const { CloudFrontUrl } = env;

const imageRequest = (key, bucket, size) => {
  let width;
  let height;
  
  const path = `public/${key}`;

  switch(size) {
    case 60:
      case  320:
      case 90:
      case 400:
      case 512:
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
        fit: "cover"
      }
    }
  });
};

export default getImageUrl = ({ bucket, key }, size) => (
  `${CloudFrontUrl}/${btoa(imageRequest(key, bucket, size))}`
);