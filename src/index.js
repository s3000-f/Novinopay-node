const axios = require('axios')
const {CONSTANTS, ERRORS} = require('./config')

const init = async (merchant_id) => {
  if (typeof merchant_id !== 'String') return

}

class NovinopayNode {
  #merchant_id;
  #callback_url;
  #callback_method = 'GET';

  constructor(merchant_id, callback_url, callback_method) {
    this.#merchant_id = merchant_id;
    this.#callback_url = callback_url;
    if (callback_method === 'GET' || callback_method === 'POST') {
      this.#callback_method = callback_method
    }
  }

  static initCustomMethod(merchant_id, callback_url, callback_method) {
    //Callback URL validation
    const url = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    if (!url.test(callback_url)) {
      throw new Error(ERRORS.CALLBACK_URL_INVALID)
    }
    if (callback_url.length > 1000) {
      throw new Error(ERRORS.CALLBACK_URL_TOO_LONG)
    }

    //Callback Method validation
    if (callback_method !== undefined && callback_method !== null && callback_method !== '') {
      if (callback_method !== 'GET' && callback_method !== 'POST') {
        throw new Error(ERRORS.CALLBACK_METHOD_INVALID)
      }
    }

    //Merchant ID validation
    if (merchant_id === undefined || merchant_id === null || typeof merchant_id !== 'string' || merchant_id === '') {
      throw new Error(ERRORS.MERCHANT_ID_TYPE)
    }

    return new NovinopayNode(merchant_id, callback_url, callback_method)
  }

  static init(merchant_id, callback_url) {
    return NovinopayNode.initCustomMethod(merchant_id, callback_url, null)
  }


  async paymentRequest(paymentObject) {
    let data = paymentObject.getPaymentJSON();
    let body = {
      merchant_id: this.#merchant_id,
      amount: data.amount,
      callback_url: data.callback_url ? data.callback_url : this.#callback_url,
      callback_method: data.callback_method ? data.callback_method : this.#callback_method,
    };
    if (data.invoice_id)
      body.invoice_id = data.invoice_id;
    if (data.description)
      body.description = data.description;
    if (data.email)
      body.email = data.email;
    if (data.mobile)
      body.mobile = data.mobile;
    if (data.card_pan)
      body.card_pan = data.card_pan;
    try {
      const res = await axios.post(CONSTANTS.REQUEST_URL, body);
      return res.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else
        throw new Error(ERRORS.REQUEST_FAILED)
    }

  }

  async paymentVerification(verificationObject) {
    let data = verificationObject.getVerificationJSON()
    let body = {
      merchant_id: this.#merchant_id,
      ...data
    }
    try {
      const res = await axios.post(CONSTANTS.VERIFICATION_URL, body);
      return res.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else
        throw new Error(ERRORS.REQUEST_FAILED)
    }

  }

  // async paymentInquiry() {
  //   let body = {
  //     merchant_id: "xxxxxxxxx-xxxxxxxxx-xxxxxxxxx",
  //     authority: "812F739E41057BAC22331918CD5B41C1"
  //   }
  //   axios
  //     .post(CONSTANTS.INQUIRY_URL, body)
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }
}

class PaymentObject {
  amount = null;
  callback_url = null;
  callback_method = null;
  invoice_id = null;
  description = null;
  email = null;
  mobile = null;

  card_pan = null;

  constructor(amount, callback_url, callback_method, invoice_id, description, email, mobile, card_pan) {
    this.amount = amount;
    this.callback_url = callback_url;
    this.callback_method = callback_method;
    this.invoice_id = invoice_id;
    this.description = description;
    this.email = email;
    this.mobile = mobile;
    this.card_pan = card_pan;
  }

  static basic(amount) {
    return PaymentObject.full(amount, null, null, null, null, null, null)
  }

  static default(amount, invoice_id, description, email, mobile) {
    return PaymentObject.full(amount, null, null, invoice_id, description, email, mobile)
  }

  static full(amount, callback_url, callback_method, invoice_id, description, email, mobile, card_pan) {
    const isNumber = /^[0-9]*$/;
    // Amount Validation
    let innerAmmount = '';
    if (typeof amount === 'number') {
      innerAmmount = amount.toString()
      if (amount < 10000 || amount > 500000000) {
        throw new Error(ERRORS.AMOUNT_OUT_OF_RANGE)
      }
    } else if (typeof amount === 'string') {
      innerAmmount = amount;
    } else {
      throw new Error(ERRORS.AMOUNT_NUMBER_ONLY);
    }
    if (!isNumber.test(innerAmmount)) {
      throw new Error(ERRORS.AMOUNT_NUMBER_ONLY);
    }
    if (parseInt(innerAmmount) < 10000 || parseInt(innerAmmount) > 500000000) {
      throw new Error(ERRORS.AMOUNT_OUT_OF_RANGE)
    }

    //Callback URL validation
    if (callback_url !== undefined && callback_url !== null && callback_url !== '') {
      const url = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      if (!url.test(callback_url)) {
        throw new Error(ERRORS.CALLBACK_URL_INVALID)
      }
      if (callback_url.length > 1000) {
        throw new Error(ERRORS.CALLBACK_URL_TOO_LONG)
      }
    }

    //Callback Method validation
    if (callback_method !== undefined && callback_method !== null && callback_method !== '') {
      if (callback_method !== 'GET' && callback_method !== 'POST') {
        throw new Error(ERRORS.CALLBACK_METHOD_INVALID)
      }
    }

    //Invoice ID validation
    let innerInvoice = null;
    if (invoice_id !== undefined && invoice_id !== null && invoice_id !== '') {
      if (typeof invoice_id === 'number') {
        innerInvoice = invoice_id.toString()
      } else if (typeof invoice_id === 'string') {
        innerInvoice = invoice_id;
      } else {
        throw new Error(ERRORS.INVOICE_ID_WRONG_TYPE);
      }
      if (innerInvoice.length > 255) {
        throw new Error(ERRORS.INVOICE_ID_TOO_LONG)
      }

    }

    //Description validation
    if (description !== undefined && description !== null && description !== '') {
      if (typeof description !== 'string') {
        throw new Error(ERRORS.DESCRIPTION_WRONG_TYPE)
      }
      if (description.length > 255) {
        throw new Error(ERRORS.DESCRIPTION_TOO_LONG)
      }
    }

    //Email validation
    if (email !== undefined && email !== null && email !== '') {
      if (typeof email !== 'string') {
        throw new Error(ERRORS.EMAIL_WRONG_TYPE)
      }
      if (email.length > 255) {
        throw new Error(ERRORS.EMAIL_TOO_LONG)
      }
      const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!valid.test(email)) {
        throw new Error(ERRORS.EMAIL_INVALID)
      }
    }

    //Phone Validation
    if (mobile !== undefined && mobile !== null && mobile !== '') {
      if (typeof mobile !== 'string') {
        throw new Error(ERRORS.PHONE_WRONG_TYPE)
      }
      if (mobile.length > 15) {
        throw new Error(ERRORS.PHONE_TOO_LONG)
      }
      if (!isNumber.test(mobile)) {
        throw new Error(ERRORS.PHONE_INVALID)
      }
    }

    //Card Validation
    if (card_pan !== undefined && card_pan !== null && card_pan !== '') {
      if (typeof card_pan !== 'string') {
        throw new Error(ERRORS.CARD_WRONG_TYPE)
      }
      if (card_pan.length !== 16) {
        throw new Error(ERRORS.CARD_TOO_LONG)
      }
      if (!isNumber.test(card_pan)) {
        throw new Error(ERRORS.CARD_INVALID)
      }
    }

    return new PaymentObject(innerAmmount, callback_url, callback_method, innerInvoice, description, email, mobile, card_pan)

  }

  getPaymentJSON() {
    let out = {}
    out.amount = this.amount;
    if (this.callback_url)
      out.callback_url = this.callback_url;
    if (this.callback_method)
      out.callback_method = this.callback_method;
    if (this.invoice_id)
      out.invoice_id = this.invoice_id;
    if (this.description)
      out.description = this.description;
    if (this.email)
      out.email = this.email;
    if (this.mobile)
      out.mobile = this.mobile;
    if (this.card_pan)
      out.card_pan = this.card_pan;
    return out;
  }
}

class VerificationObject {
  amount = null;
  authority = null;

  constructor(amount, authority) {
    this.amount = amount;
    this.authority = authority;
  }

  static init(amount, authority) {
    const isNumber = /^[0-9]*$/;
    // Amount Validation
    let innerAmmount = '';
    if (typeof amount === 'number') {
      innerAmmount = amount.toString()
      if (amount < 10000 || amount > 500000000) {
        throw new Error(ERRORS.AMOUNT_OUT_OF_RANGE)
      }
    } else if (typeof amount === 'string') {
      innerAmmount = amount;
    } else {
      throw new Error(ERRORS.AMOUNT_NUMBER_ONLY);
    }
    if (!isNumber.test(innerAmmount)) {
      throw new Error(ERRORS.AMOUNT_NUMBER_ONLY);
    }
    if (parseInt(innerAmmount) < 10000 || parseInt(innerAmmount) > 500000000) {
      throw new Error(ERRORS.AMOUNT_OUT_OF_RANGE)
    }

    //Authority validation
    if (typeof authority !== 'string') {
      throw new Error(ERRORS.AUTHORITY_WRONG_TYPE)
    }

    return new VerificationObject(amount, authority)

  }

  getVerificationJSON() {
    let out = {}
    out.amount = this.amount;
    out.authority = this.authority
    return out;
  }

}


module.exports = {
  NovinopayNode,
  PaymentObject,
  VerificationObject
}
console.log(axios)
