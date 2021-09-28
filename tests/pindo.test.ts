import fetchMock, { calls } from "fetch-mock";
import { expect, use } from "chai";
import { Pindo } from "../src/pindo";
import {
  PindoError,
  PindoCastingError,
  PindoUnexpectedResponseError,
} from "../src/pindo_errors";
// import fetchMock from "fetch-mock";
import { FetchError } from "node-fetch";

describe("PindoClient", () => {
  let pindo: Pindo;
  it("should create a new instance", () => {
    pindo = new Pindo();
    expect(pindo).to.be.an.instanceof(Pindo);
  });

  // PindoClient --> getToken
  describe("getToken", () => {
    const path = "users/token";
    const token = "hey-token-here";
    const username = "hey-username-here";
    const password = "hey-password-here";
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    beforeEach(() => {
      fetchMock.get(url, async () => {
        return {
          data: {
            token: token,
          },
          status: 200,
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.get", async () => {
      await pindo.getToken(username, password);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.getToken(username, password)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.getToken(username, password)).to.Throw(PindoCastingError);
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new Error();
        });
      });
      expect(pindo.getToken(username, password)).to.Throw(Error);
    });

    it("throws PindoUnexpectedResponseError when the token is not found in the response body", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return {
            requestOptions: reqOptions,
            data: { nottoken: "I am goddamnit" },
          };
        });
      });
      expect(pindo.getToken(username, password)).to.Throw(
        PindoUnexpectedResponseError
      );
    });
  });

  // PindoClient --> refreshToken
  describe("refreshToken", () => {
    const path = "users/refresh/token";
    const token = "hey-token-here";
    const username = "hey-username-here";
    const password = "hey-password-here";
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    beforeEach(() => {
      fetchMock.get(url, async () => {
        return {
          data: {
            token: token,
          },
          status: 200,
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.get", async () => {
      await pindo.refreshToken(username, password);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.refreshToken(username, password)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.refreshToken(username, password)).to.Throw(
        PindoCastingError
      );
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new Error();
        });
      });
      expect(pindo.refreshToken(username, password)).to.Throw(Error);
    });

    it("throws PindoUnexpectedResponseError when the token is not found in the response body", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return {
            requestOptions: reqOptions,
            data: { nottoken: "I am goddamit" },
          };
        });
      });
      expect(() => pindo.refreshToken(username, password)).to.Throw(
        PindoUnexpectedResponseError
      );
    });
  });

  // PindoClient --> register
  describe("register", () => {
    const path = "users/register";
    const profileURL = "https://pindo.io/awesome-tester";
    const username = "hey-username-here";
    const password = "hey-password-here";
    const email = "pindo@test.com";
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    beforeEach(() => {
      fetchMock.post(url, async () => {
        return {
          data: { self_url: profileURL },
          status: 200,
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.post", async () => {
      await pindo.register(username, password, email);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.register(username, password, email)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.post(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.register(username, password, email)).to.Throw(
        PindoCastingError
      );
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new Error();
        });
      });
      expect(pindo.register(username, password, email)).to.Throw(Error);
    });
  });

  // PindoClient --> balance
  describe("balance", () => {
    const token = "hey-token-here";
    const balance = "hey-balance-here";
    const path = "/wallets/self";
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    beforeEach(() => {
      fetchMock.get(url, async () => {
        headers["Authorization"] = `Bearer ${token}`;
        return {
          data: {
            amount: balance,
          },
          status: 200,
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.get", async () => {
      await pindo.balance(token);
      headers["Authorization"] = `Bearer ${token}`;
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.balance(token)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.balance(token)).to.Throw(PindoCastingError);
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new Error();
        });
      });
      expect(pindo.balance(token)).to.Throw(Error);
    });

    it("throws PindoUnexpectedResponseError when the token is not found in the response body", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return {
            requestOptions: reqOptions,
            data: { nottoken: "I am godddamit" },
          };
        });
      });
      expect(() => pindo.balance(token)).to.Throw(PindoUnexpectedResponseError);
    });
  });

  // PindoClient --> sendSMS
  describe("sendSMS", () => {
    const path = "v1/sms/";
    const token = "hey-token-here";
    const text = "hey-text-here";
    const from = "pindo.io";
    const to = "+250789636857";
    const balance = 0.19;
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    const payload = {
      to: to,
      from: from,
      text: text,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    beforeEach(() => {
      fetchMock.post(url, async () => {
        headers["Authorization"] = `Bearer ${token}`;
        return {
          status: 200,
          data: {
            remaining_blance: balance,
          },
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.post", async () => {
      await pindo.sendSMS(token, to, from, text);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.sendSMS(token, to, from, text)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.post(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.sendSMS(token, to, from, text)).to.Throw(PindoCastingError);
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new Error();
        });
      });
      expect(pindo.sendSMS(token, to, from, text)).to.Throw(Error);
    });

    it("throws PindoUnexpectedResponseError when the token is not found in the response body", () => {
      beforeEach(() => {
        fetchMock.post(url, async () => {
          return {
            requestOptions: reqOptions,
            data: { nottoken: "I am godddamit" },
          };
        });
      });
      expect(() => pindo.sendSMS(token, to, from, text)).to.Throw(
        PindoUnexpectedResponseError
      );
    });
  });

  // PindoClient --> Organization
  describe("Organization", () => {
    const token = "hey-token-here";
    const name = "pindo";
    const webHookURL = "https://pindo.io";
    const path = "/orgs/self";
    const retriesCount = 7;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };
    const payload = {
      name: name,
      webhook_url: webHookURL,
      sms_retries: retriesCount,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${pindo.baseUrl}${path}`;

    beforeEach(() => {
      fetchMock.get(url, async () => {
        headers["Authorization"] = `Bearer ${token}`;
        return {
          status: 200,
          data: {
            self_url: "https://pindo.io",
          },
          requestOptions: reqOptions,
        };
      });
    });
    it("calls fetchMock.get", async () => {
      await pindo.organization(token, name, webHookURL, retriesCount);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(
        pindo.organization(token, name, webHookURL, retriesCount)
      ).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(
        pindo.organization(token, name, webHookURL, retriesCount)
      ).to.Throw(PindoCastingError);
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.get(url, () => {
          throw new Error();
        });
      });
      expect(
        pindo.organization(token, name, webHookURL, retriesCount)
      ).to.Throw(Error);
    });

    it("throws PindoUnexpectedResponseError when the self_url is not found in the response body", () => {
      beforeEach(() => {
        fetchMock.get(url, async () => {
          return {
            requestOptions: reqOptions,
            data: { not_self_url: "I am godddamit" },
          };
        });
      });
      expect(() =>
        pindo.organization(token, name, webHookURL, retriesCount)
      ).to.Throw(PindoUnexpectedResponseError);
    });
  });

  // PindoClient --> forgotPassword
  describe("forgotPassword", () => {
    const path = "/users/forgot";
    const email = "test@pindo.io";
    const url = `${pindo.baseUrl}${path}`;
    const reqOptions = {
      path: path,
      baseUrl: pindo.baseUrl,
    };

    beforeEach(() => {
      fetchMock.post(url, async () => {
        return {
          data: {
            message:
              "Password reset instructions have been sent to your email.",
          },
          status: 200,
          requestOptions: reqOptions,
        };
      });
    });

    it("calls fetchMock.post", async () => {
      await pindo.forgotPassword(email);
      expect(calls.length).to.equal(1);
    });

    it("throws a PindoError when a fetchMockError is thrown", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new PindoError(404, "Sorry bro", "error", "oops");
        });
      });
      expect(pindo.forgotPassword(email)).to.Throw(PindoError);
    });

    it("throws a PindoCastingError when a non-object is returned", () => {
      beforeEach(() => {
        fetchMock.post(url, async () => {
          return { data: [], status: 200, requestOptions: reqOptions };
        });
      });
      expect(pindo.forgotPassword(email)).to.Throw(PindoCastingError);
    });

    it("rethrows an Exception when it's none of the above", () => {
      beforeEach(() => {
        fetchMock.post(url, () => {
          throw new Error();
        });
      });
      expect(pindo.forgotPassword(email)).to.Throw(Error);
    });
  });
});
