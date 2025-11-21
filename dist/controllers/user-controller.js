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

// src/controllers/user-controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  createUser: () => createUser3,
  deleteUser: () => deleteUser3,
  getUserByEmail: () => getUserByEmail2,
  getUserById: () => getUserById2,
  getUsers: () => getUsers,
  updateUser: () => updateUser3
});
module.exports = __toCommonJS(user_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser
});
