export type Status =
  | "Pending"
  | "Cancelled"
  | "Rejected"
  | "Accepted"
  | "In Progress"
  | "Completed";

export const validStatuses = [
  "Pending",
  "Cancelled",
  "Rejected",
  "Accepted",
  "In Progress",
  "Completed"
];
