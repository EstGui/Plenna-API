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

// src/repositories/user-repository.ts
var user_repository_exports = {};
__export(user_repository_exports, {
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  findAllUsers: () => findAllUsers,
  findUserByEmail: () => findUserByEmail,
  findUserById: () => findUserById,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUser
});
