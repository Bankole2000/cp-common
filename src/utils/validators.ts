const emailRegex = /^[a-z]+(_|\.)?[a-z0-9]*@[a-z]+\.[a-z]{2,}$/i;
const userNameRegex = /^[a-z0-9_]+$/i;
const nameRegex = /^[a-z-]+$/i;
const phoneRegex = /^[0-9-+]+$/i;
const validStringRegex = /([^\s])/;
const alphaNumRegex = /^[a-z0-9]+$/i;

export const isValidEmail = (email: string) => (email ? emailRegex.test(email) : false);
export const isValidUserName = (userName: string) => (userName ? userNameRegex.test(userName) : false);
export const isValidName = (name: string) => (name ? nameRegex.test(name) : false);
export const isValidPhone = (phone: string) => (phone ? phoneRegex.test(phone) : false);
export const isValidString = (str: string) => (str ? validStringRegex.test(str) : false);
export const isValidAlphaNum = (str: string) => (str ? alphaNumRegex.test(str) : false);

export const isOfAge = (dateOfBirth: string, requiredAge: number) => {
  if (!dateOfBirth) return false;
  if (Date.parse(dateOfBirth.toString()) > Date.now()) return false;
  if (Date.parse(dateOfBirth.toString())) {
    const dob = new Date(dateOfBirth);
    const ageDiff = new Date(Date.now() - dob.getTime());
    const age = Math.abs(ageDiff.getUTCFullYear() - 1970);
    return age >= requiredAge;
  }
  return false;
};

export const isOverDaysOld = (date: string, days: number) => {
  if (!date) return false;
  if (Date.parse(date.toString()) >= Date.now()) return false;
  if (Date.parse(date.toString())) {
    const dateDiff = new Date(Date.now() - Date.parse(date));
    const dateDiffInDays = Math.abs(dateDiff.getUTCDate() - 1);
    return dateDiffInDays >= days;
  }
  return false;
};

export const isValidDate = (datelike: string) => new Date(datelike) instanceof Date && !Number.isNaN(datelike);

export const isValidImage = (mimetype: string) => {
  const validMimeTypes: { [key: string]: string } = {
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    bmp: 'image/bmp'
  };
  return mimetype ? validMimeTypes[mimetype.split('/')[1]] : false;
};
