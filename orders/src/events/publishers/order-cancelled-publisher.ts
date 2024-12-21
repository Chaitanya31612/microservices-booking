import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@cgticketingproject/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
