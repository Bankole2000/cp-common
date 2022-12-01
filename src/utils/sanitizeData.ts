export const sanitizeData = (fields: string[], data: any) => {
  const sanitizedData: { [key: string]: any } = {};
  fields.forEach((field) => {
    if (data[field]) {
      sanitizedData[field] = data[field];
    }
  });
  return sanitizedData;
};
