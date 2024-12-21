import { connect, NatsConnection } from "nats";

class NatsWrapper {
  private _client?: NatsConnection; // we need to define it on connect() method, ? just prevent ts warnings

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Nats client before connecting");
    }
    return this._client;
  }

  async connect(url: string = "demo.nats.io:4222") {
    try {
      this._client = await connect({ servers: url });
      console.log("Connected to Nats!! Server:", this.client.getServer());
    } catch (err) {
      console.log("Error connecting to Nats!", err);
    }
  }
}

// Singleton pattern
// we are just exporting a single instance of NatsWrapper class to be used everywhere
export const natsWrapper = new NatsWrapper();
