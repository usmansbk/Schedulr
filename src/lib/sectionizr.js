import moment from 'moment';

const getFormattedDate = (date) => {
  const parsedDate = Date.parse(date);
  let title = moment(parsedDate).calendar(null, {
    sameElse: function () { return 'MMMM DD, YYYY' },
  });
  let index = title.indexOf(' at ');
  let SUBTITLE_FORMAT = 'dddd';
  if (index !== -1) {
    title = title.substring(0, index);
    SUBTITLE_FORMAT = 'MMMM DD, YYYY'
  }
  const subtitle = moment(parsedDate).format(SUBTITLE_FORMAT);
  return {
    title,
    subtitle
  };
}

const getSection = (sections, title) => {
  let header = getFormattedDate(title);
  for (let section of sections) {
    if (section.title.title === header.title) {
      return section;
    }
  }
  const section = { title: header, data: [] };
  sections.push(section);
  return section;
}

export function sortSections(sections) {
  return sections.sort((a, b) => {
    let aDate = Date.parse(a.data[0].start);
    let bDate = Date.parse(b.data[0].start);
    return aDate - bDate;
  })
}

export function sortData(data) {
  return data.sort((a, b) => {
    return Date.parse(a.start) - Date.parse(b.start);
  })
}

export default (arr=[]) => {
  if (arr.length) {
    const sections = [];
    for (let item of arr) {
      const section = getSection(sections, item.node.start);
      section.data.push(item.node);
    }
    for (let section of sections) {
      section.data = sortData(section.data);
    }
    return sortSections(sections);
  }
  return arr;
}
