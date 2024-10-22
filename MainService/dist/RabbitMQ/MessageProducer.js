"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib = __importStar(require("amqplib"));
const amqplib_config_1 = __importDefault(require("../config/amqplib.config"));
class MessageProducer {
    constructor() {
    }
    static createChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                this.connection = yield amqplib.connect(amqplib_config_1.default.AMQP_URL);
                this.channel = yield this.connection.createChannel();
            }
        });
    }
    static closeChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                yield this.channel.close();
                this.channel = null;
            }
        });
    }
    static publishMessage(routingKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createChannel();
            if (!this.channel) {
                throw new Error('Channel not created');
            }
            const exchange = yield this.channel.assertExchange(amqplib_config_1.default.EXCHANGE_NAME, "direct", { durable: true });
            console.log("========>Messgae", message);
            const messageDetails = {
                message: Buffer.from(message),
                routingKey: routingKey,
            };
            const published = this.channel.publish(exchange.exchange, routingKey, messageDetails.message, { persistent: true });
            return published;
        });
    }
}
MessageProducer.connection = null;
MessageProducer.channel = null;
exports.default = MessageProducer;
;
//# sourceMappingURL=MessageProducer.js.map