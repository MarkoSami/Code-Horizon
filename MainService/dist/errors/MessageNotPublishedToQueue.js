"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageNotPublishedToQueue extends Error {
    constructor() {
        super("Message not published to queue");
        this.name = "MessageNotPublishedToQueue";
    }
}
exports.default = MessageNotPublishedToQueue;
//# sourceMappingURL=MessageNotPublishedToQueue.js.map