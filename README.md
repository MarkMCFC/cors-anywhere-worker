# CORS Anywhere Proxy Worker

Simple CORS proxy deployed on Cloudflare Workers.

## One‑Click Deploy

Click the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/smokindope/my-proxy1)

---

## Usage

### Path Style

https://your-worker.workers.dev/https://example.com

### Query Param Style

https://your-worker.workers.dev/?url=https://example.com

---

## Features

- Full CORS support
- Handles OPTIONS preflight
- Streams requests/responses
- Supports all HTTP methods
- Cloudflare edge deployment
- No server required

---

## Security

This worker blocks localhost targets by default.

Recommended additions:

- API keys
- Rate limiting
- Host allowlists
- Logging
- Abuse protection