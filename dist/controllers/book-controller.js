"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/book-controller.ts
var book_controller_exports = {};
__export(book_controller_exports, {
  createBook: () => createBook3,
  deleteBook: () => deleteBook3,
  getAvailableBooks: () => getAvailableBooks2,
  getBookById: () => getBookById2,
  getBooks: () => getBooks2,
  getBooksByAuthor: () => getBooksByAuthor2,
  getBooksByCategory: () => getBooksByCategory2,
  getBooksByTitle: () => getBooksByTitle2,
  getBooksByUser: () => getBooksByUser2,
  updateBook: () => updateBook3
});
module.exports = __toCommonJS(book_controller_exports);

// src/db.ts
var import_pg = require("pg");
var pool = new import_pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
    // Supabase exige SSL com essa configuração
  }
});
var db_default = pool;

// src/repositories/book-repository.ts
var findAllBooks = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros`);
  const books = response.rows;
  return books || [];
});
var findBookById = (id) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE id = $1`, [id]);
  const book = response.rows[0];
  return book || null;
});
var createBook = (bookData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `INSERT INTO livros (titulo, autor, editora, sinopse, capa, disponibilidade, categoria_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
    [
      bookData.titulo,
      bookData.autor,
      bookData.editora,
      bookData.sinopse,
      bookData.capa,
      bookData.disponibilidade,
      bookData.categoria_id
    ]
  );
  return response.rows[0];
});
var updateBook = (id, bookData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `UPDATE livros 
         SET titulo = $1, autor = $2, editora = $3, sinopse = $4, capa = $5, disponibilidade = $6, categoria_id = $7, avaliacao_id = $8 
         WHERE id = $9 
         RETURNING *`,
    [
      bookData.titulo,
      bookData.autor,
      bookData.editora,
      bookData.sinopse,
      bookData.capa,
      bookData.disponibilidade,
      bookData.categoria_id,
      bookData.avaliacao_id,
      id
    ]
  );
  return response.rows[0] || null;
});
var deleteBook = (id) => __async(null, null, function* () {
  yield db_default.query(`DELETE FROM livros WHERE id = $1`, [id]);
});
var findBooksByCategory = (category_id) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE categoria_id = $1`, [category_id]);
  const books = response.rows;
  return books || [];
});
var findBooksByAuthor = (author) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE autor ILIKE $1`, [`%${author}%`]);
  const books = response.rows;
  return books || [];
});
var findBooksByTitle = (title) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE titulo ILIKE $1`, [`%${title}%`]);
  const books = response.rows;
  return books || [];
});
var findBooksByUser = (userId) => __async(null, null, function* () {
  const response = yield db_default.query(
    `SELECT l.* FROM livros l 
         JOIN Emprestimo e ON l.id = e.livros_id 
         WHERE e.usuario_id = $1`,
    [userId]
  );
  const books = response.rows;
  return books || [];
});
var findAvailableBooks = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE disponibilidade = true`);
  const books = response.rows;
  return books || [];
});

// src/utils/http-helper.ts
var ok = (data) => __async(null, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var noContent = () => __async(null, null, function* () {
  return {
    statusCode: 204,
    body: null
  };
});
var notFound = (message = "Not found") => __async(null, null, function* () {
  return {
    statusCode: 404,
    body: { error: message }
  };
});

// src/services/book-service.ts
var getBooks = () => __async(null, null, function* () {
  const data = yield findAllBooks();
  let response = null;
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var getBookById = (bookId) => __async(null, null, function* () {
  const data = yield findBookById(bookId);
  let response = null;
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var createBook2 = (bookData) => __async(null, null, function* () {
  const newBook = __spreadValues({}, bookData);
  yield createBook(newBook);
  return ok(newBook);
});
var updateBook2 = (bookId, bookData) => __async(null, null, function* () {
  const updatedBook = __spreadValues({}, bookData);
  yield updateBook(bookId, updatedBook);
  return ok(updatedBook);
});
var deleteBook2 = (bookId) => __async(null, null, function* () {
  yield deleteBook(bookId);
  let response = yield ok({ message: "Book deleted successfully" });
  return response;
});
var getBooksByCategory = (categoryId) => __async(null, null, function* () {
  const data = yield findBooksByCategory(categoryId);
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield notFound("No books found for this category");
  }
  return response;
});
var getBooksByUser = (userId) => __async(null, null, function* () {
  const data = yield findBooksByUser(userId);
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield notFound("No books found for this user");
  }
  return response;
});
var getBooksByAuthor = (author) => __async(null, null, function* () {
  const data = yield findBooksByAuthor(author);
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield notFound("No books found for this author");
  }
  yield findBooksByAuthor(author);
  return response;
});
var getBooksByTitle = (title) => __async(null, null, function* () {
  const data = yield findBooksByTitle(title);
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield notFound("No books found with this title");
  }
  return response;
});
var getAvailableBooks = () => __async(null, null, function* () {
  const data = yield findAvailableBooks();
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield notFound("No available books found");
  }
  return response;
});

// src/controllers/book-controller.ts
var getBooks2 = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getBooks();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBookById2 = (req, res) => __async(null, null, function* () {
  const bookId = req.params.id;
  const httpResponse = yield getBookById(parseInt(bookId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var createBook3 = (req, res) => __async(null, null, function* () {
  const bookData = req.body;
  const httpResponse = yield createBook2(bookData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var updateBook3 = (req, res) => __async(null, null, function* () {
  const bookId = req.params.id;
  const bookData = req.body;
  const httpResponse = yield updateBook2(parseInt(bookId), bookData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var deleteBook3 = (req, res) => __async(null, null, function* () {
  const bookId = req.params.id;
  const httpResponse = yield deleteBook2(parseInt(bookId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBooksByCategory2 = (req, res) => __async(null, null, function* () {
  const categoryId = req.params.categoryId;
  const httpResponse = yield getBooksByCategory(parseInt(categoryId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBooksByUser2 = (req, res) => __async(null, null, function* () {
  const userId = req.params.userId;
  const httpResponse = yield getBooksByUser(parseInt(userId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBooksByAuthor2 = (req, res) => __async(null, null, function* () {
  const author = req.params.author;
  const httpResponse = yield getBooksByAuthor(author);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBooksByTitle2 = (req, res) => __async(null, null, function* () {
  const title = req.params.title;
  const httpResponse = yield getBooksByTitle(title);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getAvailableBooks2 = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getAvailableBooks();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBook,
  deleteBook,
  getAvailableBooks,
  getBookById,
  getBooks,
  getBooksByAuthor,
  getBooksByCategory,
  getBooksByTitle,
  getBooksByUser,
  updateBook
});
