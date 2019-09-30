const en = {
  name: "Personal List 📝",
  description: "My appointments.",
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