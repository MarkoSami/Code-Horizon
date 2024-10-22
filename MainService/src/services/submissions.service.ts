import { Prisma, Submission } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import createSubmissionDto from "../dtos/submissionDtos/createSubmission.dto";
import AssosiatedProblemNotFound from "../errors/AssosiatedProblemNotFound";
import AssocitedUserNotFound from "../errors/AssociatedUserNotFound";
import MultiDataResult from "../interfaces/MultiDataResult";
import RequestOptions from "../interfaces/RequestOptions";
import MessageProducer from "../RabbitMQ/MessageProducer"
import MessageNotPublishedToQueue from "../errors/MessageNotPublishedToQueue";


export default class SubmissionsService {

    async create(submissionDto: createSubmissionDto): Promise<Submission | null> {
        const associatedProblem = await prisma.problem.findFirst({
            where: {
                id: submissionDto.problemId
            }
        })


        if (!associatedProblem) {
            throw new AssosiatedProblemNotFound();
        }

        const associatedUser = await prisma.user.findFirst({
            where: {
                id: submissionDto.userId
            }
        });

        if (!associatedUser) {
            throw new AssocitedUserNotFound();
        }

        const createdSubmission = await prisma.submission.create({
            data: submissionDto
        });

        if (!createdSubmission) {
            return null;
        }



        // add submission to submission squeue
        await MessageProducer.createChannel();
        const message = JSON.stringify({
            submissionId: createdSubmission.id,
            code: createdSubmission.code,
            language: createdSubmission.language,
            problemId: createdSubmission.problemId,
        });
        const published = await MessageProducer.publishMessage("submission", message);

        if (!published) {
            throw new MessageNotPublishedToQueue();
        }


        return createdSubmission;

    }

    async getAll(opts: RequestOptions): Promise<MultiDataResult<Submission>> {

        const { title, ...otherFilters } = opts.query as { title: string;[key: string]: any };
        const [submissions, count] = await prisma.$transaction([


            prisma.submission.findMany({
                where: {
                    ...otherFilters,
                },
                skip: (opts.page - 1) * opts.limit,
                take: opts.limit,
                orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
            }),
            prisma.submission.count({
                where: opts.query
            })
        ]);

        return {
            data: submissions,
            count
        };
    }


    async getById(id: string): Promise<Submission | null> {

        const submission = await prisma.submission.findFirst({
            where: {
                id
            }
        });

        return submission;
    }

    async delete(id: string): Promise<Submission | null> {
        try {
            const deletedSubmission = await prisma.submission.delete({
                where: {
                    id
                }
            });

            return deletedSubmission;
        }

        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle the record not found error (P2025)
                if (error.code === 'P2025') {
                    return null;
                }
            }
            throw error; // Rethrow the error if it's not handled
        }
    }

    async update(id: string, submissionDto: any): Promise<Submission> {
        const updatedSubmission = await prisma.submission.update({
            where: {
                id
            },
            data: submissionDto
        });

        return updatedSubmission;
    }

}