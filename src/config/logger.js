import { Logger, Analytics } from 'aws-amplify';

export const analytics = ({ logType, component, error }) => {
  try {
    Analytics.record({
      name: logType,
      attributes: {
        errorName: error && error.name,
        errorMessage: error && error.message,
        component
      }
    });
  } catch (error) {
    // Well there's nothing you can do now!
  }
};

const logger = new Logger('Schdlr');

export default logger;