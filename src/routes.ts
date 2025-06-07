import { Router } from "express";
import * as userController from "./controllers/user-controller";
import * as bookController from "./controllers/book-controller";
import * as categoryController from "./controllers/category-controller";

const router = Router();

// Define routes for user operations
router.get("/user/:id", userController.getUserById);
router.get("/users", userController.getUsers);
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

// Define routes for category operations
router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.createCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

export default router;