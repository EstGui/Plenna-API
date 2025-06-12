import { IRate } from "../models/rate-model";
import * as bookRepository from "../repositories/rate-repository";
import { noContent, notFound, ok } from "../utils/http-helper"

export const getRates = async () => {
    const data = await bookRepository.findAllRates();
    let response = null;

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}

export const getRateById = async (rateId: number) => {
    const data = await bookRepository.findRateById(rateId);
    let response = null;

    if (data) response = await ok(data);
    else response = await notFound();

    return response;
}

export const createRate = async (rateData: IRate) => {
    const newRate = {
        ...rateData,
        data_avaliacao: new Date()
    };

    await bookRepository.createRate(newRate);

    return ok(newRate);
}

export const updateRate = async (rateId: number, rateData: any) => {
    const updatedRate = {
        ...rateData,
        data_avaliacao: new Date()
    };

    await bookRepository.updateRate(rateId, updatedRate);

    return ok(updatedRate);
}

export const deleteRate = async (rateId: number) => {
    await bookRepository.deleteRateById(rateId);
    let response = await ok({ message: "Rate deleted successfully" });

    return response;
}

export const getBookRates = async (bookId: number) => {
    const data = await bookRepository.findRatesByBook(bookId);
    let response = null;

    if (data && data.length > 0) {
        response = await ok(data);
    } else {
        response = await noContent();
    }

    return response;
}
