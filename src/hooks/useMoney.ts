import { useCookies } from "react-cookie";

export const useMoney = () => {
  const [cookies] = useCookies(["currencySymbol"]);
  const currecnyCode = cookies.currencySymbol === '€' ? 'EUR' : 'USD';

  return {
    currencySign: cookies.currencySymbol || '$',
    getFormatedPrice: (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: currecnyCode, signDisplay: 'auto' }).format(price),
    getPricePerMonth: (price: number, period: number): number => Number((price / period).toFixed(2))
  }
}