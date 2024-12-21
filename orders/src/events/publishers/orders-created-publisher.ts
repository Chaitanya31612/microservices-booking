import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@cgticketingproject/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
