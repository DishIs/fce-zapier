// creates/getOtp.js
const perform = async (z, bundle) => {
  const response = await z.request({
    url:    `https://api2.freecustom.email/v1/inboxes/${encodeURIComponent(bundle.inputData.inbox)}/otp`,
    method: 'GET',
  });
  return response.data;
};

module.exports = {
  key:  'get_otp',
  noun: 'OTP',
  display: {
    label:       'Get Latest OTP',
    description: 'Returns the most recent one-time password and verification link from an inbox. OTP is parsed automatically. Requires Growth plan or above.',
  },
  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key: 'inbox', label: 'Inbox Address', type: 'string', required: true,
        helpText: 'The inbox to check for OTPs, e.g. `mytest@ditube.info`.',
      },
    ],
    perform,
    sample: {
      success: true, otp: '482910', email_id: 'D3vt8NnEQ',
      from: 'no-reply@github.com', subject: 'Your GitHub verification code',
      timestamp: 1710234567000, verification_link: 'https://github.com/verify?code=482910',
    },
    outputFields: [
      { key: 'otp',               label: 'OTP Code' },
      { key: 'email_id',          label: 'Email ID' },
      { key: 'from',              label: 'From' },
      { key: 'subject',           label: 'Subject' },
      { key: 'timestamp',         label: 'Timestamp (ms)', type: 'integer' },
      { key: 'verification_link', label: 'Verification Link' },
    ],
  },
};