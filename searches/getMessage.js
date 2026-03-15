// searches/getMessage.js
// D004: messageId field has a dynamic dropdown sourcing from list_messages
// D028: cleanInputData set to false
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const { inbox, messageId } = bundle.inputData;
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(inbox)}/messages/${encodeURIComponent(messageId)}`,
    method: 'GET',
  });
  const m = response.data.data || {};
  return [{
    id:                m.id,
    from:              m.from,
    to:                m.to,
    subject:           m.subject,
    date:              m.date,
    html:              m.html,
    text:              m.text,
    otp:               m.otp,
    verification_link: m.verification_link,
    has_attachment:    m.has_attachment || false,
    attachments:       m.attachments || [],
  }];
};

module.exports = {
  key:  'get_message',
  noun: 'Message',

  display: {
    label:       'Get a Message',
    description: 'Fetches the full content of a single email by ID, including HTML body and attachments.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'inbox',
        label:    'Inbox Address',
        type:     'string',
        required: true,
        helpText: 'The inbox containing the message.',
      },
      {
        key:      'messageId',
        label:    'Message ID',
        type:     'string',
        required: true,
        helpText: 'The ID of the message to retrieve.',
        // D004: dynamic dropdown — sources from internal trigger
        dynamic:  'list_messages_trigger.id.subject',
      },
    ],
    perform,
    sample: {
      id:               'D3vt8NnEQ',
      from:             'no-reply@github.com',
      to:               'mytest@ditube.info',
      subject:          'Your verification code',
      date:             '2024-03-12T10:34:27.000Z',
      text:             'Your code is 482910',
      html:             '<p>Your code is <strong>482910</strong></p>',
      otp:              '482910',
      verificationLink: null,
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