export default class ProblemWithSameTitleExists extends Error {

    constructor(message: string) {
        super(message);
        this.name = "ProblemWithSameTitleAlreadyExists";
    }

}