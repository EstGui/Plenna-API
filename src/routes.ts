import { Router } from "express";
import * as userController from "./controllers/user-controller";
import * as bookController from "./controllers/book-controller";
import * as categoryController from "./controllers/category-controller";
import * as rateController from "./controllers/rate-controller";

const router = Router();

// Define routes for user operations
router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/user/email/:email", userController.getUserByEmail);

// Define routes for book operations
router.get("/books", bookController.getBooks);
router.get("/book/:id", bookController.getBookById);
router.post("/book", bookController.createBook);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);
router.get("/books/category/:categoryId", bookController.getBooksByCategory);
router.get("/books/author/:author", bookController.getBooksByAuthor);
router.get("/books/title/:title", bookController.getBooksByTitle);
router.get("/books/available", bookController.getAvailableBooks);

// Define routes for category operations
router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.createCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

// Define routes for rate operations
router.get("/rates" , rateController.getRates);
router.get("/rate/:id" , rateController.getRateById);
router.get("/book/:id/rates" , rateController.getBookRates);
router.post("/rate" , rateController.createRate);
router.put("/rate/:id" , rateController.updateRate);
router.delete("/rate/:id" , rateController.deleteRate);

export default router;
