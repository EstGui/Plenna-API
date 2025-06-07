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

export const createBook = async (bookData: any) => {
    const newBook = {
        id: Date.now(),
        ...bookData,
        data_cadastro: new Date(),
        data_atualizacao: new Date()
    };

    return ok(newBook);
}

export const updateBook = async (bookId: number, bookData: any) => {
    const updatedBook = {
        id: bookId,
        ...bookData,
        data_atualizacao: new Date()
    };

    return ok(updatedBook);
}

export const deleteBook = async (bookId: number) => {
    await bookRepository.deleteBookById(bookId);
    let response = await ok({ message: "Book deleted successfully" });

    return response;
}
