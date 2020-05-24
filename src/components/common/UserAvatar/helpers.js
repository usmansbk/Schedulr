import emojiRegex from 'emoji-regex';
import { avatarColors } from 'config/colors';

export function getAvatarBackgroundColor(name) {
  const colorIndex = name.length % avatarColors.length; 
  return avatarColors[colorIndex];
}

export function getInitials(name) {
  if (!name) return '‍👤';
  const emojiMatch = emojiRegex().exec(name);
  let avatarName;
  if (emojiMatch) {
    avatarName = emojiMatch[0];
  } else {
    const [ first, second ] = name.split(' ');
    // avatarName = `${first[0]} ${second ? second[0] : ''}`.toUpperCase();
    avatarName = first[0].toUpperCase();
  }
  return avatarName;
}