import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@cgticketingproject/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
