import { HttpResponse } from "../models/htttpResponse-model";

export const ok = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 200,
        body: data
    };
};

export const created = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 201,
        body: data
    };
};

export const noContent = async (): Promise<HttpResponse> => {
    return {
        statusCode: 204,
        body: null
    };
};

export const badRequest = async (message: string): Promise<HttpResponse> => {
    return {
        statusCode: 400,
        body: { error: message }
    };
};

export const unauthorized = async (message: string = "Unauthorized"): Promise<HttpResponse> => {
    return {
        statusCode: 401,
        body: { error: message }
    };
};

export const forbidden = async (message: string = "Forbidden"): Promise<HttpResponse> => {
    return {
        statusCode: 403,
        body: { error: message }
    };
};

export const notFound = async (message: string = "Not found"): Promise<HttpResponse> => {
    return {
        statusCode: 404,
        body: { error: message }
    };
};

export const conflict = async (message: string): Promise<HttpResponse> => {
    return {
        statusCode: 409,
        body: { error: message }
    };
};

export const serverError = async (message: string = "Internal server error"): Promise<HttpResponse> => {
    return {
        statusCode: 500,
        body: { error: message }
    };
};
