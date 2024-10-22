import { InputJsonValue } from "@prisma/client/runtime/library";

export default class CreateTestCaseDto {
    public input: InputJsonValue;
    public output: InputJsonValue;
    public problemId: string;
    public timeInMS: number;
    public memoryInMB: number;
    /**
     *
     */
    constructor(testCase: any) {
        this.input = testCase.input;
        this.output = testCase.output;
        this.problemId = testCase.problemId;
        this.timeInMS = testCase.timeInMS;
        this.memoryInMB = testCase
    }
}