import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Category from "views/admin/category/Category";
import SubCategory from "views/admin/category/SubCategory";
import Softwares from "views/admin/category/Softwares";
import Message from "views/admin/message/Message";

// Icon Imports
import {
  MdHome,
  MdCategory,
  MdProductionQuantityLimits,
  MdMessage,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Category",
    layout: "/admin",
    icon: <MdCategory className="h-6 w-6" />,
    path: "categories",
    component: <Category />,
  },
  {
    name: "Sub Category",
    layout: "/admin",
    path: "subcategory",
    icon: <MdCategory className="h-6 w-6" />,
    component: <SubCategory />,
  },
  {
    name: "Softwares",
    layout: "/admin",
    path: "softwares",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <Softwares />,
  },
  {
    name: "Messages",
    layout: "/admin",
    path: "messages",
    icon: <MdMessage className="h-6 w-6" />,
    component: <Message />,
  },
];
export default routes;
