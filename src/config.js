module.exports = {
  CONSTANTS: {
    REQUEST_URL: 'https://api.novinopay.com/payment/ipg/v2/request',
    VERIFICATION_URL: 'https://api.novinopay.com/payment/ipg/v2/verification',
    INQUIRY_URL: 'https://api.novinopay.com/payment/ipg/v2/inquiry'
  },
  ERRORS: {
    AMOUNT_NUMBER_ONLY: 'Amount must be a number',
    AMOUNT_OUT_OF_RANGE: 'Amount must be within 10.000 and 500.000.000 Rls',
    CALLBACK_URL_INVALID: 'Callback url must be a valid url',
    CALLBACK_URL_TOO_LONG: 'Callback url must be under 1000 characters',
    CALLBACK_METHOD_INVALID: 'Callback method must be \"GET\" or \"POST\"',
    INVOICE_ID_WRONG_TYPE: 'Invoice ID must be a string',
    INVOICE_ID_TOO_LONG: 'Invoice ID must be under 255 characters',
    DESCRIPTION_TOO_LONG: 'Description must be under 255 characters',
    DESCRIPTION_WRONG_TYPE: 'Description must be a string',
    EMAIL_TOO_LONG: 'Email must be under 255 characters',
    EMAIL_WRONG_TYPE: 'Email must be a string',
    EMAIL_INVALID: 'Email is not valid',
    PHONE_TOO_LONG: 'Phone number must be under 15 characters',
    PHONE_WRONG_TYPE: 'Phone number must be a string',
    PHONE_INVALID: 'Phone number is not valid',
    CARD_TOO_LONG: 'Card Number must be 16 characters',
    CARD_WRONG_TYPE: 'Card Number must be a string',
    CARD_INVALID: 'Card Number is not valid',
    MERCHANT_ID_TYPE: 'Merchant ID must be a string',
    REQUEST_FAILED: 'Failed to make request',
    // AUTHORITY_TOO_LONG: 'Authority must be 16 characters',
    AUTHORITY_WRONG_TYPE: 'Authority must be a string',

  }
}
