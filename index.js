// index.js
// FreeCustom.email Zapier Integration — entry point
// ─────────────────────────────────────────────────────────────────────────────
const authentication     = require('./authentication');
const newEmailTrigger    = require('./triggers/newEmail');
const listMessagesTrigger = require('./triggers/listMessagesTrigger');
const getOtpAction       = require('./creates/getOtp');
const registerInbox      = require('./creates/registerInbox');
const unregisterInbox    = require('./creates/unregisterInbox');
const listInboxes        = require('./searches/listInboxes');
const listMessages       = require('./searches/listMessages');
const getMessage         = require('./searches/getMessage');
const deleteMessage      = require('./creates/deleteMessage');
const listDomains        = require('./searches/listDomains');
const getAccountInfo     = require('./searches/getAccountInfo');
const getUsage           = require('./searches/getUsage');

const App = {
  version:         require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  // D028: disable automatic input cleaning globally for predictable behaviour
  flags: {
    cleanInputData: false,
  },

  // Inject Authorization header on every request
  beforeRequest: [
    (request, z, bundle) => {
      request.headers['Authorization'] = `Bearer ${bundle.authData.apiKey}`;
      request.headers['Content-Type']  = 'application/json';
      return request;
    },
  ],

  // Handle API errors globally so every module gets clean error messages
  afterResponse: [
    (response, z) => {
      if (response.status === 401) {
        throw new z.errors.RefreshAuthError();
      }
      if (response.status >= 400) {
        const body = z.JSON.parse(response.content) || {};
        throw new z.errors.Error(
          `[${response.status}] ${body.error || 'error'}: ${body.message || response.content}`,
          'InvalidResponse',
          response.status,
        );
      }
      return response;
    },
  ],

  triggers: {
    [newEmailTrigger.key]: newEmailTrigger,
    [listMessagesTrigger.key]: listMessagesTrigger,
  },

  searches: {
    [getMessage.key]:     getMessage,
  },

  creates: {
    [registerInbox.key]:   registerInbox,
    [unregisterInbox.key]: unregisterInbox,
    [getOtpAction.key]:    getOtpAction,
    [deleteMessage.key]:   deleteMessage,
    [listInboxes.key]:     listInboxes,
    [listMessages.key]:    listMessages,
    [listDomains.key]:     listDomains,
    [getAccountInfo.key]:  getAccountInfo,
    [getUsage.key]:        getUsage,
  },
};

module.exports = App;