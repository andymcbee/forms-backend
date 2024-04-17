import { Kafka, ProducerRecord } from "kafkajs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const kafkaProducer = async (topic: string, key: string | null, value: any) => {
  console.log(`Topic::: ${topic}`);
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || "localhost:9092"]
  });
  const producer = kafka.producer();

  try {
    await producer.connect();

    const producerRecord: ProducerRecord = {
      topic,
      messages: [{ key, value: JSON.stringify(value) }]
    };

    await producer.send(producerRecord);
  } finally {
    await producer.disconnect();
  }
};

export default kafkaProducer;
