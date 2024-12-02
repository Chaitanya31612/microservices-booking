import { connect, StringCodec } from "nats";

(async () => {
  console.clear();

  const nc = await connect();
  console.log("Listener connected to nats");

  const js = nc.jetstream();
  const jsm = await js.jetstreamManager();

  const streamName = "mystream";

  // Check if the stream exists, create it if not
  try {
    const stream = await jsm.streams.info(streamName);
    console.log(`Stream "${streamName}" exists.`);
  } catch (err) {
    console.log(`Stream "${streamName}" doesn't exist. Creating...`);
    // Create a new stream if it doesn't exist
    await jsm.streams.add({
      name: streamName,
      subjects: ["hello.*"], // Subject pattern for the stream
      no_ack: true,
    });
    console.log(`Stream "${streamName}" created.`);
  }

  // Create a StringCodec for encoding and decoding messages
  const sc = StringCodec();

  // Publish a message to the stream
  const msg = "Hello, JetStream!";
  // await js.publish("hello.world", sc.encode(msg));
  await js.publish("hello.wor", sc.encode("flkajsdlkf"));

  console.log(`Published message: ${msg}`);

  // Close the connection
  await nc.close();

  // ==========================

  // const sc = StringCodec();
  // const sub = nc.subscribe("hello", {
  //   queue: "listenerQueueGroup", // this creates a queue group and send the message to only one listener alternatively for processing the event in case of multiple created
  // });

  // for await (const m of sub) {
  //   console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  // }
  // console.log("subscription closed");
})();
