export type TMiddlewares = "noauth" | "auth";

export type TMiddlewareResponse = {
  status: boolean;
  redirect?: string;
  rewrite?: boolean;
};

export type TMiddleware = () => Promise<TMiddlewareResponse>;