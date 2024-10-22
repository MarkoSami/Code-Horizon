export default class AssosiatedUserNotFound extends Error {
    constructor() {
        super("Assosiated user not found");
        this.name = "AssosiatedUserNotFound";
    }
}