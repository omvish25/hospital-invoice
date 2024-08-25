import { apiConnector } from "../apiConnector";
import { IndoorBillsEndpoints } from "../apis";
import { toast } from "react-hot-toast";
const { CREATEINDOORBILL_API, EDITINDOORBILL_API } = IndoorBillsEndpoints;

export const Addinvoiceipdhandler = async (data) => {
  const toastId = toast.loading("Adding Bills...");
  try {
    const response = await apiConnector("POST", CREATEINDOORBILL_API, data);
    toast.success("Invoice added successfully");
  } catch (error) {

  }
  toast.dismiss(toastId);
};

// export const Editadmin = async (data) => {
//   const toastId = toast.loading("Editing Admin...");
//   try {
//     const response = await apiConnector("PUT", EDITADMIN_API, data);
//     toast.success("Admin Edited successfully");
//   } catch (error) {
//   }
//   toast.dismiss(toastId);
// };

