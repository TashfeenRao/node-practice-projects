import { Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { inputValidator } from "./validator/inputValidator";
import { getCurrentUser, getUser, getUsers } from "./handlers/userHandlers";
import {
  productCreate,
  productDelete,
  productGet,
  productList,
  productPut,
} from "./handlers/productHandler";
import {
  updateCreate,
  updateDelete,
  updateGet,
  updateList,
  updatePut,
} from "./handlers/updateHandler";
import { routeErrorHandler, syncErrorHandle } from "./handlers/errorHandler";

const router = Router();

// user

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.get("/me", getCurrentUser);

// product

router.get("/product", productList);
router.get("/product/:id", productGet);
router.post(
  "/product/",
  body("name").isString(),
  inputValidator,
  productCreate
);
router.put("/product/:id", body("name").isString(), inputValidator, productPut);
router.delete("/product/:id", productDelete);

// Update

router.get("/update", updateList);
router.get("/update/:id", updateGet);
router.post(
  "/update/",
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED", "DONE"]),
  body("version").isString().optional(),
  body("asset").isString().optional(),
  body("productId").isString(),
  inputValidator,
  updateCreate
);
router.put(
  "/update/:id",
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED", "DONE"]),
  body("version").isString().optional(),
  body("asset").isString().optional(),
  body("productId").isString().optional(),
  inputValidator,
  updatePut
);
router.delete("/update/:id", updateDelete);

// Update Point

router.get("/updatePoint", (req, res) => {});
router.get("/updatePoint/:id", (req, res) => {});
router.post("/updatePoint/", (req, res) => {});
router.put("/updatePoint/:id", (req, res) => {});
router.delete("/updatePoint/:id", (req, res) => {});

router.use(routeErrorHandler);

export default router;
