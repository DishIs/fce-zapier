// triggers/listMessagesTrigger.js
// Hidden trigger used to power dynamic dropdowns for message selection
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(bundle.inputData.inbox)}/messages`,
    method: 'GET',
  });
  // Zapier triggers expect an array of objects
  return response.data.data || [];
};

module.exports = {
  key:  'list_messages_trigger',
  noun: 'Message',

  display: {
    label:       'List Messages (Internal)',
    description: 'Internal trigger for dynamic dropdowns.',
    hidden:      true,
  },

  operation: {
    type: 'polling',
    // D028: set cleanInputData false
    cleanInputData: false,
    inputFields: [
      {
        key:      'inbox',
        label:    'Inbox Address',
        type:     'string',
        required: true,
      },
    ],
    perform,
    sample: {
      id:      'D3vt8NnEQ',
      subject: 'Your verification code',
    },
  },
};
