import { Prisma, Problem, TestCase } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import ProblemWithSameTitleExists from "../errors/ProblemWithSameTitleExists";
import MultiDataResult from "../interfaces/MultiDataResult";
import { uuid } from "../validators";
import RequestOptions from "../interfaces/RequestOptions";
import TestCaseService from "./testCase.service";



export default class ProblemsService {
    private testCaseService: TestCaseService;
    constructor() {
        this.testCaseService = new TestCaseService();
    }

    async getAll(opts: RequestOptions): Promise<MultiDataResult<Problem>> {




        const { title, ...otherFilters } = opts.query as { title: string;[key: string]: any };
        const [problems, count] = await prisma.$transaction([


            prisma.problem.findMany({
                where: {
                    ...otherFilters,
                    title: {
                        contains: title,
                        mode: 'insensitive'
                    }

                },
                skip: (opts.page - 1) * opts.limit,
                take: opts.limit,
                orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
            }),
            prisma.problem.count({
                where: opts.query
            })
        ]);

        return {
            data: problems,
            count
        };

    }

    async getById(id: string) {
        const problem = await prisma.problem.findFirst({
            where: {
                id
            }
        });
        return problem;
    }

    async create(problemData: Problem): Promise<Problem> {
        const problemWithSameTitle = await this.getByTitle(problemData.title);

        if (problemWithSameTitle) {
            throw new ProblemWithSameTitleExists("Problem with the same Title already exists");
        }
        const createdProblem = await prisma.problem.create({
            data: problemData
        });
        return createdProblem;
    }

    async delete(id: string) {
        try {
            const deletedPeoblem = await prisma.problem.delete({
                where: {
                    id
                }
            });
            return deletedPeoblem;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle the record not found error (P2025)
                if (error.code === 'P2025') {
                    return null;
                }

            }

        }

    }

    async update(id: string, updatesDto: any) {



        // Try to find out why it happens and how to fix it
        // It is important to validate the id before querying the database to avoid database being stuck
        const { error } = uuid.validate(id);

        if (error) {
            return null;
        }
        try {
            if (updatesDto.title) {
                const problemWithSameTitle = await this.getByTitle(updatesDto.title);
                if (problemWithSameTitle && problemWithSameTitle.id !== id) {
                    throw new ProblemWithSameTitleExists("Problem with the same Title already exists");
                }
            }


            console.log(id);
            const updatedProblem = await prisma.problem.update({
                where: {
                    id
                },
                data: updatesDto

            });


            return updatedProblem;
        } catch (error) {
            throw error;
        }
    }

    async getByTitle(title: string): Promise<Problem | null> {
        const problem = await prisma.problem.findFirst({
            where: {
                title
            }
        });
        return problem;
    }

    async getTestCases(problemId: string): Promise<MultiDataResult<TestCase>> {
        const testCases = await this.testCaseService.getAll({ query: { problemId }, limit: 100, page: 1 });
        return testCases;
    }
}