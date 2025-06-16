# Robokassa Node.JS

## ⚠можно ставить пока не приняли в основной реп⚠

пакет собран в [npm регистр](https://github.com/shamanov-d/robokassa/pkgs/npm/robokassa)

для установки добавь в `/usr/yu_user/.npmrc`

```
@shamanov-d:registry=https://npm.pkg.github.com/
```

---

Пакет [Robokassa](https://docs.robokassa.ru) для Node.JS.

Поддерживает JavaScript и TypeScript.

А также весь современный API Робокассы, включая [фискализацию](https://docs.robokassa.ru/fiscalization/?utm_medium=email&utm_source=UniSender&utm_campaign=284292554) через receipt, которую необходимо проводить по закону РФ для всех интернет услуг.

Пакет предназначен только для использования на сервере, пароли должны сохраняться в секрете.

## Установка

```sh
$ npm install @shamanov-d/robokassa
```

# Использование

## URL для оплаты

Сгенерируйте URL для оплаты на сервере и перенаправьте на него браузер пользователя.

TypeScript:

```typescript
import { Robokassa } from '@shamanov-d/robokassa';

const robokassa = new Robokassa({
  merchantLogin: 'my_merchant_login',
  password1: 'my_password_1',
  password2: 'my_password_2',
  // hashAlgorithm: 'md5' (default)
  // isTest: false (default)
  // url: 'https://auth.robokassa.ru/Merchant/Index.aspx' (default)
});

const url = robokassa.generatePaymentUrl({
  outSum: '10.00', // или outSum: 10 (type number)
  description: 'Тестовый продукт',

  // Пользовательские параметры должны начинаться с "shp_" или "Shp_" или "SHP_".
  // Они будут переданы на ваш сервер вызовом Робокассы после оплаты в том же виде.
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  // фискализация
  receipt: {
    items: [
      {
        sum: 10,
        name: 'Мой продукт',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },

  // Первый платёж по подписке. После него возможны автосписания без участия пользователя.
  // recurring: true,

  // Используется при автосписании — указывается номер первого оплаченного счёта с recurring: true.
  // Применяется только при запросе на https://auth.robokassa.ru/Merchant/Recurring
  // previousInvoiceId: 154,
});
```

JavaScript:

```javascript
const { Robokassa } = require('@shamanov-d/robokassa');

// Остальное аналогично TypeScript примеру.
```

## Webhooks

Result URL для подтверждения и обработки успешной оплаты.

Для перенаправления браузера пользователя после оплаты Робокасса использует параметры Success URL и Failure URL. Не перепутайте.

Если в настройках Робокассы используется метод `POST` для отправки Result URL (рекомендуется), то можно использовать следующий код Express.JS для обработки запросов:

TypeScript:

```typescript
import { Robokassa, IRobokassaResponse } from '@shamanov-d/robokassa';
import express, { Request, Response } from 'express';

const robokassa = new Robokassa({
  merchantLogin: 'my_merchant_login',
  password1: 'my_password_1',
  password2: 'my_password_2',
});

const app = express();

// Указать данный URL для отправки успешного результаты оплаты в настройках Робокассы (Method of sending data to Result Url)
app.post('/payment/result', function (req: Request, res: Response) {
  const robokassaResponse = req.body as IRobokassaResponse;

  if (robokassa.checkPayment(robokassaResponse)) {
    console.log('Successful payment!');

    const { InvId /* OutSum, shp_interface, ...etc */ } = robokassaResponse;

    // Обязательно вернуть ответ Робокассе в формате `OK[InvId]` при успешной обработке запроса.
    res.send(`OK${InvId}`);
  } else {
    console.log('Processing failed!');
    res.send(`Failure`);
  }
});
```

## Внесение изменений

Сделайте fork репозитория, изменения, убедитесь что успешно пройдены тесты и форматирование:

```bash
$ npm install
$ npm run format
$ npm run build
$ npm run test
```

# История

Идея взяты из следующий старых проектов, которые, к сожалению, не поддерживают современный API Робокассы:

- [betsol/node-robokassa](https://github.com/betsol/node-robokassa)
- [SeNaP/node-robokassa](https://github.com/SeNaP/node-robokassa)

## Лицензия

MIT
