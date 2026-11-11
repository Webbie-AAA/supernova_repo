/**
 * @jest-environment jsdom
 */

// Tests for login/login.js: sending the login form to the server.
// We never talk to the real server here: fetch() is replaced with a fake.

const { runScript, flushPromises, fakeFetch, addFormShortcuts } = require("./helpers");

// The parts of login.html that login.js uses
const pageHTML = `
    <form id="login_form">
        <input type="email" name="email" id="user_email">
        <input type="password" name="password" id="user_password">
        <input name="submit" type="submit" value="Login">
    </form>
`;

let fakes;

// Load login.js with a fake fetch that replies with this status and body
function loadPage(status, body) {
    document.body.innerHTML = pageHTML;
    addFormShortcuts(document.querySelector("form"));
    fakes = {
        fetch: fakeFetch(status, body),
        localStorage: { setItem: jest.fn() },
        alert: jest.fn(),
        window: { location: { assign: jest.fn() } },
    };
    runScript("login/login.js", fakes);
}

// Fill in the form, press Login, and wait for the "server" to reply
async function logIn(email, password) {
    document.querySelector("#user_email").value = email;
    document.querySelector("#user_password").value = password;
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    document.querySelector("#login_form").dispatchEvent(submit);
    await flushPromises();
    return submit;
}


describe("Submitting the login form", () => {
    beforeEach(() => loadPage(200, { token: "abc123" }));

    test("stops the browser from reloading the page", async () => {
        const submit = await logIn("anna@school.com", "pass");
        expect(submit.defaultPrevented).toBe(true);
    });

    test("sends one request to the login endpoint", async () => {
        await logIn("anna@school.com", "pass");
        expect(fakes.fetch).toHaveBeenCalledTimes(1);
        expect(fakes.fetch.mock.calls[0][0]).toBe("http://localhost:3000/users/login");
    });

    test("uses POST with JSON headers", async () => {
        await logIn("anna@school.com", "pass");
        const options = fakes.fetch.mock.calls[0][1];
        expect(options.method).toBe("POST");
        expect(options.headers["Content-Type"]).toBe("application/json");
        expect(options.headers["Accept"]).toBe("application/json");
    });

    test("sends the email and password the student typed", async () => {
        await logIn("anna@school.com", "secret");
        const body = JSON.parse(fakes.fetch.mock.calls[0][1].body);
        expect(body).toEqual({ email: "anna@school.com", password: "secret" });
    });
});

describe("When the login is successful (status 200)", () => {
    beforeEach(async () => {
        loadPage(200, { token: "abc123" });
        await logIn("anna@school.com", "secret");
    });

    test("saves the token in localStorage", () => {
        expect(fakes.localStorage.setItem).toHaveBeenCalledWith("token", "abc123");
    });

    test("goes to the dashboard", () => {
        expect(fakes.window.location.assign).toHaveBeenCalledWith("../dashboard/dashboard.html");
    });

    test("does not show an error", () => {
        expect(fakes.alert).not.toHaveBeenCalled();
    });
});

describe("When the login fails (e.g. status 401)", () => {
    beforeEach(async () => {
        loadPage(401, { error: "Wrong email or password" });
        await logIn("anna@school.com", "wrong");
    });

    test("shows the error message from the server", () => {
        expect(fakes.alert).toHaveBeenCalledWith("Wrong email or password");
    });

    test("does not save a token", () => {
        expect(fakes.localStorage.setItem).not.toHaveBeenCalled();
    });

    test("stays on the login page", () => {
        expect(fakes.window.location.assign).not.toHaveBeenCalled();
    });
});
