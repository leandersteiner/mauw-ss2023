export interface CreatedTimestamp {
  createdAt: string;
}

export interface UpdatedTimestamp {
  updatedAt: string;
}

export interface TimestampedEntity extends CreatedTimestamp, UpdatedTimestamp {}

export interface DatedEntity {
  createdAt: Date;
  updatedAt: Date;
}

const toDateString = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

const toDate = (dateString: string): Date => {
  return new Date(dateString);
};

const setDates = <T extends TimestampedEntity>(entity: T): DatedEntity => {
  return { ...entity, createdAt: toDate(entity.createdAt), updatedAt: toDate(entity.updatedAt) };
};

const sortByCreationDateAsc = <T extends CreatedTimestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

const sortByCreationDateDesc = <T extends CreatedTimestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const sortByUpdateDateAsc = <T extends UpdatedTimestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
};

const sortByUpdateDateDesc = <T extends UpdatedTimestamp>(arr: T[]): T[] => {
  return arr.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const DateUtils = {
  toDate,
  setDates,
  toDateString,
  sortByCreationDateAsc,
  sortByCreationDateDesc,
  sortByUpdateDateAsc,
  sortByUpdateDateDesc
};
