import * as amqplib from "amqplib";

import amqplibConfig from "../config/amqplib.config";

export default class MessageProducer {
  private static connection: amqplib.Connection | null = null;
  private static channel: amqplib.Channel | null = null;
  private constructor() {
  }

  static async createChannel() {
    if (!this.channel) {
      this.connection = await amqplib.connect(amqplibConfig.AMQP_URL);
      this.channel = await this.connection.createChannel();
    }
  }

  static async closeChannel() {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
  }

  static async publishMessage(routingKey: string, message: string): Promise<boolean> {
    await this.createChannel();
    if (!this.channel) {
      throw new Error('Channel not created');
    }
    const exchange = await this.channel.assertExchange(
      amqplibConfig.EXCHANGE_NAME,
      "direct",
      { durable: true }
    );
    console.log("========>Messgae", message);
    const messageDetails = {
      message: Buffer.from(message),
      routingKey: routingKey,
    };
    const published = this.channel.publish(
      exchange.exchange,
      routingKey,
      messageDetails.message,
      { persistent: true }
    );

    return published;
  }
};
