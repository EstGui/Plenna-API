"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

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

// src/repositories/user-repository.ts
var findAllUsers = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM usuarios`);
  const users = response.rows;
  return users || [];
});
var findUserById = (id) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
  const user = response.rows[0];
  return user || null;
});
var findUserByEmail = (email) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
  const user = response.rows[0];
  return user || null;
});
var createUser = (userData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `INSERT INTO usuarios (nome, email, senha, endereco, telefone, data_cadastro, data_atualizacao) 
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
        RETURNING *`,
    [userData.nome, userData.email, userData.senha, userData.endereco, userData.telefone]
  );
  return response.rows[0];
});
var updateUser = (id, userData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `UPDATE usuarios 
        SET nome = $1, email = $2, senha = $3, endereco = $4, telefone = $5, data_atualizacao = NOW() 
        WHERE id = $6 
        RETURNING *`,
    [userData.nome, userData.email, userData.senha, userData.endereco, userData.telefone, id]
  );
  return response.rows[0] || null;
});
var deleteUser = (id) => __async(null, null, function* () {
  yield db_default.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
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

// src/services/user-service.ts
var getUser = () => __async(null, null, function* () {
  const data = yield findAllUsers();
  let response = null;
  yield findAllUsers();
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var getUserById = (userId) => __async(null, null, function* () {
  const data = yield findUserById(userId);
  let response = null;
  yield findUserById(userId);
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var getUserByEmail = (email) => __async(null, null, function* () {
  const data = yield findUserByEmail(email);
  let response = null;
  yield findUserByEmail(email);
  if (data) response = yield ok(data);
  else response = yield notFound();
  return response;
});
var createUser2 = (userData) => __async(null, null, function* () {
  const newUser = __spreadProps(__spreadValues({}, userData), {
    dataCadastro: /* @__PURE__ */ new Date(),
    dataAtualizacao: /* @__PURE__ */ new Date()
  });
  yield createUser(newUser);
  return ok(newUser);
});
var updateUser2 = (userId, userData) => __async(null, null, function* () {
  const updatedUser = __spreadProps(__spreadValues({
    id: userId
  }, userData), {
    dataAtualizacao: /* @__PURE__ */ new Date()
  });
  yield updateUser(userId, updatedUser);
  return ok(updatedUser);
});
var deleteUser2 = (userId) => __async(null, null, function* () {
  yield deleteUser(userId);
  return ok({ message: `User with ID ${userId} deleted successfully.` });
});

// src/controllers/user-controller.ts
var getUsers = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getUser();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getUserById2 = (req, res) => __async(null, null, function* () {
  const userId = req.params.id;
  const httpResponse = yield getUserById(parseInt(userId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getUserByEmail2 = (req, res) => __async(null, null, function* () {
  const email = req.params.email;
  const httpResponse = yield getUserByEmail(email);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var createUser3 = (req, res) => __async(null, null, function* () {
  const userData = req.body;
  const httpResponse = yield createUser2(userData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var updateUser3 = (req, res) => __async(null, null, function* () {
  const userId = req.params.id;
  const userData = req.body;
  const httpResponse = yield updateUser2(parseInt(userId), userData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var deleteUser3 = (req, res) => __async(null, null, function* () {
  const userId = req.params.id;
  const httpResponse = yield deleteUser2(parseInt(userId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});

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
var findAvailableBooks = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM livros WHERE disponibilidade = true`);
  const books = response.rows;
  return books || [];
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

// src/repositories/category-repository.ts
var findAllCategories = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM categorias`);
  const categories = response.rows;
  return categories || [];
});
var findCategoryById = (id) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM categorias WHERE id = $1`, [id]);
  const category = response.rows[0];
  return category || null;
});
var createCategory = (categoryData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `INSERT INTO categorias (nome, descricao) 
         VALUES ($1, $2) 
         RETURNING *`,
    [categoryData.nome, categoryData.descricao]
  );
  return response.rows[0];
});
var updateCategory = (id, categoryData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `UPDATE categorias 
         SET nome = $1, descricao = $2 
         WHERE id = $3 
         RETURNING *`,
    [categoryData.nome, categoryData.descricao, id]
  );
  return response.rows[0] || null;
});
var deleteCategoryById = (id) => __async(null, null, function* () {
  yield db_default.query(`DELETE FROM categorias WHERE id = $1`, [id]);
});

// src/services/category-service.ts
var getCategories = () => __async(null, null, function* () {
  const data = yield findAllCategories();
  let response = null;
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var getCategoryById = (categoryId) => __async(null, null, function* () {
  const data = yield findCategoryById(categoryId);
  let response = null;
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var createCategory2 = (categoryData) => __async(null, null, function* () {
  const newCategory = __spreadProps(__spreadValues({}, categoryData), {
    dataCadastro: /* @__PURE__ */ new Date(),
    dataAtualizacao: /* @__PURE__ */ new Date()
  });
  yield createCategory(newCategory);
  return ok(newCategory);
});
var updateCategory2 = (categoryId, categoryData) => __async(null, null, function* () {
  const updatedCategory = __spreadValues({
    id: categoryId
  }, categoryData);
  yield updateCategory(categoryId, updatedCategory);
  return ok(updatedCategory);
});
var deleteCategory = (categoryId) => __async(null, null, function* () {
  const data = yield deleteCategoryById(categoryId);
  let response = yield ok(data);
  return response;
});

// src/controllers/category-controller.ts
var getCategories2 = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getCategories();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getCategoryById2 = (req, res) => __async(null, null, function* () {
  const categoryId = req.params.id;
  const httpResponse = yield getCategoryById(parseInt(categoryId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var createCategory3 = (req, res) => __async(null, null, function* () {
  const categoryData = req.body;
  const httpResponse = yield createCategory2(categoryData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var updateCategory3 = (req, res) => __async(null, null, function* () {
  const categoryId = req.params.id;
  const categoryData = req.body;
  const httpResponse = yield updateCategory2(parseInt(categoryId), categoryData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var deleteCategory2 = (req, res) => __async(null, null, function* () {
  const categoryId = req.params.id;
  const httpResponse = yield deleteCategory(parseInt(categoryId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});

// src/repositories/rate-repository.ts
var findAllRates = () => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM avaliacoes`);
  return response.rows || [];
});
var findRateById = (id) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM avaliacoes WHERE id = $1`, [id]);
  return response.rows[0] || null;
});
var createRate = (rateData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario, data_avaliacao) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
    [
      rateData.usuario_id,
      rateData.livro_id,
      rateData.nota,
      rateData.comentario,
      rateData.data_avaliacoes
    ]
  );
  return response.rows[0];
});
var updateRate = (id, rateData) => __async(null, null, function* () {
  const response = yield db_default.query(
    `UPDATE avaliacoes 
         SET usuario_id = $1, livro_id = $2, nota = $3, comentario = $4, data_avaliacao = NOW()
         WHERE id = $6 
         RETURNING *`,
    [
      rateData.usuario_id,
      rateData.livro_id,
      rateData.nota,
      rateData.comentario,
      rateData.data_avaliacoes,
      id
    ]
  );
  return response.rows[0] || null;
});
var deleteRateById = (id) => __async(null, null, function* () {
  yield db_default.query(`DELETE FROM avaliacoes WHERE id = $1`, [id]);
});
var findRatesByBook = (bookId) => __async(null, null, function* () {
  const response = yield db_default.query(`SELECT * FROM avaliacoes WHERE livro_id = $1`, [bookId]);
  return response.rows || [];
});

// src/services/rate-service.ts
var getRates = () => __async(null, null, function* () {
  const data = yield findAllRates();
  let response = null;
  if (data) response = yield ok(data);
  else response = yield noContent();
  return response;
});
var getRateById = (rateId) => __async(null, null, function* () {
  const data = yield findRateById(rateId);
  let response = null;
  if (data) response = yield ok(data);
  else response = yield notFound();
  return response;
});
var createRate2 = (rateData) => __async(null, null, function* () {
  const newRate = __spreadProps(__spreadValues({}, rateData), {
    data_avaliacao: /* @__PURE__ */ new Date()
  });
  yield createRate(newRate);
  return ok(newRate);
});
var updateRate2 = (rateId, rateData) => __async(null, null, function* () {
  const updatedRate = __spreadProps(__spreadValues({}, rateData), {
    data_avaliacao: /* @__PURE__ */ new Date()
  });
  yield updateRate(rateId, updatedRate);
  return ok(updatedRate);
});
var deleteRate = (rateId) => __async(null, null, function* () {
  yield deleteRateById(rateId);
  let response = yield ok({ message: "Rate deleted successfully" });
  return response;
});
var getBookRates = (bookId) => __async(null, null, function* () {
  const data = yield findRatesByBook(bookId);
  let response = null;
  if (data && data.length > 0) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});

// src/controllers/rate-controller.ts
var getRates2 = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getRates();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getRateById2 = (req, res) => __async(null, null, function* () {
  const rateId = req.params.id;
  const httpResponse = yield getRateById(parseInt(rateId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var createRate3 = (req, res) => __async(null, null, function* () {
  const rateData = req.body;
  const httpResponse = yield createRate2(rateData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var updateRate3 = (req, res) => __async(null, null, function* () {
  const rateId = req.params.id;
  const rateData = req.body;
  const httpResponse = yield updateRate2(parseInt(rateId), rateData);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var deleteRate2 = (req, res) => __async(null, null, function* () {
  const rateId = req.params.id;
  const httpResponse = yield deleteRate(parseInt(rateId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getBookRates2 = (req, res) => __async(null, null, function* () {
  const bookId = req.params.id;
  const httpResponse = yield getBookRates(parseInt(bookId));
  res.status(httpResponse.statusCode).json(httpResponse.body);
});

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/users", getUsers);
router.get("/user/:id", getUserById2);
router.post("/user", createUser3);
router.put("/user/:id", updateUser3);
router.delete("/user/:id", deleteUser3);
router.get("/user/email/:email", getUserByEmail2);
router.get("/books", getBooks2);
router.get("/book/:id", getBookById2);
router.post("/book", createBook3);
router.put("/book/:id", updateBook3);
router.delete("/book/:id", deleteBook3);
router.get("/books/category/:categoryId", getBooksByCategory2);
router.get("/books/author/:author", getBooksByAuthor2);
router.get("/books/title/:title", getBooksByTitle2);
router.get("/books/available", getAvailableBooks2);
router.get("/categories", getCategories2);
router.get("/category/:id", getCategoryById2);
router.post("/category", createCategory3);
router.put("/category/:id", updateCategory3);
router.delete("/category/:id", deleteCategory2);
router.get("/rates", getRates2);
router.get("/rate/:id", getRateById2);
router.get("/book/:id/rates", getBookRates2);
router.post("/rate", createRate3);
router.put("/rate/:id", updateRate3);
router.delete("/rate/:id", deleteRate2);
var routes_default = router;
