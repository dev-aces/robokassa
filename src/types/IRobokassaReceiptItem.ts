export interface IRobokassaReceiptItem {
  /**
    Обязательное поле. 
    Полная сумма в рублях за итоговое количество данного товара с учетом всех возможных скидок, бонусов и специальных цен. 
    Десятичное положительное число: целая часть не более 8 знаков, дробная часть не более 2 знаков.
  */
  sum: number;

  /**
    Обязательное поле. 
    Количество товаров.
  */
  quantity: number;

  /**
    Обязательное поле. 
    Наименование товара. 
    Строка, максимальная длина 128 символа. 
    Если в наименовании товара Вы используете специальные символы, например кавычки, то их обязательно необходимо экранировать.
    Строка наименования не должна содержать спецсимволов и символов других языков, кроме русского и английского.
  */
  name: string;

  /**
    Обязательное поле. 
    Это поле устанавливает налоговую ставку в ККТ. 
    Определяется для каждого вида товара по отдельности, но за все единицы конкретного товара вместе.

    Применяется со значениями:
    none – Без НДС.
    vat0 – НДС по ставке 0%
    vat10 – НДС чека по ставке 10%
    vat110 – НДС чека по расчетной ставке 10/110
    vat20 – НДС чека по ставке 20%
    vat120 – НДС чека по расчетной ставке 20/120
  */
  tax: 'none' | 'vat0' | 'vat10' | 'vat20' | 'vat110' | 'vat120';

  /**
    Маркировка товара, передаётся в том виде, как она напечатана на упаковке товара. 
    Параметр является обязательным только для тех магазинов, которые продают товары подлежащие обязательной маркировке. 
    Код маркировки расположен на упаковке товара, рядом со штрих-кодом или в виде QR-кода.
  */
  nomenclature_code?: string;

  /**
    Необязательное поле. 
    Полная сумма в рублях за единицу товара с учетом всех возможных скидок, бонусов и специальных цен. 
    Десятичное положительное число: целая часть не более 8 знаков, дробная часть не более 2 знаков. 
    Параметр можно передавать вместо параметра sum.
    При передаче параметра общая сумма товарных позиций рассчитывается по формуле (cost*quantity)=sum. 
    Если в запросе переданы и sum и cost последний будет игнорироваться.
  */
  cost?: number;

  /**
    Признак способа расчёта.
    Этот параметр необязательный.
    Если этот параметр не передан клиентом, то в чеке будет указано значение параметра по умолчанию из Личного кабинета.

    Применяется со значениями:
    full_prepayment - Предоплата 100%. Полная предварительная оплата до момента передачи предмета расчёта
    prepayment - Предоплата. Частичная предварительная оплата до момента передачи предмета расчёта
    advance - Аванс
    full_payment - Полный расчёт. Полная оплата, в том числе с учетом аванса (предварительной оплаты) в момент передачи предмета расчёта
    partial_payment - Частичный расчёт и кредит. Частичная оплата предмета расчёта в момент его передачи с последующей оплатой в кредит
    credit -  Передача в кредит. Передача предмета расчёт без его оплаты в момент его передачи с последующей оплатой в кредит
    credit_payment - Оплата кредита. Оплата предмета расчёта после его передачи с оплатой в кредит (оплата кредита)
  */
  payment_method?:
    | 'full_prepayment'
    | 'prepayment'
    | 'advance'
    | 'full_payment'
    | 'partial_payment'
    | 'credit'
    | 'credit_payment';

  /**
    Признак предмета расчёта.
    Этот параметр необязательный.
    Если этот параметр не передан клиентом, то в чеке будет указано значение параметра по умолчанию из Личного кабинета.

    Применяется со значениями:
    commodity - Товар. О реализуемом товаре, за исключением подакцизного товара (наименование и иные сведения, описывающие товар)
    job - Работа. О выполняемой работе (наименование и иные сведения, описывающие работу)
    service - Услуга. Об оказываемой услуге (наименование и иные сведения, описывающие услугу)
    gambling_bet - Ставка азартной игры. О приеме ставок при осуществлении деятельности по проведению азартных игр
    gambling_prize - Выигрыш азартной игры. О выплате денежных средств в виде выигрыша при осуществлении деятельности по проведению азартных игр
    lottery -Лотерейный билет. О приеме денежных средств при реализации лотерейных билетов, электронных лотерейных билетов, приеме лотерейных ставок при осуществлении деятельности по проведению лотерей
    lottery_prize - Выигрыш лотереи. О выплате денежных средств в виде выигрыша при осуществлении деятельности по проведению лотерей
    intellectual_activity - Предоставление результатов интеллектуальной деятельности. О предоставлении прав на использование результатов интеллектуальной деятельности или средств индивидуализации
    payment - Платеж. Об авансе, задатке, предоплате, кредите, взносе в счет оплаты, пени, штрафе, вознаграждении, бонусе и ином аналогичном предмете расчета
    agent_commission -Агентское вознаграждение. О вознаграждении пользователя, являющегося платежным агентом (субагентом), банковским платежным агентом (субагентом), комиссионером, поверенным или иным агентом
    composite - Составной предмет расчета. О предмете расчета, состоящем из предметов, каждому из которых может быть присвоено значение выше перечисленных признаков
    resort_fee - Курортный сбор
    another - Иной предмет расчета. О предмете расчета, не относящемуся к выше перечисленным предметам расчета
    property_right - Имущественное право
    non-operating_gain - Внереализационный доход
    insurance_premium - Страховые взносы
    sales_tax - Торговый сбор
  */
  payment_object?:
    | 'commodity'
    | 'job'
    | 'service'
    | 'gambling_bet'
    | 'gambling_prize'
    | 'lottery'
    | 'lottery_prize'
    | 'intellectual_activity'
    | 'payment'
    | 'agent_commission'
    | 'composite'
    | 'resort_fee'
    | 'another'
    | 'property_right'
    | 'non-operating_gain'
    | 'insurance_premium'
    | 'sales_tax';
}
