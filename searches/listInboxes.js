// searches/listInboxes.js
// D009: Zapier requires at least one search field on all searches.
// Added optional `filter` field so the search is valid.
// ─────────────────────────────────────────────────────────────────────────────

const perform = async (z, bundle) => {
  const response = await z.request({
    url:    'https://api2.freecustom.email/v1/inboxes',
    method: 'GET',
  });
  const all = (response.data.data || []).map(i => ({ ...i, id: i.inbox }));
  // Client-side filter if user provided one
  const f = (bundle.inputData.filter || '').toLowerCase();
  const filtered = f ? all.filter(i => i.inbox.includes(f) || i.domain.includes(f)) : all;
  return {
    count:   filtered.length,
    inboxes: filtered,
  };
};

module.exports = {
  key:  'list_inboxes',
  noun: 'Inbox',

  display: {
    label:       'List Registered Inboxes',
    description: 'Returns all inboxes currently registered under your API account.',
  },

  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key:      'filter',
        label:    'Filter',
        type:     'string',
        required: false,
        helpText: 'Optional. Filter results by inbox address or domain (e.g. "ditube.info"). Leave blank to return all inboxes.',
      },
    ],
    perform,
    sample: {
      count:   1,
      inboxes: [
        {
          inbox:  'mytest@ditube.info',
          local:  'mytest',
          domain: 'ditube.info',
        },
      ],
    },
    outputFields: [
      { key: 'inbox',  label: 'Inbox Address' },
      { key: 'local',  label: 'Local Part' },
      { key: 'domain', label: 'Domain' },
    ],
  },
};