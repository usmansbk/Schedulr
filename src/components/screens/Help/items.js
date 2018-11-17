import React from 'react';
import moment from 'moment';
import { ToastAndroid } from 'react-native';
import Mailer from 'react-native-mail';
import Config from 'react-native-config';
import {
  Icon,
} from 'native-base';
import i18n from '../../../config/i18n';

export default [
  // {
  //   id: 'faq',
  //   name: 'FAQ',
  //   icon: <Icon type="SimpleLineIcons" name="question" />,
  // },
  // {
  //   id: 'privacy',
  //   name: 'Privacy Policy',
  //   icon: <Icon type="SimpleLineIcons" name="lock" />,
  // },
  // {
  //   id: 'terms',
  //   name: 'Terms of service',
  //   icon: <Icon type="SimpleLineIcons" name="info" />
  // },
  {
    id: 'feedback',
    name: i18n.t('items.email_dev'),
    note: `${Config.EMAIL}`,
    icon: <Icon type="Feather" name="mail" />,
    handlePress:
      () => {
        const promise = new Promise((resolve, reject) =>
          Mailer.mail({
            subject: 'Feedback',
            recipients: [Config.EMAIL],
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }));
        promise
          .then(() => ToastAndroid.show('Thanks for your feedback!', ToastAndroid.SHORT))
          .catch(() => ToastAndroid.show('Sending failed', ToastAndroid.SHORT))
      }
  },
  {
    id: 'version',
    name: i18n.t('items.version'),
    note: `${Config.BUILD_VERSION}-${Config.BUILD}`,
    icon: <Icon type="Feather" name="activity" />,
  },
  {
    id: 'buildTime',
    name: i18n.t('items.build_time'),
    note: `${moment().toDate()}`,
    icon: <Icon type="Feather" name="clock" />,
  }
]