import { Route, Routes } from "react-router-dom";
import Private from "./screens/Private";
import { PublicRoutes } from "./constant-definitions";
import { Login } from "./screens/Authentication";
import GuardRoute from "./guards";

const Application = () => {
  return (
    <>
      <Routes>
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<GuardRoute privateValidation={true} />}>
            <Route path="/*" element={<Private />} />
          </Route>
      </Routes>
      {/* <Route path="/*" element={<Private />} /> */}
    </>

  );
};

export default Application;
