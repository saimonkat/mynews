import { isAuth } from "@/facades/Auth/AuthFacade.server";
import { TMiddlewareResponse } from "./types";

const handle = async (): Promise<TMiddlewareResponse> => {
  if (!isAuth()) return { status: true };
  return { status: false };
};

export default handle;