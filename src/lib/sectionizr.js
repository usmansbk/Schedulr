import moment from 'moment';
import { SectionListDataProp } from 'react-native-section-list-get-item-layout';
import { Event } from '../types/types';

/**
 * 
 * @param { Event } value 
 * @returns String
 */
const getSectionTitle = (value) => {
  return moment(value.startAt).startOf('d').toISOString();
}

/**
 * 
 * @param { Array<Event> } eventsArray 
 * @returns SectionListDataProp
 */
const sectionize = (eventsArray) => eventsArray.reduce((sections, currentValue) => {
  // find currentValue section index
  const index = sections.findIndex(section => (
    section.title === getSectionTitle(currentValue)));
  // if found add currentValue to section's data
  if (index !== -1) {
    const section = sections[index];
    section.data.push(currentValue);
  } else {
    // else create a new section and add to sections
    const newSection = {
      title: getSectionTitle(currentValue),
      data: [currentValue]
    };
    sections.push(newSection);
  }
  return sections;
}, []);

export default sectionize;