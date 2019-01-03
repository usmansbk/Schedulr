import moment from 'moment';

const getTitle = (value) => {
  return moment(value.startAt).startOf('d').toISOString();
}

const sectionize = (eventsArray) => eventsArray.reduce((sections, currentValue) => {
  // find currentValue section index
  const index = sections.findIndex(section => (
    section.title === getTitle(currentValue)));
  // if found add currentValue to section's data
  if (index !== -1) {
    const section = sections[index];
    section.data.push(currentValue);
  } else {
    const newSection = {
      title: getTitle(currentValue),
      data: [currentValue]
    };
    sections.push(newSection);
  }
  return sections;
}, []);

export default sectionize;