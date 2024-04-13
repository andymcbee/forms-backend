import request from "supertest";
import { app, server } from "../index"; // Make sure to import the server

describe("POST /api/v1/forms/submit-form", () => {
  it("should return a success message", async () => {
    // Example POST data
    const postData = {
      "form-name": "Form Name Here",
      data: {
        name: "Jim",
      },
    };

    // Making the POST request with the body data
    const response = await request(app)
      .post("/api/v1/forms/submit-form")
      .send(postData); // Using .send() to pass data

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Form submitted successfully.",
    });
  });

  it("should return an error", async () => {
    // Example POST data with missing body
    const postData = {};

    // Making the POST request with the body data
    const response = await request(app)
      .post("/api/v1/forms/submit-form")
      .send(postData); // Using .send() to pass data

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Validation error: Required at "form-name"; Required at "data"',
    });
  });

  afterAll(() => {
    server.close(); // Close the server after all tests
  });
});
