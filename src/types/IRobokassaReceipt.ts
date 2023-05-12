import { IRobokassaReceiptItem } from './IRobokassaReceiptItem';

/**
    Фискализация
    https://docs.robokassa.ru/fiscalization/

    Для клиентов Robokassa выбравших для себя Облачное решение, Кассовое решение или решение Робочеки, в протокол добавляется дополнительный параметр.
    В соответствии с требованием Закона РФ, все без исключения операции с использованием электронных средств платежа должны проходить через специализированную контрольно-кассовую технику, и данные о них должны передаваться через операторов фискальных данных в налоговую инспекцию в режиме реального времени.
*/
export interface IRobokassaReceipt {
  /**
    Система налогообложения. 
    Необязательное поле, если у организации имеется только один тип налогообложения (данный параметр обзятально задается в личном кабинете магазина)

    Применяется со значениями:
    osn – Общая СН
    usn_income – Упрощенная СН (доходы)
    usn_income_outcome – Упрощенная СН (доходы минус расходы)
    esn – Единый сельскохозяйственный налог
    patent – Патентная СН
  */
  sno?: 'osn' | 'usn_income' | 'usn_income_outcome' | 'esn' | 'patent';

  /**
    Массив данных о позициях чека
  */
  items: IRobokassaReceiptItem[];
}
