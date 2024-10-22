"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QUEUE_OPTIONS = {
    durable: true,
    execlusive: false,
    autoDelete: false,
};
const AMQP_URL = process.env.AMQP_URL || "";
const EXCHANGE_NAME = process.env.EXCHANGE_NAME || "";
exports.default = {
    QUEUE_OPTIONS,
    AMQP_URL,
    EXCHANGE_NAME,
};
//# sourceMappingURL=amqplib.config.js.map