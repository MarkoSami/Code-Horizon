export default class TestCase {


    public id: string;
    public input: string;
    public output: string;
    public timeInMS: number;
    public memoryInMB: number;
    public problemId: string;


    constructor(testCase: any) {
        this.id = testCase.id;
        this.input = testCase.input;
        this.output = testCase.output;
        this.timeInMS = testCase.timeInMS;
        this.memoryInMB = testCase.memoryInMB;
        this.problemId = testCase.problemId;
    }
}