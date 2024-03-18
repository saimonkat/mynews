import AuthMiddleware from "./AuthMiddleware";
import NoauthMiddleware from "./NoauthMiddleware";
import { TMiddleware, TMiddlewares } from "./types";

const middlewares: Record<TMiddlewares, TMiddleware> = {
  noauth: NoauthMiddleware,
  auth: AuthMiddleware,
};

export { middlewares };