export default class AssosiatedProblemNotFound extends Error {
    constructor() {
        super("Assosiated problem not found");
        this.name = "AssosiatedProblemNotFound";
    }
}