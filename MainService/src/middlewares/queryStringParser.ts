import { NextFunction, Request, Response } from 'express';
import { PaginationConfig } from '../config/pagination.config';
import RequestOptions from '../interfaces/RequestOptions';

export default (req: Request, res: Response, next: NextFunction) => {


    const { page, limit, sortBy, order, ...query } = req.query;

    if (query.title) {
        query.title = query.title.toString().toLowerCase();
    }
    let options: RequestOptions = {
        page: Number(page) || 1,
        limit: Number(limit) || PaginationConfig.MAX_PAGE_SIZE,
        sortBy: (sortBy ? sortBy : "").toString(),
        order: order === 'desc' ? 'desc' : 'asc',
        query: query || {}
    };

    res.locals.options = options;

    next();
};