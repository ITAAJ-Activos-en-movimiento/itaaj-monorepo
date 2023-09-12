import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";
import Private from "./screens/Private";

const Application = () => {
  return (
    <Routes>
      <Route path="login" element={<Signin />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  )
}

export default Application;
