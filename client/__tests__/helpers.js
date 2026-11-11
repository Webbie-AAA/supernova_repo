// Shared helpers for the client tests.
// (package.json tells Jest NOT to treat this file as a test.)

const fs = require("fs");
const path = require("path");

// Runs one of our browser scripts (e.g. "game/game.js") inside the test.
//
// Why not just require() it? Because our scripts use things that jsdom
// either can't do or won't let us fake, like window.location.href = "..."
// (jsdom doesn't do real page navigation).
//
// So we read the file as text and run it as a function, passing in our own
// fake versions of "window", "fetch", "localStorage" and so on.
//
//   fakes   - names the script uses, and what they should be in the test
//   exports - names from inside the script we want back (e.g. "questions")
function runScript(file, fakes = {}, exports = []) {
    const code = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
    const names = Object.keys(fakes);
    const values = Object.values(fakes);
    const returnLine = `\nreturn { ${exports.join(", ")} };`;
    const run = new Function(...names, code + returnLine);
    return run(...values);
}

// Waits for any pending promises (fetch, response.json()) to finish
function flushPromises() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

// Builds a pretend fetch() that always replies with this status and body
function fakeFetch(status, body) {
    return jest.fn().mockResolvedValue({
        status: status,
        json: jest.fn().mockResolvedValue(body),
    });
}

// Real browsers let you write form.email to get the input with
// name="email" or id="email". jsdom (the pretend browser Jest uses) doesn't,
// so we add that shortcut to the form ourselves for each input.
function addFormShortcuts(form) {
    for (const input of form.elements) {
        for (const key of [input.id, input.name]) {
            if (key && !(key in form)) {
                Object.defineProperty(form, key, { get: () => form.elements.namedItem(key) });
            }
        }
    }
}

module.exports = { runScript, flushPromises, fakeFetch, addFormShortcuts };
