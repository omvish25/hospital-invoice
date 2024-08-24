import duotone from "icons/duotone";
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
  name: "Categories",
  icon: duotone.Accounts,
  children: [{
    name: "Category List",
    path: "/admin/categories"
  }, {
    name: "Create Category",
    path: "/admin/categories/create"
  }]
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];