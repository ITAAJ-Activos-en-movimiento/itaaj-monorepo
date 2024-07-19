import { Layout } from "@/containers";
import { Navigate, Route, Routes } from "react-router-dom";
import Developments from "./Developments";
import { PrivateRoutes } from "@/constant-definitions";
import CreateDevelopment from "./Developments/Create";
import Properties from "./Properties";
import CreateProperty from "./Properties/Create";
import Proposals from "./Proposals";
import EditDevelopment from "./Developments/Edit";
import Blog from "./Blogs";
import UpdateProperty from "./Properties/Update";
import CRM from "./Crm";
import Funnel from "./Crm/Funnel";
import PropertiesModel from "./PropertiesDevelopments";
import CreatePropertyModel from "./PropertiesDevelopments/Create";
import Market from "./Market";
import { CreateIndex } from "@/features/PriceIndex/screens";
import NewBlog from "./Blogs/New";
import EditBlog from "./Blogs/Edit";
import Users from "./Users";

const Private = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="developments" />} />
      <Route element={<Layout />}>
        <Route path="developments" element={<Developments />} />
        <Route path="development/edit/:slug" element={<EditDevelopment />} />

        <Route
          path={PrivateRoutes.CREATE_DEVELOPMENT}
          element={<CreateDevelopment />}
        />
        <Route path="properties" element={<Properties />} />
        <Route path="properties-developments" element={<PropertiesModel />} />

        <Route path="proposals" element={<Proposals />} />

        <Route
          path="properties/developments/create"
          element={<CreatePropertyModel />}
        />

        <Route path="properties/create" element={<CreateProperty />} />
        <Route path="properties/:slug" element={<UpdateProperty />} />

        <Route path="blogs" element={<Blog />} />
        <Route path="blogs/create" element={<NewBlog />} />
        <Route path="blogs/edit" element={<EditBlog />} />

        <Route path="/crm/funnels/:id" element={<Funnel />} />
        <Route path="/crm/funnels" element={<CRM />} />

        <Route path="/market" element={<Market />} />
        <Route path="/market/create" element={<CreateIndex />} />

        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Private;
