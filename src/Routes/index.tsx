import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import { OhlcChart } from "../page/OhlcChart";
import { BookOrder } from "../page/BookOrder";
import { routes } from "../utils/routes";
export const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path={routes.ohlc} element={<OhlcChart />} />
        <Route path={routes.orderBook} element={<BookOrder />} />
      </Router>
    </BrowserRouter>
  );
};
