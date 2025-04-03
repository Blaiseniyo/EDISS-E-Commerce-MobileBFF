/*
services.ts
description: This file contains the services for books, using axios to forward requests to the Book Service
author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
*/

import Book from "../../models/book";
import apiClient from '../../utils/axois';
import { CreateBookInput, UpdateBookInput } from './type';

type CustomBookData = Omit<Book, 'genre'> & { genre: number };

export class BookService {
    async createBook(bookData: CreateBookInput['body']) {
        const response = await apiClient.post('/books', bookData);
        return response.data as Book;
    }

    async updateBook(params: UpdateBookInput['params'], bookData: UpdateBookInput['body']) {
        const response = await apiClient.put(`/books/${params.ISBN}`, bookData);
        return response.data as Book;
    }

    async getBookByISBN(ISBN: string) {

        const response = await apiClient.get(`/books/${ISBN}`);
        const bookData = response.data as Book;

        // Transform genre value: replace "non-fiction" with numeric value 3

        // Check if genre field exists and equals "non-fiction"
        if (bookData && bookData.genre === "non-fiction") {
            const transformedBookData = { ...bookData, genre: 3 } as CustomBookData;
            return transformedBookData;
        }

        return bookData;
    }
}

export default new BookService();