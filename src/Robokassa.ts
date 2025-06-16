import { IRobokassaInitOptions } from './types/IRobokassaInitOptions';
import { IRobokassaOrder } from './types/IRobokassaOrder';
import { calculateSendingSignatureValue } from './internal/calculateSendingSignatureValue';
import { IRobokassaResponse } from './types';
import { calculateReceivingSignatureValue } from './internal/calculateReceivingSignatureValue';

//https://docs.robokassa.ru/
export class Robokassa {
  public readonly options: Required<IRobokassaInitOptions>;

  constructor(options: IRobokassaInitOptions) {
    this.options = {
      ...options,
      hashAlgorithm: options.hashAlgorithm ?? 'md5',
      url: options.url ?? 'https://auth.robokassa.ru/Merchant/Index.aspx',
      isTest: options.isTest ?? false,
    };
  }

  public generatePaymentUrl(order: IRobokassaOrder): string {
    if (!order.invId) {
      order.invId = 0;
    }

    if (typeof order.outSum === 'number') {
      order.outSum = order.outSum.toFixed(2);
    }

    const { userParameters, receipt, ...usualOrderParameters } = order;

    const orderWithCapitalizedKeys = Object.fromEntries(
      Object.entries(usualOrderParameters).map(([key, value]) => [
        `${key[0].toUpperCase()}${key.slice(1)}`,
        value,
      ]),
    );

    const queryParams = {
      MerchantLogin: this.options.merchantLogin,
      IsTest: this.options.isTest ? 1 : undefined,
      ...orderWithCapitalizedKeys,
      Receipt: receipt ? encodeURIComponent(JSON.stringify(receipt)) : undefined,
      ...userParameters,
      SignatureValue: calculateSendingSignatureValue({
        hashAlgorithm: this.options.hashAlgorithm,
        merchantLogin: this.options.merchantLogin,
        password1: this.options.password1,
        order,
      }),
    };

    return `${this.options.url}?${this.queryString(queryParams)}`;
  }

  public checkPayment(response: IRobokassaResponse): boolean {
    const expectedSignatureValue = calculateReceivingSignatureValue({
      hashAlgorithm: this.options.hashAlgorithm,
      password2: this.options.password2,
      response,
    });

    return (
      !!response.SignatureValue &&
      expectedSignatureValue.toLowerCase() ===
        response.SignatureValue.toLowerCase()
    );
  }

  private queryString(
    queryParams: Record<string, string | number | undefined>,
  ): string {
    return Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`,
      )
      .join('&');
  }
}
