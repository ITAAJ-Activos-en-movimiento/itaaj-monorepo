import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";
import Private from "./screens/Private";
import Leads from "./screens/Private/leads";

const Application = () => {
  return (
    <Routes>
      <Route path="login" element={<Signin />} />
      <Route path="leads" element={<Leads />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  )
}

export default Application;
