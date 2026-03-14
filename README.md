# FreeCustom.Email Zapier Integration

The official Zapier integration for [FreeCustom.Email](https://www.freecustom.email), allowing you to automate disposable email inboxes with real-time delivery and automatic OTP extraction.

## Features

- **Instant Triggers**: Receive emails instantly via REST Hooks.
- **OTP Extraction**: Automatically extracts One-Time Passwords (OTPs) and verification links.
- **Inbox Management**: Register and unregister custom inboxes on the fly.
- **Account Info**: Monitor credits, usage, and plan details directly from Zapier.

## Available Actions

### Triggers
- **New Email in Inbox**: Fires instantly when a new email arrives in a registered inbox. (Requires Startup plan or above).

### Searches
- **List Registered Inboxes**: Returns all inboxes currently registered under your account.
- **List Inbox Messages**: Fetches all messages for a specific inbox.
- **Get a Message**: Retrieves full content of a single email (HTML/Text/Attachments).
- **List Available Domains**: Returns domains available for creating inboxes.
- **Get Account Info**: Monitor your plan, credits, and inbox limits.
- **Get Usage Stats**: View requests used and remaining quota.

### Creates
- **Register Inbox**: Create a new disposable inbox.
- **Unregister Inbox**: Remove an existing inbox.
- **Get Latest OTP**: Quickly retrieve the most recent OTP from an inbox.
- **Delete a Message**: Permanently remove an email.

## Setup & Installation

### Prerequisites
- [Node.js v22+](https://nodejs.org/)
- [Zapier Platform CLI](https://zapier.com/engineering/zapier-platform-cli/) (`npm install -g zapier-platform-cli`)
- A [FreeCustom.Email](https://freecustom.email) account and API Key.

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DishIs/fce-zapier.git
   cd fce-zapier
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env` and fill in your `API_KEY`.
   ```bash
   cp .env.example .env
   ```

4. **Validate the integration**:
   ```bash
   zapier-platform validate
   ```

5. **Run tests**:
   ```bash
   zapier-platform test
   ```

## Deployment

To push a new version to Zapier:

1. **Prune dev dependencies** (recommended on macOS to avoid file limit errors):
   ```bash
   npm prune --production
   ```

2. **Push to Zapier**:
   ```bash
   zapier-platform push
   ```

3. **Restore dev dependencies**:
   ```bash
   npm install
   ```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For issues or feature requests, visit the [FreeCustom.Email Dashboard](https://freecustom.email/dashboard) or contact support.
