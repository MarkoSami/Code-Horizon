export default class MessageNotPublishedToQueue extends Error {
    constructor() {
        super("Message not published to queue");
        this.name = "MessageNotPublishedToQueue";
    }
}