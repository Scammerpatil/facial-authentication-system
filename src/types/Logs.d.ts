import { Resident } from "./Resident";
import { Visitor } from "./Visitor";

export interface Logs {
  resident: Resident | null;
  visitor: Visitor | null;
  entryTime: Date;
  isRegistered: boolean;
}
