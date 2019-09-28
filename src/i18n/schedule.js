const en = {
  name: "Personal",
  description: "My personal appointments",
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