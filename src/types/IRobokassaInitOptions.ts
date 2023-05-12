export interface IRobokassaInitOptions {
  /**
   * Идентификатор магазина в Robokassa, который вы придумали при создании магазина.
   */
  merchantLogin: string;

  password1: string;
  password2: string;

  /** Тестовый режим, default: false */
  isTest?: boolean;

  /**
   * Хэш алгоритм, который будет использоваться для расчета SignatureValue, default: 'md5'
   */
  hashAlgorithm?: 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'ripemd160';

  /**
   * Robokassa API URL, default: "https://auth.robokassa.ru/Merchant/Index.aspx"
   */
  url?: string;
}
