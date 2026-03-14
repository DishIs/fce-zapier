// searches/getUsage.js
// D009: requires at least one search field — added period field
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/usage',
    method: 'GET',
  });
  return [response.data.data || response.data];
};

module.exports = {
  key:  'get_usage',
  noun: 'Usage',

  display: {
    label:       'Get Usage Stats',
    description: 'Returns requests used, remaining quota, credits remaining, and reset date for the current billing period.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'period',
        label:    'Period',
        type:     'string',
        required: false,
        default:  'current',
        choices:  ['current'],
        helpText: 'Billing period to retrieve stats for. Currently only "current" month is supported.',
      },
    ],
    perform,
    sample: {
      plan:               'developer',
      requests_used:      1240,
      requests_limit:     100000,
      requests_remaining: 98760,
      percent_used:       '1.2%',
      credits_remaining:  0,
      resets:             '2024-04-28T00:00:00Z',
    },
    outputFields: [
      { key: 'plan',               label: 'Plan' },
      { key: 'requests_used',      label: 'Requests Used',      type: 'integer' },
      { key: 'requests_limit',     label: 'Requests Limit',     type: 'integer' },
      { key: 'requests_remaining', label: 'Requests Remaining', type: 'integer' },
      { key: 'percent_used',       label: 'Percent Used' },
      { key: 'credits_remaining',  label: 'Credits Remaining',  type: 'integer' },
      { key: 'resets',             label: 'Resets At' },
    ],
  },
};