import aws_config from 'aws_config';
import env from 'config/env';

const { aws_user_files_s3_bucket: bucket } = aws_config;
const { CloudFrontUrl } = env;

const imageRequest = (key, size) => {
  let width;
  let height;
  
  const path = `public/${key}`;

  switch(size) {
    case 60:
      case  320:
      case 90:
      case 400:
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

export default getImageUrl = (s3Object, size) => (
  `${CloudFrontUrl}/${btoa(imageRequest(s3Object.key, size))}`
);