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


export const getBooksByCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const httpResponse = await bookService.getBooksByCategory(parseInt(categoryId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const getBooksByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const httpResponse = await bookService.getBooksByUser(parseInt(userId));
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const getBooksByAuthor = async (req: Request, res: Response) => {
    const author = req.params.author;
    const httpResponse = await bookService.getBooksByAuthor(author);
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const getBooksByTitle = async (req: Request, res: Response) => {
    const title = req.params.title;
    const httpResponse = await bookService.getBooksByTitle(title);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};


export const getAvailableBooks = async (req: Request, res: Response) => {
    const httpResponse = await bookService.getAvailableBooks();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

