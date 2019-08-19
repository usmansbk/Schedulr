import Share from 'react-native-share';
import { I18n } from 'aws-amplify';
import env from 'config/env';

export default function handleShareEvent({
	id,
	title,
	category,
	date,
	address
}) {
	  const shareOptions = {
	    title: I18n.get("SHARE_EVENT_inviteTitle"),
	    subject: category,
	    message: `${title}\n${category ? category + '\n' : ''}${date}${address ? ('\n' + address) : ''}\n\n`,
	    url: `${env.APP_URL}/event/${id}`
	  };
	  Share.open(shareOptions).catch(error => {
	    // Ignore
	  });
}

export function handleShareSchedule({
	id,
	title
}) {
    const shareOptions = {
      title: I18n.get("SHARE_SCHEDULE_inviteTitle"),
      subject: I18n.get("SHARE_SCHEDULE_subject"),
      message: I18n.get("SHARE_SCHEDULE_message")(title),
      url: `${env.APP_URL}/schdl/${id}`
    };
    Share.open(shareOptions).catch(error => {
      // Ignore
    });
}