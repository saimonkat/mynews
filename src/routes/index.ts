import { TRoute, TRoutes } from "./types";

const routes: Record<TRoutes, TRoute> = {
  "/": {
    middleware: ["noauth"],
  }
};

export { routes };