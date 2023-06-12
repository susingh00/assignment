export interface BookOrderType {
  price: number;
  total: number;
  amount: number;
  count: number;
}
export interface BookOrderPropsType {
  bids: BookOrderType[];
  asks: BookOrderType[];
}
