// triggers/newEmail.js
// Instant trigger — REST Hooks (subscribe/unsubscribe)
// ─────────────────────────────────────────────────────────────────────────────

const subscribeHook = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/webhooks',
    method: 'POST',
    body: {
      url:   bundle.targetUrl,
      inbox: bundle.inputData.inbox,
    },
  });
  return response.data;
};

const unsubscribeHook = async (z, bundle) => {
  const hookId = bundle.subscribeData.id;
  await z.request({
    url:    `https://api2.freecustom.email/v1/webhooks/${hookId}`,
    method: 'DELETE',
  });
  return { id: hookId };
};

// D006: REST Hooks MUST have a performList (polling fallback URL).
// Zapier uses this when testing the trigger in the editor before a real
// webhook fires. Returns recent messages from the inbox.
const getFallbackEmails = async (z, bundle) => {
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(bundle.inputData.inbox)}/messages`,
    method: 'GET',
  });
  const data = response.data.data || {};
  const inbox = data.inbox;
  const messages = (data.messages || []).map(m => ({
    id:                m.id,
    inbox:             inbox,
    from:              m.from,
    subject:           m.subject,
    date:              m.date,
    has_attachment:    m.has_attachment || false,
    otp:               m.otp,
    verification_link: m.verification_link,
  }));
  return messages;
};

const perform = (z, bundle) => {
  const payload = bundle.cleanedRequest;
  // REST Hook payload format from OpenAPI websocket spec
  const m = payload.message || {};
  return [{
    id:                m.id || payload.id, // fallback to top-level if needed
    inbox:             payload.inbox,
    from:              m.from || payload.from,
    subject:           m.subject || payload.subject,
    date:              m.date || payload.date,
    has_attachment:    m.has_attachment || payload.has_attachment || false,
    otp:               m.otp || payload.otp,
    verification_link: m.verification_link || payload.verification_link,
  }];
};

module.exports = {
  key:  'new_email',
  noun: 'Email',

  display: {
    label: 'New Email in Inbox',
    // D021: description must start with "Triggers when "
    description: 'Triggers when a new email arrives in a registered inbox. Delivers instantly via webhook push with no polling delay. Requires Startup plan or above.',
  },

  operation: {
    type: 'hook',

    // D028: set cleanInputData false for predictable input handling
    cleanInputData: false,

    inputFields: [
      {
        key:      'inbox',
        label:    'Inbox Address',
        type:     'string',
        required: true,
        helpText: 'The inbox to watch for new emails, e.g. `mytest@ditube.info`. Must be registered first via the **Register Inbox** action.',
      },
    ],

    performSubscribe:   subscribeHook,
    performUnsubscribe: unsubscribeHook,
    // D006: performList satisfies the "polling URL for REST Hook" requirement
    performList:        getFallbackEmails,
    perform:            perform,

    sample: {
      id:                'D3vt8NnEQ',
      inbox:             'mytest@ditube.info',
      from:              'no-reply@github.com',
      subject:           'Your GitHub verification code',
      date:              '2024-03-12T10:34:27.000Z',
      has_attachment:    false,
      otp:               '482910',
      verification_link: 'https://github.com/verify?code=482910',
    },

    outputFields: [
      { key: 'id',                label: 'Email ID' },
      { key: 'inbox',             label: 'Inbox Address' },
      { key: 'from',              label: 'From' },
      { key: 'subject',           label: 'Subject' },
      { key: 'date',              label: 'Date',             type: 'datetime' },
      { key: 'has_attachment',    label: 'Has Attachment',   type: 'boolean' },
      { key: 'otp',               label: 'OTP Code' },
      { key: 'verification_link', label: 'Verification Link' },
    ],
  },
};