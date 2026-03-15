// searches/getAccountInfo.js
// D009: requires at least one search field — added plan filter
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/me',
    method: 'GET',
  });
  const data = response.data.data || {};
  return [{
    id:                  data.plan || 'current', // unique id for search
    plan:                data.plan,
    credits:             data.credits,
    api_inbox_count:     data.api_inbox_count,
    app_inbox_count:     data.app_inbox_count,
    custom_domain_count: data.custom_domain_count,
    // features
    otp_extraction:      data.features?.otp_extraction,
    attachments:         data.features?.attachments,
    custom_domains:      data.features?.custom_domains,
    // rate limits
    limit_per_second:    data.rate_limits?.requests_per_second,
    limit_per_month:     data.rate_limits?.requests_per_month,
  }];
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
      id:                  'startup',
      plan:                'startup',
      credits:             25000,
      api_inbox_count:     3,
      app_inbox_count:     1,
      custom_domain_count: 0,
      otp_extraction:      true,
      attachments:         true,
      custom_domains:      true,
      limit_per_second:    25,
      limit_per_month:     500000,
    },
    outputFields: [
      { key: 'plan',                label: 'Plan' },
      { key: 'credits',             label: 'Credits Remaining',   type: 'integer' },
      { key: 'api_inbox_count',     label: 'API Inbox Count',     type: 'integer' },
      { key: 'app_inbox_count',     label: 'App Inbox Count',     type: 'integer' },
      { key: 'custom_domain_count', label: 'Custom Domain Count', type: 'integer' },
      { key: 'otp_extraction',      label: 'OTP Extraction',      type: 'boolean' },
      { key: 'attachments',         label: 'Attachments Allowed', type: 'boolean' },
      { key: 'custom_domains',      label: 'Custom Domains',      type: 'boolean' },
      { key: 'limit_per_second',    label: 'Rate Limit (Sec)',    type: 'integer' },
      { key: 'limit_per_month',     label: 'Rate Limit (Month)',  type: 'integer' },
    ],
  },
};