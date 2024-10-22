import { NextFunction, Response, Request } from "express";
import SubmissionsService from "../services/submissions.service";
import BaseResponseDto from "../dtos/BaseResponse.dto";
import { User } from "@prisma/client";
import MessageNotPublishedToQueue from "../errors/MessageNotPublishedToQueue";
import PaginatedResponseDto from "../dtos/PaginatedResponse.dto";

export default class SubmissionsController {

    /**
     *
     */
    private submissionsService: SubmissionsService;
    constructor() {
        this.submissionsService = new SubmissionsService();
    }
    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const user = req.user as { userName: string, sub: string, role: string };

            const submissionData = {
                ...req.body,
                code: req.body.code,
                userId: user.sub
            }

            const submission = await this.submissionsService.create(submissionData);

            res.json(new BaseResponseDto(true, "Submission created successfully", submission));

        } catch (error) {
            if (error instanceof MessageNotPublishedToQueue) {
                res.status(500).json(new BaseResponseDto(false, "Submission created successfully but not published to queue", null));
            }
            next(error);
        }



    }


    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const submissions = await this.submissionsService.getAll(res.locals.options);
            res.json(new PaginatedResponseDto(true, "Submissions fetched successfully", submissions.data, submissions.count, res.locals.options.page, res.locals.options.limit));
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {

        try {
            const submission = await this.submissionsService.getById(req.params.id);
            if (!submission) {
                return res.status(404).json(new BaseResponseDto(false, "Submission not found", null));
            }
            res.json(new BaseResponseDto(true, "Submission fetched successfully", submission));
        } catch (error) {
            next(error);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {

        try {
            const submission = await this.submissionsService.delete(req.params.id);
            if (!submission) {
                return res.status(404).json(new BaseResponseDto(false, "Submission not found", null));
            }
            res.json(new BaseResponseDto(true, "Submission deleted successfully", submission));
        } catch (error) {
            next(error);
        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const submission = await this.submissionsService.update(req.params.id, req.body);
            res.json(new BaseResponseDto(true, "Submission updated successfully", submission));
        } catch (error) {
            next(error);
        }
    }
}