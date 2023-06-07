import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChartScreen } from "./page/Chart";
import { OrderScreen } from "./page/Order";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChartScreen />} />
          <Route path="/order" element={<OrderScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
