import { User } from "@prisma/client";
import { sign } from "jsonwebtoken"
import { Request } from "express";
import { PaginationConfig } from "../config/pagination.config";



export const issueJwtToken = async (userData: User, expiresIn: string) => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("No JWT_SECRET was provided");
    }
    const token = sign({ sub: userData.id, role: userData.role, userName: userData.userName }, secretKey, { expiresIn });
    return `Bearer ${token}`;

}


export const pasreQueryString = (req: Request) => {
    let page: number;
    if (req.query.page) {
        page = parseInt(req.query.page as string);
    } else {
        page = 1;
    }

    let limit: number;
    if (req.query.limit) {
        limit = parseInt(req.query.limit as string);
    } else {
        limit = PaginationConfig.MAX_PAGE_SIZE;
    }

    return { page, limit };
}


