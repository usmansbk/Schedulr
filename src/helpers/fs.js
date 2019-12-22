import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import logger from 'config/logger';
import {requestReadWritePermission} from './permissions';

export default getPath = async (name) => {
  let path = `${RNFS.DocumentDirectoryPath}/${name}`;
  try {
    if (Platform.OS === 'android') {
      const granted = await requestReadWritePermission();
      if (granted) {
        const downloadPath =`${RNFS.ExternalStorageDirectoryPath}/Download`;
        const exists = await RNFS.exists(downloadPath);
        if (!exists) {
          await RNFS.mkdir(downloadPath);
        }
        path = `${downloadPath}/${name}`;
      }
    }
  } catch(error) {
    logger.logError(error);
  }
  return path;
}