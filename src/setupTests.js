// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// Establish MSW API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that a test may add
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());
