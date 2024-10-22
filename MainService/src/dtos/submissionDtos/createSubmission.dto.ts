export default class SubmissionDto {
    public problemId: string;
    public userId: string;
    public code: string;
    public language: string;


    constructor(submissionData: any) {
        this.problemId = submissionData.problemId;
        this.userId = submissionData.userId;
        this.code = submissionData.code;
        this.language = submissionData.language;
    }
}