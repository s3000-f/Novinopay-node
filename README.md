# Novinopay-node

[![npm version](https://badge.fury.io/js/novinopay-node.svg)](https://badge.fury.io/js/novinopay-node)

## Overview

Novinopay-node is a Node.js interface for the [Novinopay](https://novinopay.com/) internet payment gateway APIs.
Currently the payment and verificaiton requests are implemented.
For full documentation on the base APIs please visit [Novinopay API docs](https://novinopay.com/docs).

## Installation

Novinopay-node is available on npm and can be installed using npm's package manager:

```bash
npm install novinopay-node
```

## Usage

Once installed, Your Library Name can be imported and used in your project like any other Node.js module:

```javascript
const novinopay_node = require('novinopay-node');
```
Or

```javascript
const { NovinopayNode, PaymentObject, VerificationObject } = require('novinopay-node');
```
### Basic Usage
#### Step 1
In order to request a payment, you will first need to initialize the `NovinopayNode` class as follows:
```javascipt
const novinopay = NovinopayNode.init('your merchant id here', 'your default callback url here');
```
It is important to note that this method might throw an error if given arguments are in anyway invalid.
Please refer to [Novinopay docs](https://novinopay.com/docs) on the constraints for the arguments.

*Initialization with custom method is demostrated in [API](#api) section.

#### Step 2
You need to create a PaymentObject as follows:
```javascript
const paymentObject = PaymentObject.basic('amount in Rls');
```
It is important to note that this method might throw an error if given arguments are in anyway invalid.
Please refer to [Novinopay docs](https://novinopay.com/docs) on the constraints for the arguments.

*More elaborate styles of PaymentObject can be found in [API](#api) section.

#### Step 3
Now you can make the payment request using the following function:
```javascript
const paymentResponse = await novinopay.paymentRequest(paymentObject);
```
If any error occurs during the call, an error witll be thrown. Otherwise the response will be the object retured by the Novinopay APIs (see samples [here](https://novinopay.com/docs))

#### Step 4
After the request is made and the user has returned from the payment process, you'll need to verify the payment.
in order to do so, you'll need to create a VerificationObject:
```javascript
const verificationObject = VerificationObject.init('amount in RLs', 'payment authority aquired from "paymentResponse"');
```
It is important to note that this method might throw an error if given arguments are in anyway invalid.
Please refer to [Novinopay docs](https://novinopay.com/docs) on the constraints for the arguments.

Using this object you can now make the verification request:

```javascript
const verificationResponse = await novinpay.paymentVerification(verificationObject);
```
If any error occurs during the call, an error witll be thrown. Otherwise the response will be the object retured by the Novinopay APIs (see samples [here](https://novinopay.com/docs))

## API

The API of Your Library Name is thoroughly documented in this section, providing users with a comprehensive overview of the library's functionality, including available methods, arguments, and return types.

### NovinopayNode.init(merchant_id, callback_url): NovinopayNode

Used to initialize the main class of the library.

#### Arguments

| Argument       | Type               | Description                               |
|:--------------:|:------------------:|:-----------------------------------------:|
| merchant_id    | string             | The merchant code provided by Novinopay.  |
| callback_url   | string(url)(1000)  | The callback url from the payment system. |

#### Returns

Instance of Novinopay or throws Error

### NovinopayNode.initCustomMethod(merchant_id, callback_url, callback_method): NovinopayNode

Used to initialize the main class of the library.

#### Arguments

| Argument          | Type                     | Description                                  |
|:-----------------:|:------------------------:|:--------------------------------------------:|
| merchant_id       | string                   | The merchant code provided by Novinopay.     |
| callback_url      | string(url)(1000)        | The callback url from the payment system.    |
| callback_method   | string('GET' or 'POST')  | The method used for request to callback url. |

#### Returns

Instance of Novinopay or throws Error

### PaymentObject.basic(amount): PaymentObject

Creates a PaymentObject data class instance.

#### Arguments

| Argument | Type               | Description                    |
|:--------:|:------------------:|:------------------------------:|
| amount   | string / number    | The peyment amount in Rls.     |

#### Returns

Instance of PaymentObject or throws Error

### PaymentObject.default(amount, invoice_id, description, email, mobile): PaymentObject

Creates a PaymentObject data class instance.

#### Arguments

| Argument              | Type                       | Description                                   |
|:---------------------:|:--------------------------:|:---------------------------------------------:|
| amount                | string / number            | The peyment amount in Rls.                    |
| invoice_id            | string(255) / number       | Internal invoice id from your system.         |
| description           | string(255)                | Your description for the payment.             |
| email                 | string(255)                | Email of the user making the payment.         |
| mobile                | string(15)                 | Phone of the user making the payment.         |

#### Returns

Instance of PaymentObject or throws Error

### PaymentObject.full(amount, callback_url, callback_method, invoice_id, description, email, mobile, card_pan): PaymentObject

Creates a PaymentObject data class instance.

#### Arguments

| Argument              | Type                       | Description                                   |
|:---------------------:|:--------------------------:|:---------------------------------------------:|
| amount                | string / number            | The peyment amount in Rls.                                             |
| callback_url          | string(url)(1000)          | The callback url from the payment system.(overrides default value)     |
| callback_method       | string('GET' or 'POST')    | The method used for request to callback url.(overrides default value)  |
| invoice_id            | string(255) / number       | Internal invoice id from your system.                                  |
| description           | string(255)                | Your description for the payment.                                      |
| email                 | string(255)                | Email of the user making the payment.                                  |
| mobile                | string(15)                 | Phone of the user making the payment.                                  |
| card_pan              | string(16)                 | Limits the card that can be used to make the payment.                  |

#### Returns

Instance of PaymentObject or throws Error

### VerificationObject.init(amount, authority): VerificationObject

Creates a VerificationObject data class instance.

#### Arguments

| Argument              | Type                       | Description                                   |
|:---------------------:|:--------------------------:|:---------------------------------------------:|
| amount                | string / number            | The peyment amount in Rls.                    |
| authority             | string                     | The returned payment authority value.         |

#### Returns

Instance of PaymentObject or throws Error

### paymentRequest(paymentObject): PaymentResponse

Makes the payment request.

#### Arguments

| Argument              | Type                       | Description                                   |
|:---------------------:|:--------------------------:|:---------------------------------------------:|
| paymentObject         | PaymentObject              | Data class with all the required information. |

#### Returns

Response object as stated in the [Novinopay docs](https://novinopay.com/docs).

### paymentVerification(verificationObject): VerificationResponse

Makes the payment verification request.

#### Arguments

| Argument              | Type                       | Description                                   |
|:---------------------:|:--------------------------:|:---------------------------------------------:|
| verificationObject    | VerificationObject         | Data class with all the required information. |

#### Returns

Response object as stated in the [Novinopay docs](https://novinopay.com/docs).

## Contributing

We welcome contributions from the community! If you have suggestions for how we can improve Your Library Name or you would like to report a bug, please create an issue on the GitHub repository. If you would like to contribute code to the project, please follow the instructions in the CONTRIBUTING.md file.

## License

Your Library Name is released under the ISC License. See LICENSE.md for more details.
