import express from "express";
import { Request, Response } from "express-serve-static-core";
import router from "./apis";
import morgan from "morgan";
import cors from "cors";
import { signIn, signUp } from "./auth/authApis";
import { protect } from "./auth/authUtils";
import { body } from "express-validator";
import { inputValidator } from "./validator/inputValidator";
import { routeErrorHandler, syncErrorHandle } from "./handlers/errorHandler";

const customLogger = (message: string) => (req: any, res: any, next: any) => {
  console.log(`Hello from my logger ${message}`);
  next();
};

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(customLogger("hello from my logger"));

app.get("/", (req: Request, res: Response, next: any) => {
  res.json({ message: "hello" });
});

app.post(
  "/signup",
  body("username").isString(),
  body("password").isString(),
  inputValidator,
  signUp
);
app.post(
  "/signin",
  body("username").isString(),
  body("password").isString(),
  inputValidator,
  signIn
);

app.use("/api", protect, router);

app.use(routeErrorHandler);
export default app;
