import crypto from "crypto";
module.exports = class KeysService {
  async createSecretKey() {
    const secret_key = crypto.randomBytes(32).toString("hex");
    return secret_key;
  }
};
