import { HashRouter, Route, Routes } from "react-router-dom";
import OutletPage from "./outlets/OutletPage";
import PageBarangList from "./pages/barang/PageBarangList";
import PageBarangCreate from "./pages/barang/PageBarangCreate";
import PageBarangDetail from "./pages/barang/PageBarangDetail";
import { useState } from "react";
import { ContextApplication } from "./libs/config/contexts";
import useLoading from "./libs/hooks/useLoading";
import PageCustomerList from "./pages/customer/PageCustomerList";
import PageCustomerCreate from "./pages/customer/PageCustomerCreate";
import PageCustomerDetail from "./pages/customer/PageCustomerDetail";
import PageOrderList from "./pages/order/PageOrderList";
import PageOrderCreate from "./pages/order/PageOrderCreate";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const loading = useLoading();

  return (
    <ContextApplication.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route index={true} element={<PageBarangList />} />
            <Route path={"create"} element={<PageBarangCreate />} />
            <Route path={"detail"} element={<PageBarangDetail />} />
          </Route>
          <Route path="/customer" element={<OutletPage />}>
            <Route path="" element={<PageCustomerList />}>
              <Route index element={<PageCustomerCreate />} />
              <Route path={"detail"} element={<PageCustomerDetail />} />
            </Route>
          </Route>
          <Route path="/order" element={<OutletPage />}>
            <Route index={true} element={<PageOrderList />} />
            <Route path={"create"} element={<PageOrderCreate />} />
            <Route path={"detail"} element={<PageBarangDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </ContextApplication.Provider>
  );
}

export default App;
