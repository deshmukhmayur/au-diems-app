export class User {
  constructor(
    private username: String,
    private token: String,
    private uType: String
  ) {}

  get getUsername(): String {
    return this.username;
  }

  get getToken(): String {
    return this.token;
  }

  get getType(): String {
    return this.uType;
  }

  public set setToken(newToken: String) {
    this.token = newToken;
  }
}
