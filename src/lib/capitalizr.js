export default (string) => {
  if (!string) return '';
  const firstLetter = string[0].toUpperCase();
  return firstLetter + string.substring(1);
}

export function decapitalize(string, all=false) {
  if (!string) return '';
  const first = string[0]
  const head = all ? first.toLowerCase() : first.toUpperCase();
  const tail = string.substring(1).toLowerCase();
  return head + tail;
}