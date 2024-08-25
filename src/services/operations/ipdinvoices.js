import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

import { toast } from "react-hot-toast";

const { ADDADMN_API, EDITADMIN_API, UPDATESTATUSBYADMIN } = adminEndpoints;

export const Addadmin = async (data) => {
  const toastId = toast.loading("Adding Admin...");
  try {
    const response = await apiConnector("POST", ADDADMN_API, data);
    toast.success("Admin added successfully");
  } catch (error) {

  }
  toast.dismiss(toastId);
};

export const Editadmin = async (data) => {
  const toastId = toast.loading("Editing Admin...");
  try {
    const response = await apiConnector("PUT", EDITADMIN_API, data);
    toast.success("Admin Edited successfully");
  } catch (error) {
  }
  toast.dismiss(toastId);
};

export const ChangeOrderStatusByAdmin = async (data) => {
  const toastId = toast.loading("Editing Vendor...");
  try {
    const response = await apiConnector("PUT", UPDATESTATUSBYADMIN, data);
    toast.success("Status Changed successfully");
  } catch (error) {

  }
  toast.dismiss(toastId);
};