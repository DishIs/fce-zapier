// creates/deleteMessage.js
// D004: messageId has dynamic dropdown sourcing from list_messages
// D028: cleanInputData set to false
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const { inbox, messageId } = bundle.inputData;
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(inbox)}/messages/${encodeURIComponent(messageId)}`,
    method: 'DELETE',
  });
  return response.data;
};

module.exports = {
  key:  'delete_message',
  noun: 'Message',

  display: {
    label:       'Delete a Message',
    description: 'Permanently deletes an email from an inbox by ID.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'inbox',
        label:    'Inbox Address',
        type:     'string',
        required: true,
      },
      {
        key:      'messageId',
        label:    'Message ID',
        type:     'string',
        required: true,
        helpText: 'The ID of the message to delete.',
        // D004: dynamic dropdown
        dynamic:  'list_messages_trigger.id.subject',
      },
    ],
    perform,
    sample: {
      success: true,
      message: 'Message deleted.',
    },
  },
};