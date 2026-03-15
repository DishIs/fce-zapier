// searches/listMessages.js
const perform = async (z, bundle) => {
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

module.exports = {
  key:  'list_messages',
  noun: 'Message',
  display: {
    label:       'List Inbox Messages',
    description: 'Returns all messages in a registered inbox. Use with a Schedule trigger for polling-style automations.',
  },
  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key: 'inbox', label: 'Inbox Address', type: 'string', required: true,
        helpText: 'The inbox to fetch messages from, e.g. `mytest@ditube.info`.',
      },
    ],
    perform,
    sample: {
      id: 'D3vt8NnEQ', from: 'no-reply@github.com', to: 'mytest@ditube.info',
      subject: 'Your verification code', date: '2024-03-12T10:34:27.000Z',
      otp: '482910', verificationLink: null, hasAttachment: false,
    },
    outputFields: [
      { key: 'id',               label: 'Email ID' },
      { key: 'from',             label: 'From' },
      { key: 'to',               label: 'To' },
      { key: 'subject',          label: 'Subject' },
      { key: 'date',             label: 'Date', type: 'datetime' },
      { key: 'otp',              label: 'OTP Code' },
      { key: 'verificationLink', label: 'Verification Link' },
      { key: 'hasAttachment',    label: 'Has Attachment', type: 'boolean' },
    ],
  },
};