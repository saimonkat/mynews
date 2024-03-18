"use server";

import { TCookies } from "./types";
import { cookies } from "next/headers";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage.external";

const getCookies = (): TCookies => {
  let cookiesObj: TCookies = {};
  const cookiesList = requestAsyncStorage.getStore()?.mutableCookies.getAll();
  if (cookiesList) {
    for (const cookie of cookiesList) {
      cookiesObj[cookie.name] = cookie.value;
    }
  }
  return cookiesObj;
};

const getCookie = (key: string): string | undefined => {
  return requestAsyncStorage.getStore()?.mutableCookies.get(key)?.value ?? cookies().get(key)?.value;
};

const setCookie = (key: string, value: string): void => {
  requestAsyncStorage.getStore()?.mutableCookies.set(key, value);
};

const deleteCookie = (key: string): void => {
  requestAsyncStorage.getStore()?.mutableCookies.delete(key);
};

const hasCookie = (key: string): boolean => {
  return !!requestAsyncStorage.getStore()?.mutableCookies.get(key)?.value;
};

export {
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
  hasCookie,
};