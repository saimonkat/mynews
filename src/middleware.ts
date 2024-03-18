import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { TRoutes } from "./routes/types";
import { routes } from "./routes";
import { middlewares } from "./middlewares";
import { getCookies } from "./facades/Cookie/CookieFacade.server";

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next();
  const route = routes[request.nextUrl.pathname as TRoutes];
  if (!route || !route.middleware) return NextResponse.next();

  for (const middleware of route.middleware) {
    const { redirect } = await middlewares[middleware]();
    if (redirect) {
      response = NextResponse.redirect(new URL(redirect, request.url));
    }
  }
  const cookies = getCookies();
  for (const key in cookies) response.cookies.set(key, cookies[key]);
  applySetCookie(request, response);
  return response;
};

const applySetCookie = (request: NextRequest, response: NextResponse): void => {
  const setCookies = new ResponseCookies(response.headers);
  const newReqHeaders = new Headers(request.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === "x-middleware-override-headers" ||
      key.startsWith("x-middleware-request-")
    ) {
      response.headers.set(key, value);
    }
  });
};

export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)"],
};