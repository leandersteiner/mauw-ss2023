export interface Timestamp {
  created_at: string;
}

const toDateString = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

const sortByDateAsc = <T extends Timestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
};

const sortByDateDesc = <T extends Timestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export const DateUtils = {
  toDateString,
  sortByDateAsc,
  sortByDateDesc
};
