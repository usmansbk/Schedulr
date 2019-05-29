import { Logger, Analytics } from 'aws-amplify';
const logger = new Logger('Schdlr');

export const analytics = ({ name, alias, error }) => {
  try {
    Analytics.record({
      name,
      attributes: {
        errorName: error && error.name,
        errorMessage: error && error.message,
        component: alias
      }
    });
  } catch (error) {
    logger.debug(error.message);
    // Well there's nothing you can do now!
  }
};


export default logger;