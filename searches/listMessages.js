// searches/listMessages.js
const perform = async (z, bundle) => {
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(bundle.inputData.inbox)}/messages`,
    method: 'GET',
  });
  const messages = (response.data.data || []).map(m => ({
    id:               m.message_id || m.id,
    from:             m.from,
    to:               m.inbox || m.to,
    subject:          m.subject,
    date:             m.received_at || m.date,
    otp:              m.otp,
    verificationLink: m.verification_link || m.verificationLink,
    hasAttachment:    m.has_attachment || m.hasAttachment || false,
  }));
  return {
    count:    messages.length,
    messages: messages,
  };
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
      count:    1,
      messages: [
        {
          id: 'D3vt8NnEQ', from: 'no-reply@github.com', to: 'mytest@ditube.info',
          subject: 'Your verification code', date: '2024-03-12T10:34:27.000Z',
          otp: '482910', verificationLink: null, hasAttachment: false,
        },
      ],
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