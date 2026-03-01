import { PrivateRoutes } from "@/constant-definitions";
import { Delete, Icon } from "react-feather";

type Item = {
  path: string;
  label: string;
  icon: Icon;
};

interface Option {
  title: string;
  role: string[];
  items?: Item[];
}

export const headerOptions: Option[] = [
  {
    title: "Realty",
    role: ["Desarrollo", "Management", "Marketing", "Finanzas"],
    items: [
      {
        path: PrivateRoutes.PROJECTS,
        label: "Projects",
        icon: Delete,
      },
      {
        path: PrivateRoutes.LEADS,
        label: "Tasks",
        icon: Delete,
      },
      {
        path: "blogs",
        label: "Blogs",
        icon: Delete,
      },
    ],
  },
];
