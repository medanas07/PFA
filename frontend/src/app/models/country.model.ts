import { Continent } from "./continent.model";
import { Currency} from "./currency.model"
export interface Country {
  id: number;
  countryName: string;
  isoCode: string;
  m49Code: number;
  longitude: number;
  latitude: number;
  altitude: number;
  currency: Currency;
  continent: Continent;
}
