import moment from 'moment';

export const sortBy = (arr, key) => {
  return arr.sort((a, b) => {
    return Date.parse(a[key]) - Date.parse(b[key]);
  })
}

const getSectionTitle = (value) => {
  return moment(value.startAt).startOf('d').toISOString();
}

const sectionize = (eventsArray) => eventsArray.reduce((sections, currentValue) => {
  // find currentValue section index
  const index = sections.findIndex(section => (
    section.title === getSectionTitle(currentValue)));
  // if found, add currentValue to section's data
  if (index !== -1) {
    const section = sections[index];
    section.data = sortBy([...section.data, currentValue], 'startAt');
  } else {
    // else create a new section with currentValue in data
    // then and add section to sections list
    const newSection = {
      title: getSectionTitle(currentValue),
      data: [currentValue]
    };
    sections.push(newSection);
  }
  return sections;
}, []);

export default sectionize;