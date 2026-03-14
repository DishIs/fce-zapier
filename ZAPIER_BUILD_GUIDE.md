# FreeCustom.Email — Zapier App Complete Build & Publish Guide
# Using Zapier Platform CLI v18.x (latest as of 2026)
# Binary: zapier-platform (old "zapier" binary still works but deprecated)
# Node requirement: v22
# ─────────────────────────────────────────────────────────────────────────────

══════════════════════════════════════════════════════════════
STEP 1 — ENVIRONMENT SETUP
══════════════════════════════════════════════════════════════

# Install Node 22 if not already installed
nvm install 22
nvm use 22
node --version   # must show v22.x.x

# Install Zapier CLI globally
npm install -g zapier-platform-cli

# Verify install
zapier-platform --version   # should show 18.x.x

# Login — if you use Google/GitHub SSO on Zapier, use --sso flag
zapier-platform login
# OR for SSO users:
# 1. Go to https://developer.zapier.com/partner-settings/deploy-keys/
# 2. Create a deploy key
# 3. Run: zapier-platform login --sso
# Zapier writes your deploy key to ~/.zapierrc — keep this safe

══════════════════════════════════════════════════════════════
STEP 2 — PROJECT SETUP
══════════════════════════════════════════════════════════════

# Copy all the generated files into a new folder
mkdir freecustom-email-zapier
cd freecustom-email-zapier

# Copy these files/folders from the output:
#   index.js
#   authentication.js
#   package.json
#   .env.example
#   .gitignore
#   triggers/newEmail.js
#   creates/registerInbox.js
#   creates/unregisterInbox.js
#   creates/getOtp.js
#   creates/deleteMessage.js
#   searches/listInboxes.js
#   searches/listMessages.js
#   searches/getMessage.js
#   searches/listDomains.js
#   searches/getAccountInfo.js
#   searches/getUsage.js
#   test/authentication.test.js
#   test/triggers/newEmail.test.js

# Install dependencies
npm install

# Set up your .env for local testing
cp .env.example .env
# Edit .env and fill in:
#   API_KEY=fce_your_real_api_key
#   TEST_INBOX=test@ditube.info

══════════════════════════════════════════════════════════════
STEP 3 — VALIDATE LOCALLY
══════════════════════════════════════════════════════════════

# Check your app structure is valid
zapier-platform validate

# You should see:
#   ✔ Running integration checks ... N checks passed
#   Integration checks passed, no issues found.

# If any errors appear, fix them before continuing.
# Common issues:
#   - Missing `sample` on a trigger/search/create
#   - Missing `key` field
#   - trigger `perform` must return an array

══════════════════════════════════════════════════════════════
STEP 4 — RUN TESTS
══════════════════════════════════════════════════════════════

# Run all tests (reads from .env automatically)
zapier-platform test

# Expected output:
#   PASS test/authentication.test.js
#   PASS test/triggers/newEmail.test.js
#   Tests: N passed

# If authentication test fails:
#   - Double-check your API_KEY in .env
#   - Make sure the key is active in your dashboard

══════════════════════════════════════════════════════════════
STEP 5 — REGISTER YOUR APP ON ZAPIER
══════════════════════════════════════════════════════════════

# This creates the app entry on Zapier — only run ONCE ever
zapier-platform register "FreeCustom.Email"

# Zapier will ask a few questions:
#   - Description: "Disposable email inboxes with OTP extraction and real-time delivery"
#   - Homepage URL: https://freecustom.email
#   - Intended audience: Public

# After registration you'll see your App ID.
# A .zapierapprc file is created in your project folder — commit this to git
# so your team can deploy to the same app.

# List your apps to confirm
zapier-platform integrations

══════════════════════════════════════════════════════════════
STEP 6 — PUSH (deploy) TO ZAPIER
══════════════════════════════════════════════════════════════

zapier-platform push

# Expected output:
#   ✔ Copying project to temp directory
#   ✔ Installing project dependencies
#   ✔ Applying entry point file
#   ✔ Building app definition.json
#   ✔ Validating project schema and style
#   ✔ Zipping project and dependencies
#   ✔ Testing build
#   ✔ Cleaning up temp directory
#   ✔ Uploading version 1.0.0
#   Push complete!

# Your integration is now live but PRIVATE (only visible to you).

══════════════════════════════════════════════════════════════
STEP 7 — TEST IN ZAP EDITOR
══════════════════════════════════════════════════════════════

1. Go to https://zapier.com/app/editor
2. Create a new Zap
3. Search for "FreeCustom.Email" in the app picker
4. Connect your account — paste your API key
   → Connection should validate and show "Developer plan · 3 inboxes"
5. Test each trigger/action manually

Key things to verify:
  - "New Email in Inbox" trigger — activate it, send email, confirm it fires
  - "Get Latest OTP" — only works on Growth plan
  - "Register Inbox" → should show inbox registered
  - Error handling — try an unregistered inbox, confirm error is readable

══════════════════════════════════════════════════════════════
STEP 8 — CHECK LOGS
══════════════════════════════════════════════════════════════

# View HTTP logs (useful for debugging)
zapier-platform logs --type http

# View console logs
zapier-platform logs --type console

# View errors only
zapier-platform logs --type http --status error

══════════════════════════════════════════════════════════════
STEP 9 — INVITE BETA TESTERS (optional before publishing)
══════════════════════════════════════════════════════════════

# Share private version with specific users for testing
zapier-platform users:add tester@example.com 1.0.0

# They'll get an email invite to try your integration
# This is how you gather real feedback before public launch

══════════════════════════════════════════════════════════════
STEP 10 — MAKING CHANGES
══════════════════════════════════════════════════════════════

# After any code change, bump version in package.json then push:
# e.g. 1.0.0 → 1.0.1 for patch, 1.1.0 for new features

# Edit package.json version, then:
zapier-platform push

# To promote a new version to be the default for existing users:
zapier-platform promote 1.0.1

# To migrate existing users from old version to new:
zapier-platform migrate 1.0.0 1.0.1

══════════════════════════════════════════════════════════════
STEP 11 — SUBMIT FOR PUBLIC LISTING (Zapier App Directory)
══════════════════════════════════════════════════════════════

Go to: https://developer.zapier.com
Select your integration → click "Submit for Review"

Requirements Zapier checks before approving:
  ✓ At least 1 trigger AND 1 action (you have both)
  ✓ All actions have samples defined
  ✓ Authentication validated with real credentials
  ✓ REST hooks have working subscribe/unsubscribe
  ✓ Error messages are human-readable (your afterResponse hook handles this)
  ✓ App icon uploaded (square PNG, min 256x256, transparent background)
  ✓ Description under 140 characters
  ✓ At least 1 user with an active Zap using the integration
     (Zapier requires 10+ active Zaps before full public listing)

HOW TO GET 10 ACTIVE ZAPS:
  - Invite real beta users: zapier-platform users:add email@example.com 1.0.0
  - Each user creates at least one active Zap
  - 10 active Zaps needed for the "Pending" → "Public" promotion

══════════════════════════════════════════════════════════════
FULL FILE STRUCTURE REFERENCE
══════════════════════════════════════════════════════════════

freecustom-email-zapier/
├── index.js                      ← app entry point, wires everything together
├── authentication.js             ← API key auth + test call
├── package.json
├── .env                          ← local only, never commit
├── .env.example                  ← commit this
├── .gitignore
├── .zapierapprc                  ← commit this (your app ID)
├── triggers/
│   └── newEmail.js               ← REST Hooks instant trigger
├── creates/
│   ├── registerInbox.js          ← POST /v1/inboxes
│   ├── unregisterInbox.js        ← DELETE /v1/inboxes/:inbox
│   ├── getOtp.js                 ← GET /v1/inboxes/:inbox/otp
│   └── deleteMessage.js          ← DELETE /v1/inboxes/:inbox/messages/:id
├── searches/
│   ├── listInboxes.js            ← GET /v1/inboxes
│   ├── listMessages.js           ← GET /v1/inboxes/:inbox/messages
│   ├── getMessage.js             ← GET /v1/inboxes/:inbox/messages/:id
│   ├── listDomains.js            ← GET /v1/domains
│   ├── getAccountInfo.js         ← GET /v1/me
│   └── getUsage.js               ← GET /v1/usage
└── test/
    ├── authentication.test.js
    └── triggers/
        └── newEmail.test.js

══════════════════════════════════════════════════════════════
ZAPIER vs MAKE — KEY DIFFERENCES
══════════════════════════════════════════════════════════════

| Thing              | Make                    | Zapier CLI               |
|--------------------|-------------------------|--------------------------|
| Language           | JSON config in browser  | JavaScript / Node.js     |
| REST Hooks         | attach/detach in JSON   | performSubscribe/Unsubscribe functions |
| Error handling     | response.error in JSON  | afterResponse hook in JS |
| Auth               | Connection component    | authentication.js        |
| Deployment         | Click Publish           | zapier-platform push     |
| Review requirement | Test scenario URLs      | 10 active Zaps           |
| Binary             | N/A                     | zapier-platform (v18+)   |

══════════════════════════════════════════════════════════════
TROUBLESHOOTING
══════════════════════════════════════════════════════════════

ERROR: "App validation failed"
→ Run: zapier-platform validate
→ Usually missing `sample` on a module or wrong return type

ERROR: "perform must return an array"
→ Triggers and searches must always return arrays
→ Wrap single objects: return [data]

ERROR: "Authentication failed"
→ Check .env has correct API_KEY
→ Check the key is active at freecustom.email/dashboard

ERROR: REST Hook subscribe fails
→ Your POST /v1/webhooks must return { id: "..." }
→ Zapier stores this id and passes it to unsubscribe as bundle.subscribeData.id

ERROR: "Cannot find module"
→ All files in creates/searches/triggers must be required in index.js
→ Check paths match exactly

REST HOOKS NOT FIRING:
→ Make sure notifyWebhooks() is called in server.ts pub/sub handler
→ Check MongoDB webhooks collection has the entry
→ Check the URL stored is the correct Zapier hook URL
