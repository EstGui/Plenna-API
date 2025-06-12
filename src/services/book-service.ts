import { IBook } from "../models/book-model";
import * as bookRepository from "../repositories/book-repository";
import { noContent, notFound, ok } from "../utils/http-helper"


export const getBooks = async () => {
    const data = await bookRepository.findAllBooks();
    let response = null;

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}

export const getBookById = async (bookId: number) => {
    const data = await bookRepository.findBookById(bookId);
    let response = null;

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}   

export const createBook = async (bookData: IBook) => {
    const newBook = {
        ...bookData,
        data_cadastro: new Date(),
        data_atualizacao: new Date()
    };

    await bookRepository.createBook(newBook);

    return ok(newBook);
}

export const updateBook = async (bookId: number, bookData: any) => {
    const updatedBook = {
        ...bookData,
        data_atualizacao: new Date()
    };

    await bookRepository.updateBook(bookId, updatedBook);

    return ok(updatedBook);
}

export const deleteBook = async (bookId: number) => {
    await bookRepository.deleteBook(bookId);

    let response = await ok({ message: "Book deleted successfully" });

    return response;
}


export const getBooksByCategory = async (categoryId: number) => {
    const data = await bookRepository.findBooksByCategory(categoryId);
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await notFound("No books found for this category");
    }

    return response;
};


export const getBooksByUser = async (userId: number) => {
    const data = await bookRepository.findBooksByUser(userId);
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await notFound("No books found for this user");
    }

    return response;
};


export const getBooksByAuthor = async (author: string) => {
    const data = await bookRepository.findBooksByAuthor(author);
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await notFound("No books found for this author");
    }

    await bookRepository.findBooksByAuthor(author);

    return response;
};


export const getBooksByTitle = async (title: string) => {
    const data = await bookRepository.findBooksByTitle(title);
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await notFound("No books found with this title");
    }

    return response;
};


export const getAvailableBooks = async () => {
    const data = await bookRepository.findAvailableBooks();
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await notFound("No available books found");
    }

    return response;
};

