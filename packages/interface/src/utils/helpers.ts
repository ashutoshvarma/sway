export const truncate = (str: string, max_length: number): string => {
  if (str.length > max_length) {
    return str.slice(0, max_length) + '...'
  } else return str
}
