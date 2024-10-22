import { Request, Response, NextFunction, query } from 'express';
import ProblemsService from '../services/problems.service';
import ProblemDto from '../dtos/problemDtos/problem.dto';
import BaseResponseDto from '../dtos/BaseResponse.dto';
import ProblemWithSameTitleExists from '../errors/ProblemWithSameTitleExists';
import PaginatedResponseDto from '../dtos/PaginatedResponse.dto';
import { pasreQueryString } from '../lib/utils';
import TestCaseService from '../services/testCase.service';
import TestCaseDto from "../dtos/testCaseDtos/testCase.dto";


export default class ProblemsController {

    private problemsService: ProblemsService;
    private testCaseService: TestCaseService;
    constructor() {
        this.problemsService = new ProblemsService();
        this.testCaseService = new TestCaseService();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {

        // do caching here
        const problemsData = await this.problemsService.getAll(res.locals.options);

        const mappedProblems = problemsData.data.map(problem => new ProblemDto(problem));



        res.status(200).json(new PaginatedResponseDto(true,
            'Problems fetched successfully',
            mappedProblems,
            problemsData.count,
            res.locals.options.page,
            res.locals.options.limit
        ));
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const problem = await this.problemsService.create(req.body);
            const mappedProblem = new ProblemDto(problem);
            res.status(201).json(new BaseResponseDto(true, 'Problem created successfully', mappedProblem));

        } catch (error) {
            if (error instanceof ProblemWithSameTitleExists) {
                return res.status(400).json(new BaseResponseDto(false, error.message, null));
            }
            next(error);
        }

    }


    async getById(req: Request, res: Response, next: NextFunction) {
        const problem = await this.problemsService.getById(req.params.id);
        if (!problem) {
            res.status(404).json(new BaseResponseDto(false, 'Problem not found', null));
            return;
        }

        const mappedProblem = new ProblemDto(problem);
        res.status(200).json(new BaseResponseDto(true, 'Problem fetched successfully', mappedProblem));

    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const problem = await this.problemsService.update(req.params.id, req.body);
            if (!problem) {
                return res.status(404).json(new BaseResponseDto(false, 'Problem not found', null));
            }
            const mappedProblem = new ProblemDto(problem);
            res.status(200).json(new BaseResponseDto(true, 'Problem updated successfully', mappedProblem));
        } catch (error) {
            if (error instanceof ProblemWithSameTitleExists) {
                res.status(400).json(new BaseResponseDto(false, error.message, null));
            }
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const deletedProblem = await this.problemsService.delete(req.params.id);
        if (!deletedProblem) {
            return res.status(404).json(new BaseResponseDto(false, 'Problem not found', null));
        }
        res.status(200).json(new BaseResponseDto(true, 'Problem deleted successfully', null));
    }

    async getTestCasesByProblemId(req: Request, res: Response, next: NextFunction) {
        try {
            const probelmTestCases = await this.testCaseService.getAll({
                limit: 100, page: 1, query: { problemId: req.params.id }
            });
            return res.status(200).json(new PaginatedResponseDto(
                true, 'Test cases fetched successfully', probelmTestCases.data.map(testCase => new TestCaseDto(testCase)),
                probelmTestCases.count, 1, 100));
        } catch (error) {
            next(error);
        }
    }
}