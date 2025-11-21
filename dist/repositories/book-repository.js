"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/repositories/book-repository.ts
var book_repository_exports = {};
__export(book_repository_exports, {
  createBook: () => createBook,
  deleteBook: () => deleteBook,
  findAllBooks: () => findAllBooks,
  findAvailableBooks: () => findAvailableBooks,
  findBookById: () => findBookById,
  findBooksByAuthor: () => findBooksByAuthor,
  findBooksByAvailability: () => findBooksByAvailability,
  findBooksByCategory: () => findBooksByCategory,
  findBooksByTitle: () => findBooksByTitle,
  findBooksByUser: () => findBooksByUser,
  updateBook: () => updateBook
});
module.exports = __toCommonJS(book_repository_exports);

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
var findBooksByAvailability = (isAvailable) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE disponibilidade = $1`, [isAvailable]);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBook,
  deleteBook,
  findAllBooks,
  findAvailableBooks,
  findBookById,
  findBooksByAuthor,
  findBooksByAvailability,
  findBooksByCategory,
  findBooksByTitle,
  findBooksByUser,
  updateBook
});
