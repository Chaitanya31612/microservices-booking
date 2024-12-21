import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@cgticketingproject/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
