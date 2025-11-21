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

// src/controllers/rate-controller.ts
var rate_controller_exports = {};
__export(rate_controller_exports, {
  createRate: () => createRate3,
  deleteRate: () => deleteRate2,
  getBookRates: () => getBookRates2,
  getRateById: () => getRateById2,
  getRates: () => getRates2,
  updateRate: () => updateRate3
});
module.exports = __toCommonJS(rate_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRate,
  deleteRate,
  getBookRates,
  getRateById,
  getRates,
  updateRate
});
