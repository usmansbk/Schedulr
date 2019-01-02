/**
 * DAILY, WEEKLY, MONTHLY, YEARLY
 */
interface TimeFrequency {
  DAILY: String;
  WEEKLY: String;
  MONTHLY: String;
  YEARLY: String;
}
/**
 * @param title
 * @param description
 * @param startAt
 * @param endAt
 */
export interface Event {
  title: String;
  description: String;
  startAt: Date;
  endAt: Date;
}

export interface Board {
  name: String;
  description: String;
  isPublic: Boolean;
}

export interface SectionListData {
  data: Event[],
  title: String
}