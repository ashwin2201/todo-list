import express from "express";
import * as TodosController from "../controllers/todos";

const router = express.Router();

router.get("/", TodosController.getTodos);
// router level function, although the function is defined in getTodos
router.get("/:todoId", TodosController.getTodo); // todoId is  a variable

router.post("/", TodosController.createTodos);

router.patch("/:todoId", TodosController.updateNote);

router.delete("/:todoId", TodosController.deleteNote);

export default router;
