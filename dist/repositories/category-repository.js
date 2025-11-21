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

// src/repositories/category-repository.ts
var category_repository_exports = {};
__export(category_repository_exports, {
  createCategory: () => createCategory,
  deleteCategoryById: () => deleteCategoryById,
  findAllCategories: () => findAllCategories,
  findCategoryById: () => findCategoryById,
  updateCategory: () => updateCategory
});
module.exports = __toCommonJS(category_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCategory,
  deleteCategoryById,
  findAllCategories,
  findCategoryById,
  updateCategory
});
