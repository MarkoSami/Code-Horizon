
const QUEUE_OPTIONS = {
  durable: true,
  execlusive: false,
  autoDelete: false,
};
const AMQP_URL: string = process.env.AMQP_URL || "";
const EXCHANGE_NAME: string = process.env.EXCHANGE_NAME || "";

export default {
  QUEUE_OPTIONS,
  AMQP_URL,
  EXCHANGE_NAME,
};
