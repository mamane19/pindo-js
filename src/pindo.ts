import { expect } from "chai";
import fetch from "node-fetch";
import {
  PindoError,
  PindoCastingError,
  PindoUnexpectedResponseError,
} from "./pindo_errors";

// A Dart API client for pindo.io. Check www.pindo.io for more info.
export class Pindo {
  baseUrl!: "https://api.pindo.io";

  async getToken(username: string, password: string): Promise<string> {
    const url = `${this.baseUrl}/users/token`;
    const auth = `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`;
    let data: any;
    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      });
      data = response.body as object;
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    if (data.hasOwnProperty("token")) {
      const token: string = data.token; //TODO: check if token is valid and return it.
      return token;
    }
    throw new PindoUnexpectedResponseError(
      { expected: "token" },
      { received: data }
    );
  }

  // Refresh the user's token
  // returns the newly generated token
  async refreshToken(username: string, password: string): Promise<string> {
    const url = `${this.baseUrl}/user/refresh/token`;
    const auth = `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`;
    let data: any;
    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      });
      data = response.body as object;
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    if (data.hasOwnProperty("token")) {
      return data.token; //TODO: check if token is valid and return it.
    }
    throw new PindoUnexpectedResponseError(
      { expected: "token" },
      { received: data }
    );
  }

  // Creates a new Pindo account
  // Returns the url to the user's profile.
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    const url = `${this.baseUrl}/users/register`;
    const payload = {
      username,
      email,
      password,
    };
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    throw new PindoCastingError("Oops... Something is wrong...!");
  }

  // Checks the user's balance
  async balance(token: string): Promise<number> {
    const url = `${this.baseUrl}/wallets/self`;
    const auth = `Bearer ${token}`;
    var data: any = {};
    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      });
      data = response.body as object;
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    if (data.hasOwnProperty("amount")) {
      return data.amount; //TODO: check if token is valid and return it.
    }
    throw new PindoUnexpectedResponseError(
      { expected: "amount" },
      { received: data }
    );
  }

  // Sends an SMS to a single user
  // retutns the remaining balance after the sms is sent
  async sendSMS(
    token: string,
    to: string,
    from: string,
    text: string
  ): Promise<number> {
    const url = `${this.baseUrl}/v1/sms/`;
    const auth = `Bearer ${token}`;
    const payload = {
      to: to,
      text: text,
      sender: from,
    };
    let data: object;
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: auth,
        },
      });
      data = response.body as object;
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    throw new PindoCastingError("Oops... Something is wrong...!");
  }

  // Update organization settings.
  // Returns the organization's new url.
  async organization(
    token: string,
    name: string,
    webHookURL: string,
    retriesCount: number
  ): Promise<string> {
    const url = `${this.baseUrl}/orgs/self`;
    const auth = `Bearer ${token}`;
    const payload = {
      name: name,
      webhook_url: webHookURL,
      sms_retries: retriesCount,
    };
    var data: any = {};
    let response;
    try {
      response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Authorization: auth,
        },
      });
      data = response.body! as object;
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    if (data.hasOwnProperty("self_url")) {
      return data.self_url; //TODO: check if token is valid and return it.
    }
    throw new PindoUnexpectedResponseError(
      { expected: "self_url" },
      { received: data }
    );
  }

  // Sends the user an email to reset their password.
  async forgotPassword(email: string): Promise<void> {
    const url = `${this.baseUrl}/users/forgot`;
    const payload = {
      email: email,
    };
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (e: any) {
      throw new PindoError(e.statusCode, e.message, e.type, e.stackTrace);
    }
    throw new PindoCastingError("Oops... Something is wrong...!");
  }
}
