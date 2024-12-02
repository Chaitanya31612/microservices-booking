import { connect, StringCodec } from "nats";

(async () => {
  console.clear();
  // to create a connection to a nats-server:
  const nc = await connect();
  console.log("Publisher connected to nats");

  // create a codec
  const sc = StringCodec();

  nc.publish("hello", sc.encode("world"));
  nc.publish("hello", sc.encode("again"));
  nc.publish("hello", sc.encode("again 2"));
  const data = {
    id: "23",
    name: "Chaitanya",
  };
  nc.publish("hello", sc.encode(JSON.stringify(data)));

  // we want to ensure that messages that are in flight
  // get processed, so we are going to drain the
  // connection. Drain is the same as close, but makes
  // sure that all messages in flight get seen
  // by the iterator. After calling drain on the connection
  // the connection closes.
  // await nc.drain();
})();
