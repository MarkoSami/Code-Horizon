import { Prisma, TestCase } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import MultiDataResult from "../interfaces/MultiDataResult";
import RequestOptions from "../interfaces/RequestOptions";
import AssosiatedProblemNotFound from "../errors/AssosiatedProblemNotFound";
import CreateTestCaseDto from "../dtos/testCaseDtos/createTestCase.dto";
import { uuid } from "../validators";


export default class TestCaseService {
    async getAll(opts: RequestOptions): Promise<MultiDataResult<TestCase>> {




        console.log(opts.query);
        const [testCases, count] = await prisma.$transaction([


            prisma.testCase.findMany({
                where: opts.query,
                // skip: (opts.page - 1) * opts.limit,
                take: 500,
                orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
            }),
            prisma.testCase.count({
                where: opts.query
            })
        ]);

        return {
            data: testCases,
            count
        };

    }

    async getById(id: string) {
        const testCase = await prisma.testCase.findFirst({
            where: {
                id
            }
        });
        return testCase;
    }

    async create(testCaseData: CreateTestCaseDto): Promise<TestCase> {
        const assosiatedProblem = await prisma.problem.findFirst({
            where: {
                id: testCaseData.problemId
            }
        });

        if (!assosiatedProblem) {
            throw new AssosiatedProblemNotFound();
        }

        const createdTestCase = await prisma.testCase.create({
            data: testCaseData
        });

        return createdTestCase

    }

    async delete(id: string) {
        try {
            const deletedPeoblem = await prisma.testCase.delete({
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

        // It is important to validate the id before querying the database to avoid database being stuck
        const { error } = uuid.validate(id);


        if (updatesDto.problemId) {
            const assosiatedProblem = await prisma.problem.findFirst({
                where: {
                    id: updatesDto.problemId
                }
            });

            if (!assosiatedProblem) {
                throw new AssosiatedProblemNotFound();
            }
        }

        if (error) {
            return null;
        }
        try {
            const updatedTestCase = await prisma.testCase.update({
                where: {
                    id
                },
                data: updatesDto

            });

            return updatedTestCase;
        } catch (error) {
            throw error;
        }
    }


}