/**
 * @jest-environment jsdom
 */

// Tests for register/register.js: sending the sign up form to the server.
// We never talk to the real server here: fetch() is replaced with a fake.

const { runScript, flushPromises, fakeFetch, addFormShortcuts } = require("./helpers");

// The parts of register.html that register.js uses
// (note: the real page has name="confirm password" with a space)
const pageHTML = `
    <form id="register_form">
        <input type="text" name="first_name" id="first_name">
        <input type="text" name="last_name" id="last_name">
        <input type="email" name="email" id="email">
        <input type="password" name="password" id="password">
        <input type="password" name="confirm password" id="confirm_password">
        <button name="submit" type="submit">Register</button>
    </form>
`;

let fakes;

function loadPage(status, body) {
    document.body.innerHTML = pageHTML;
    addFormShortcuts(document.querySelector("form"));
    fakes = {
        fetch: fakeFetch(status, body),
        window: { location: { assign: jest.fn() } },
    };
    runScript("register/register.js", fakes);
}

const student = {
    first_name: "Anna",
    last_name: "Smith",
    email: "anna@school.com",
    password: "secret1",
    confirm_password: "secret1",
};

// Fill in the form, press Register, and wait for the "server" to reply
async function register(details) {
    for (const [id, value] of Object.entries(details)) {
        document.getElementById(id).value = value;
    }
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    document.querySelector("#register_form").dispatchEvent(submit);
    await flushPromises();
    return submit;
}

// Hide the console.log messages register.js prints, to keep test output tidy
beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
    jest.restoreAllMocks();
});


describe("Submitting the sign up form", () => {
    beforeEach(() => loadPage(201, { message: "Registration successful" }));

    test("stops the browser from reloading the page", async () => {
        const submit = await register(student);
        expect(submit.defaultPrevented).toBe(true);
    });

    test("sends one request to the register endpoint", async () => {
        await register(student);
        expect(fakes.fetch).toHaveBeenCalledTimes(1);
        expect(fakes.fetch.mock.calls[0][0]).toBe("http://localhost:3000/users/register");
    });

    test("uses POST with JSON headers", async () => {
        await register(student);
        const options = fakes.fetch.mock.calls[0][1];
        expect(options.method).toBe("POST");
        expect(options.headers["Content-Type"]).toBe("application/json");
    });

    test("sends the student's name, email and password", async () => {
        await register(student);
        const body = JSON.parse(fakes.fetch.mock.calls[0][1].body);
        expect(body).toEqual({
            first_name: "Anna",
            last_name: "Smith",
            email: "anna@school.com",
            password: "secret1",
        });
    });

    test("does not send the confirm password to the server", async () => {
        await register(student);
        const body = JSON.parse(fakes.fetch.mock.calls[0][1].body);
        expect(body).not.toHaveProperty("confirm_password");
    });
});

describe("When registration is successful (status 201)", () => {
    test("goes to the login page", async () => {
        loadPage(201, { message: "Registration successful" });
        await register(student);
        expect(fakes.window.location.assign).toHaveBeenCalledWith("../login/login.html");
    });
});

describe("When registration fails (e.g. status 400)", () => {
    test("stays on the sign up page", async () => {
        loadPage(400, { error: "Email already used" });
        await register(student);
        expect(fakes.window.location.assign).not.toHaveBeenCalled();
    });

    test("logs an error", async () => {
        loadPage(400, { error: "Email already used" });
        await register(student);
        expect(console.log).toHaveBeenCalledWith("error");
    });
});

// These describe how the page SHOULD behave but doesn't yet.
// test.failing means "we expect this to fail right now".
// When someone fixes the bug, Jest will flag it - then change test.failing to test.
describe("Known gaps (not built yet)", () => {
    test.failing("does not send anything if the two passwords don't match", async () => {
        loadPage(201, { message: "Registration successful" });
        await register({ ...student, confirm_password: "different" });
        expect(fakes.fetch).not.toHaveBeenCalled();
    });
});
