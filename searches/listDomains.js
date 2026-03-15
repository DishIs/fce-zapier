// searches/listDomains.js
// D009: requires at least one search field — added optional tier filter
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/domains',
    method: 'GET',
  });
  const all = (response.data.data || []).map(d => ({ ...d, id: d.domain }));
  const tier = bundle.inputData.tier;
  return tier ? all.filter(d => d.tier === tier) : all;
};

module.exports = {
  key:  'list_domains',
  noun: 'Domain',

  display: {
    label:       'List Available Domains',
    description: 'Returns all domains available for use as inboxes on your current plan. Growth/Enterprise plans see additional pro-tier domains.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'tier',
        label:    'Tier',
        type:     'string',
        required: false,
        choices:  ['free', 'pro'],
        helpText: 'Optional. Filter by tier. Leave blank to return all domains available on your plan.',
      },
    ],
    perform,
    sample: {
      domain:        'ditube.info',
      tier:          'free',
      tags:          ['popular'],
      expiring_soon: false,
    },
    outputFields: [
      { key: 'domain',          label: 'Domain' },
      { key: 'tier',            label: 'Tier' },
      { key: 'expiring_soon',   label: 'Expiring Soon',    type: 'boolean' },
      { key: 'expires_at',      label: 'Expires At' },
      { key: 'expires_in_days', label: 'Expires In (Days)', type: 'integer' },
    ],
  },
};