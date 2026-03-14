// creates/registerInbox.js
const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/inboxes',
    method: 'POST',
    body: { inbox: bundle.inputData.inbox },
  });
  return response.data;
};

module.exports = {
  key:  'register_inbox',
  noun: 'Inbox',
  display: {
    label:       'Register Inbox',
    description: 'Registers a new disposable inbox under your API account so it can receive emails.',
  },
  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key: 'inbox', label: 'Inbox Address', type: 'string', required: true,
        helpText: 'Full email address to register, e.g. `mytest@ditube.info`.',
      },
    ],
    perform,
    sample: { success: true, message: 'Inbox registered.', inbox: 'mytest@ditube.info' },
  },
};