// searches/getUsage.js
// D009: requires at least one search field — added period field
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/usage',
    method: 'GET',
  });
  const data = response.data.data || {};
  return [{
    id:                 data.plan || 'current',
    plan:               data.plan,
    resets_at:          data.period?.resets_at,
    requests_used:      data.requests?.used,
    requests_limit:     data.requests?.limit,
    requests_remaining: data.requests?.remaining,
    percent_used:       data.requests?.percent_used,
    credits_balance:    data.credits?.balance,
    rate_limit_sec:     data.rate_limit?.requests_per_second,
  }];
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
      id:                 'startup',
      plan:               'startup',
      resets_at:          '2026-04-01T00:00:00Z',
      requests_used:      1240,
      requests_limit:     500000,
      requests_remaining: 498760,
      percent_used:       0.25,
      credits_balance:    25000,
      rate_limit_sec:     25,
    },
    outputFields: [
      { key: 'plan',               label: 'Plan' },
      { key: 'resets_at',          label: 'Resets At',          type: 'datetime' },
      { key: 'requests_used',      label: 'Requests Used',      type: 'integer' },
      { key: 'requests_limit',     label: 'Requests Limit',     type: 'integer' },
      { key: 'requests_remaining', label: 'Requests Remaining', type: 'integer' },
      { key: 'percent_used',       label: 'Percent Used',       type: 'number' },
      { key: 'credits_balance',    label: 'Credits Balance',    type: 'integer' },
      { key: 'rate_limit_sec',     label: 'Rate Limit (Sec)',    type: 'integer' },
    ],
  },
};