import { ISO8601Timestamp } from "aws-sdk/clients/mobileanalytics";

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
  startAt: ISO8601Timestamp;
  endAt: ISO8601Timestamp;
}
