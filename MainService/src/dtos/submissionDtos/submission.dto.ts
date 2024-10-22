export default class SubmissionDto {
    public id: string;
    public problemId: string;
    public userId: string;
    public code: string;
    public language: string;
    public verdict: string;
    public createdAt: Date;
    public updatedAt: Date;


    constructor(submissionData: any) {
        this.id = submissionData.id;
        this.problemId = submissionData.problemId;
        this.userId = submissionData.userId;
        this.code = submissionData.code;
        this.language = submissionData.language;
        this.verdict = submissionData.verdict;
        this.createdAt = submissionData.createdAt;
        this.updatedAt = submissionData.updatedAt;
    }
}