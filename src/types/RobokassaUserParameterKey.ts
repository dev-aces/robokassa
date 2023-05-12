/**
  Ключ дополнительных пользовательских параметров.
  Формироваться они должны следующим образом: всегда начинаться с: Shp_ или SHP_ или shp_.

    Как может выглядеть:
    Shp_1=1 Shp_1=2, SHP_oplata=1, SHP_oplata=2, shp_login=Vasya, shp_name=Вася, Shp_url=https://robokassa.com/
*/
export type RobokassaUserParameterKey =
  | `Shp_${string}`
  | `SHP_${string}`
  | `shp_${string}`;
