// Thrown when the http request goes wrong; contains the
// message and the status code.
export class PindoError extends Error {
  public statusCode: number;
  public message: string;
  public type: string;
  public stackTrace: string;

  constructor(
    statusCode: number,
    message: string,
    type: string,
    stackTrace: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
    this.stackTrace = stackTrace;
  }

  public toString(): string {
    return `PindoError: ${this.message}`;
  }
}

// Thrown when the response body cannot be cast as a [Map]
export class PindoCastingError extends Error {
  public message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }

  public toString(): string {
    return `PindoCastingError: ${this.message}`;
  }
}

// Thrown when the http response body does not contain what it should.
// Mostly happens when the endpoint for the expected data has been changed.
export class PindoUnexpectedResponseError extends Error {
  public expected: object;
  public received: object;

  constructor(expected: object, received: object) {
    super();
    this.expected = expected;
    this.received = received;
  }

  public toString(): string {
    return `PindoUnexpectedResponseError: expected: ${this.expected}, but received: ${this.received}`;
  }
}
