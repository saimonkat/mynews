"use client";

import {
  getCookies as getCookiesDefault,
  getCookie as getCookieDefault,
  setCookie as setCookieDefault,
  deleteCookie as deleteCookieDefault,
  hasCookie as hasCookieDefault,
} from "cookies-next";
import { TCookies } from "./types";

const getCookies = (): TCookies => {
  return getCookiesDefault() as TCookies;
};

const getCookie = (key: string): string | undefined => {
  return getCookieDefault(key);
};

const setCookie = (key: string, value: string): void => {
  setCookieDefault(key, value);
};

const deleteCookie = (key: string): void => {
  deleteCookieDefault(key);
};

const hasCookie = (key: string): boolean => {
  return hasCookieDefault(key);
};

export { getCookies, getCookie, setCookie, deleteCookie, hasCookie };