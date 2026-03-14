// searches/getAccountInfo.js
// D009: requires at least one search field — added plan filter
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/me',
    method: 'GET',
  });
  return [response.data.data || response.data];
};

module.exports = {
  key:  'get_account_info',
  noun: 'Account',

  display: {
    label:       'Get Account Info',
    description: 'Returns your current plan, credits balance, rate limits, and inbox counts.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'include_inboxes',
        label:    'Include Inbox Lists',
        type:     'boolean',
        required: false,
        default:  'true',
        helpText: 'Whether to include the full inbox lists in the response. Defaults to true.',
      },
    ],
    perform,
    sample: {
      plan:            'developer',
      plan_label:      'Developer',
      price:           '$7/mo',
      credits:         0,
      api_inbox_count: 3,
      app_inbox_count: 1,
    },
    outputFields: [
      { key: 'plan',            label: 'Plan' },
      { key: 'plan_label',      label: 'Plan Label' },
      { key: 'price',           label: 'Price' },
      { key: 'credits',         label: 'Credits Remaining', type: 'integer' },
      { key: 'api_inbox_count', label: 'API Inbox Count',   type: 'integer' },
      { key: 'app_inbox_count', label: 'App Inbox Count',   type: 'integer' },
    ],
  },
};