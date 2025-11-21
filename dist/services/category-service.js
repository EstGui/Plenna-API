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

// src/services/category-service.ts
var category_service_exports = {};
__export(category_service_exports, {
  createCategory: () => createCategory2,
  deleteCategory: () => deleteCategory,
  getCategories: () => getCategories,
  getCategoryById: () => getCategoryById,
  updateCategory: () => updateCategory2
});
module.exports = __toCommonJS(category_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
});
