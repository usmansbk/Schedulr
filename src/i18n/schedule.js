const en = {
  name: "Personal",
  description: "My personal activities",
  isPublic: false
};

const translations = {
  en
};

export default (lang) => {
  const translation = translations[lang];
  if (translation) return translation;
  return en;
};