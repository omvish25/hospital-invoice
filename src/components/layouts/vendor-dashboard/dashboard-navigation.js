import duotone from "icons/duotone";
import { signOut } from 'next-auth/react';
const handleLogout = () => {
  signOut({
      callbackUrl: '/login', 
  });
};
export const navigation = [{
  type: "label",
  label: "Admin"
}, {
  name: "Dashboard",
  icon: duotone.Dashboard,
  path: "/vendor/dashboard"
}, {
  name: "IPD Bills",
  icon: duotone.Products,
  children: [{
    name: "Manage IPD Bill",
    path: "/admin/products"
  }, {
    name: "Create IPD Bill",
    path: "/admin/products/create"
  },]
}, {
  name: "Case Paper",
  icon: duotone.Accounts,
  children: [{
    name: "Manage Case Paper",
    path: "/admin/categories"
  }, {
    name: "Create Case Paper",
    path: "/admin/categories/create"
  }]
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];