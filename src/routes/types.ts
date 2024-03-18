import { TMiddlewares } from "@/middlewares/types";

export type TRoute = {
  middleware?: Array<TMiddlewares>;
};

export type TRoutes =
  | "/";