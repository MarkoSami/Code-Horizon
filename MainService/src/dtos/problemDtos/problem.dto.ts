import { Problem } from "@prisma/client";



export default class ProblemDto {
    public id: string;
    public title: string;
    public description: string;
    public difficulty: string;
    public createdAt: Date;
    public updatedAt: Date;
    public functionName: string;
    public parametersNames: string[];

    constructor(problem: Problem) {
        this.id = problem.id;
        this.title = problem.title;
        this.description = problem.description;
        this.difficulty = problem.difficulty;
        this.createdAt = problem.createdAt;
        this.updatedAt = problem.updatedAt;
        this.functionName = problem.functionName;
        this.parametersNames = problem.parametersNames;
    }
}