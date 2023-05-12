import { RobokassaUserParameterKey } from './RobokassaUserParameterKey';

export type IRobokassaResponse = {
  /**
   * Invoice ID.
   * Номер счета в магазине. Может быть сгенерирован в Robokassa. */
  InvId: number;

  /** Сумма платежа. */
  OutSum: string;

  /**
   * Комиссия Robokassa за совершение операции.
   * Комиссия удерживается согласно тарифу клиента.
   * Таким образом из суммы, оплаченной покупателем (параметр OutSum) вычитается комиссия Robokassa, и на расчетный счет поступит сумма OutSum минус Fee.
   */
  Fee: string;

  /** EMail, указанный покупателем в процессе оплаты. */
  Email?: string;

  /** Контрольная сумма с Пароль#2 */
  SignatureValue: string;

  /** Способ оплаты который использовал пользователь при совершении платежа. */
  PaymentMethod: string;

  /** Валюта, которой платил клиент. */
  IncCurrLabel: string;
} & Record<RobokassaUserParameterKey, string>;
