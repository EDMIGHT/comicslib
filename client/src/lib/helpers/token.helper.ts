import Cookies from 'js-cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export enum AuthCookie {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  EXP = 'exp',
}

export class TokenHelper {
  protected static getServerCookieStore(): ReadonlyRequestCookies {
    // ? Is there a better way to bypass the problem with receiving cookies in the axios interceptor?
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } = require('next/headers') as { cookies: () => ReadonlyRequestCookies };
    return cookies();
  }
  public static getServerAccessToken() {
    const cookieStore = this.getServerCookieStore();

    return cookieStore.get(AuthCookie.ACCESS)?.value;
  }
  public static getServerRefreshToken() {
    const cookieStore = this.getServerCookieStore();

    return cookieStore.get(AuthCookie.REFRESH)?.value;
  }
  public static getAccessToken() {
    const accessToken = Cookies.get(AuthCookie.ACCESS);
    return accessToken || null;
  }
  public static getRefreshToken() {
    const refreshToken = Cookies.get(AuthCookie.REFRESH);
    return refreshToken || null;
  }
}
