import { Outlet } from "react-router-dom";
import LibComponentNavbar from "../libs/components/LibComponentNavbar.jsx";
import WidgetUserSignInModal from "../widgets/user/WidgetUserSignInModal.jsx";

const OutletPage = () => {
  return (
    <>
      <LibComponentNavbar />
      <Outlet />
      <WidgetUserSignInModal />
    </>
  );
};

export default OutletPage;
