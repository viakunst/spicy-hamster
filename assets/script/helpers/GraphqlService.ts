const ID_TOKEN = 'id_token';

export default class GraphqlService {
  static getIdToken(): string | null {
    return JSON.parse(localStorage.getItem(ID_TOKEN) ?? 'null');
  }

  static doStuff() {
    // Link everything to backend api functions. Here.
    // Specific queries are defined here. (if not implemented in backend)
  }
}
