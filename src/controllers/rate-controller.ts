import { Request, Response } from 'express';
import * as bookService from '../services/rate-service';


export const getRates = async (req: Request, res: Response) => {
    const httpResponse = await bookService.getRates();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getRateById = async (req: Request, res: Response) => {
    const rateId = req.params.id;
    const httpResponse = await bookService.getRateById(parseInt(rateId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const createRate = async (req: Request, res: Response) => {
    const rateData = req.body;
    const httpResponse = await bookService.createRate(rateData);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updateRate = async (req: Request, res: Response) => {
    const rateId = req.params.id;
    const rateData = req.body;
    const httpResponse = await bookService.updateRate(parseInt(rateId), rateData);
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deleteRate = async (req: Request, res: Response) => {
    const rateId = req.params.id;
    const httpResponse = await bookService.deleteRate(parseInt(rateId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getBookRates = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const httpResponse = await bookService.getBookRates(parseInt(bookId));

    res.status(httpResponse.statusCode).json(httpResponse.body);
};
