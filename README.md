# Node API Experiment

Express and Supabase learning sandbox with a users API and a small browser client.

<p dir="rtl">پروژه آزمایشی Node.js و Supabase برای تمرین API کاربران.</p>

[Deployment link](https://node-test-pr.vercel.app) · [Source](https://github.com/Erfan-Ebrahimi/nodeTest-pr)

## Stack

Node.js · Express · Supabase · JavaScript

## What's inside

- Users API handler under `api/`
- Small browser client under `public/`
- Supabase client dependency

## Local setup

Install the dependencies with `npm ci`. Review `api/users.js` and supply your own Supabase configuration for the host that will run the handler. The repository currently has no complete local startup command.

## Project layout

- `api/users.js` — users API handler
- `public/` — browser client
- `index.js` — commented local server experiment
- `package.json` — dependencies

## Project notes

An experimental repository. The root `index.js` is currently commented out, and there is no working test script or local start script in `package.json`. The declared `test` command exits with an error by design. Configure the Supabase connection for the API handler before attempting a deployment.

---

[Erfan Ebrahimi](https://github.com/Erfan-Ebrahimi)
