export type TCookies = {
  [key: string]: string;
};

declare global {
  var cookies: TCookies;
}