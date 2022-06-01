const ID_TOKEN = 'id_token';
const ACCESS_TOKEN = 'access_token';

export default class OidcService {
  static saveIdToken(IdToken: string) {
    localStorage.setItem(ID_TOKEN, JSON.stringify(IdToken));
  }

  static getIdToken(): string | null {
    return JSON.parse(localStorage.getItem(ID_TOKEN) ?? 'null');
  }

  static saveAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  static getAccessToken(): string | null {
    return JSON.parse(localStorage.getItem(ACCESS_TOKEN) ?? 'null');
  }

  static clear() {
    localStorage.clear();
  }

  static throwOnMissingAuth(): never {
    throw new Error('Invalid authentication result');
  }
}
