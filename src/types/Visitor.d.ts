import { Resident } from "./Resident";

export interface Visitor {
  name: string;
  contact: string;
  email: string;
  purposeOfVisit: string;
  profileImage: string;
  visitorId: string;
  visitorIdNumber: string;
  flatYourAreVisiting: Resident;
  approved: boolean;
  createdAt: Date;
}
