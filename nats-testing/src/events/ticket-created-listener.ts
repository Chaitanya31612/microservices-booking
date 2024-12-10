import { Msg, NatsConnection } from "nats";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "ticket-created-service";

  constructor(client: NatsConnection) {
    super(client);
  }

  onMessage(data: any, msg: Msg): void {
    console.log("Data received", data);
  }
}
