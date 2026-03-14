// creates/unregisterInbox.js
const perform = async (z, bundle) => {
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(bundle.inputData.inbox)}`,
    method: 'DELETE',
  });
  return response.data;
};

module.exports = {
  key:  'unregister_inbox',
  noun: 'Inbox',
  display: {
    label:       'Unregister Inbox',
    description: 'Removes a registered inbox from your API account.',
  },
  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key: 'inbox', label: 'Inbox Address', type: 'string', required: true,
        helpText: 'The inbox to unregister, e.g. `mytest@ditube.info`.',
      },
    ],
    perform,
    sample: { success: true, message: 'Inbox unregistered.' },
  },
};