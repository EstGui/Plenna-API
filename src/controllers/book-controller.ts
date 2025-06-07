import { Request, Response } from 'express';
import * as bookService from '../services/book-service';


export const getBooks = async (req: Request, res: Response) => {
    const httpResponse = await bookService.getBooks();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const getBookById = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const httpResponse = await bookService.getBookById(parseInt(bookId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const createBook = async (req: Request, res: Response) => {
    const bookData = req.body;
    const httpResponse = await bookService.createBook(bookData);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const bookData = req.body;
    const httpResponse = await bookService.updateBook(parseInt(bookId), bookData);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const httpResponse = await bookService.deleteBook(parseInt(bookId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};
