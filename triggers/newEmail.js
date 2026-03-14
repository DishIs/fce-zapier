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
  return response.data.data || [];
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
    perform:            (z, bundle) => [bundle.cleanedRequest],

    sample: {
      id:               'D3vt8NnEQ',
      from:             'no-reply@github.com',
      to:               'mytest@ditube.info',
      subject:          'Your GitHub verification code',
      date:             '2024-03-12T10:34:27.000Z',
      text:             'Your verification code is 482910',
      html:             '<p>Your code is <strong>482910</strong></p>',
      otp:              '482910',
      verificationLink: 'https://github.com/verify?code=482910',
      hasAttachment:    false,
    },

    outputFields: [
      { key: 'id',               label: 'Email ID' },
      { key: 'from',             label: 'From' },
      { key: 'to',               label: 'To' },
      { key: 'subject',          label: 'Subject' },
      { key: 'date',             label: 'Date',             type: 'datetime' },
      { key: 'text',             label: 'Body (Plain Text)' },
      { key: 'html',             label: 'Body (HTML)' },
      { key: 'otp',              label: 'OTP Code' },
      { key: 'verificationLink', label: 'Verification Link' },
      { key: 'hasAttachment',    label: 'Has Attachment',   type: 'boolean' },
    ],
  },
};