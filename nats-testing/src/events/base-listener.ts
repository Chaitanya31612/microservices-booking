import { Msg, NatsConnection } from "nats";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Msg): void;

  private client: NatsConnection;

  constructor(client: NatsConnection) {
    this.client = client;
  }

  listen() {
    const sub = this.client.subscribe(this.subject, {
      queue: this.queueGroupName,
    });

    (async () => {
      for await (const msg of sub) {
        console.log(
          `Message received ${this.subject} / ${
            this.queueGroupName
          }: no. ${sub.getProcessed()}`
        );

        const parsedMsg = this.parseMessage(msg);
        this.onMessage(parsedMsg, msg);
      }
    })();
  }

  parseMessage(msg: Msg) {
    const data = msg.data;
    const messageString = typeof data === "string" ? data : data.toString();

    try {
      return JSON.parse(messageString); // Try to parse JSON
    } catch (err) {
      console.warn("Non-JSON message received:", messageString);
      return messageString; // Return the raw string if parsing fails
    }
  }
}
