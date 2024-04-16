import formSubmissionService from "../services/formSubmissionService";
import { Kafka } from "kafkajs";

export interface FormSubmissionMessage {
  formName: string;
  data: Record<string, unknown>;
}

export interface FormSubmissionData {
  data: Record<string, unknown>;
  host: string;
  formName: string;
}

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "form-notification-group" });

export const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "form-submission", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (
        message.value !== null &&
        message.value !== undefined &&
        message.key !== null &&
        message.key !== undefined
      ) {
        try {
          const formSubmissionMessage: FormSubmissionMessage = JSON.parse(
            message.value.toString()
          );
          const host = message.key.toString();

          console.log("What is this:::");
          console.log(formSubmissionMessage);

          const formSubmissionData: FormSubmissionData = {
            data: formSubmissionMessage.data,
            formName: formSubmissionMessage.formName,
            host: host
          };

          console.log("In consumer:::");
          console.log(formSubmissionData);

          await formSubmissionService(formSubmissionData);

          // Process the form submission here (e.g., send an email notification)
        } catch (error) {
          console.error(
            `Failed to parse message in ${topic} at partition ${partition}: ${error}`
          );
          // Error handling for bad JSON
        }
      } else {
        console.log(
          `Received null or undefined message value in ${topic} at partition ${partition}`
        );
        // Optionally handle or log null messages differently here
      }
    }
  });
};
