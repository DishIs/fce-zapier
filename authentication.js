// authentication.js
// API Key authentication — passed as Authorization: Bearer header
// Test function calls GET /v1/me which returns 401 on invalid key
// ─────────────────────────────────────────────────────────────────────────────

const testAuth = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api2.freecustom.email/v1/me',
  });
  return response.data.data || response.data;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key:      'apiKey',
      label:    'API Key',
      type:     'password',
      required: true,
      helpText:
        'Your FreeCustom.Email API key. Find it at [www.freecustom.email/api/dashboard](https://www.freecustom.email/api/dashboard) → API Keys. Keys start with `fce_`.',
    },
  ],
  test: testAuth,
  connectionLabel: '{{plan_label}} plan · {{api_inbox_count}} inboxes',
};
