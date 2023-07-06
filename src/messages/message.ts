export const get = (
  message: string,
  { field }: { field: string | number | boolean } = { field: '' },
) => message + field;
