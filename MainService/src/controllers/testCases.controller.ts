import { NextFunction, Request, Response } from 'express';
import TestCaseService from '../services/testCase.service';
import TestCaseDto from '..//dtos/testCaseDtos/testCase.dto';
import PaginatedResponseDto from '../dtos/PaginatedResponse.dto';
import BaseResponseDto from '../dtos/BaseResponse.dto';
import AssosiatedProblemNotFound from '../errors/AssosiatedProblemNotFound';
import { Prisma } from '@prisma/client';


export default class TestCaseController {

    private testCaseService: TestCaseService;
    constructor() {
        this.testCaseService = new TestCaseService();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {

        try {
            const testCasesData = await this.testCaseService.getAll(res.locals.options);

            const mappedTestCases = testCasesData.data.map(testCase => new TestCaseDto(testCase));



            res.status(200).json(new PaginatedResponseDto(true,
                'Test cases fetched successfully',
                mappedTestCases,
                testCasesData.count,
                res.locals.options.page,
                res.locals.options.limit
            ));

        } catch (error) {
            next(error);
        }


    }

    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const testCase = await this.testCaseService.create(req.body);
            const mappedTestCase = new TestCaseDto(testCase);
            res.status(201).json(new BaseResponseDto(true, 'Test case created successfully', mappedTestCase));

        } catch (error) {
            if (error instanceof AssosiatedProblemNotFound) {
                return res.status(400).json(new BaseResponseDto(false, error.message, null));
            }
            next(error);
        }

    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {

            const testCase = await this.testCaseService.getById(req.params.id);
            if (!testCase) {
                return res.status(404).json(new BaseResponseDto(false, 'Test case not found', null));
            }
            return res.status(200).json(new BaseResponseDto(true, 'Test case fetched successfully', new TestCaseDto(testCase)));
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const testCase = await this.testCaseService.update(req.params.id, req.body);
            if (!testCase) {
                return res.status(404).json(new BaseResponseDto(false, 'Test case not found', null));
            }
            return res.status(200).json(new BaseResponseDto(true, 'Test case updated successfully', new TestCaseDto(testCase)));
        } catch (error) {
            if (error instanceof AssosiatedProblemNotFound) {
                return res.status(400).json(new BaseResponseDto(false, error.message, null));
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle the record not found error (P2025)
                if (error.code === 'P2025') {
                    return res.status(404).json(new BaseResponseDto(false, 'Test case not found', null));
                }

            }
            next(error);
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const testCase = await this.testCaseService.delete(req.params.id);
            if (!testCase) {
                return res.status(404).json(new BaseResponseDto(false, 'Test case not found', null));
            }
            return res.status(200).json(new BaseResponseDto(true, 'Test case deleted successfully', null));
        } catch (error) {
            next(error);
        }
    }




}