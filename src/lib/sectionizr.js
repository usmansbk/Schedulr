import moment from 'moment';

const getDate = (date) => {
  return moment(Date.parse(date));
}

const getSection = (sections, date) => {
  let title = getDate(date);
  const section = { title, data: [] };
  sections.push(section);
  return section;
}

/**
 * 
 * @param { Array } sections 
 * Sorts the sections in SectionList array
 */
export const sortSections = (sections) => {
  return (sections.sort((a, b) => Date.parse(a.title) - Date.parse(b.title)));
}

/**
 * 
 * @param { Array } data 
 * @returns - events sorted accouding to date
 */
export const sortEvents = (data) => data.sort((a, b) => {
  return Date.parse(a.start) - Date.parse(b.start);
})

/**
 * @param { Array } arr - An array of events
 * @returns a SectionList array
 */
export default (arr=[]) => {
  if (arr.length) {
    const sections = [];
    for (let item of arr) {
      const section = getSection(sections, item.start);
      section.data.push(item);
    }
    for (let section of sections) {
      section.data = sortEvents(section.data);
    }
    return sortSections(sections);
  }
  return arr;
}
