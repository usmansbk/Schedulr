import moment from 'moment';
import { ISO8601Timestamp } from 'aws-sdk/clients/mobileanalytics';
import { SectionListDataProp } from 'react-native-section-list-get-item-layout';
import { Event } from '../types/types';

const getDate = (date) => {
  return moment(Date.parse(date)).startOf('d').toISOString();
}

/**
 * 
 * @param { SectionListDataProp } sections 
 * @param { ISO8601Timestamp} date 
 */
const getSection = (sections, date) => {
  let title = getDate(date);
  for (section in sections) {
    if (section.title === title) {
      return section;
    }
  }
  const section = { title, data: [] };
  sections.push(section);
  return section;
}

/**
 * 
 * @param { SectionListDataProp } sections 
 * Sorts the sections in SectionList array
 */
export const sortSections = (sections) => {
  return (sections.sort((a, b) => Date.parse(a.title) - Date.parse(b.title)));
}

/**
 * 
 * @param { Array<Event> } data - SectionList data 
 * @returns { Array<Event> } events sorted according to date
 */
export const sortEvents = (data) => data.sort((a, b) => {
  return Date.parse(a.startAt) - Date.parse(b.startAt);
})

/**
 * @param { Array<Event> } arr - An array of events
 * @returns { Array<SectionListDataProp> } a SectionList array
 */
export default (arr) => {
  if (arr && arr.length) {
    const sections = [];
    for (let item of arr) {
      const section = getSection(sections, item.startAt);
      section.data.push(item);
    }
    for (let section of sections) {
      section.data = sortEvents(section.data);
    }
    return sortSections(sections);
  }
  return [];
}
