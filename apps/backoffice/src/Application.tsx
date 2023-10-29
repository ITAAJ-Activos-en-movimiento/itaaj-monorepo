import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";
import Private from "./screens/Private";
import Leads from "./screens/Private/Leads";
import { PrivateRoutes } from "./constant-definitions";
import Developments from "./screens/Private/Developments";
import CreateDevelopment from "./screens/Private/Developments/Create";

const Application = () => {
  return (
    <Routes>
      <Route path="login" element={<Signin />} />
      <Route path="leads" element={<Leads />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  );
};

export default Application;
