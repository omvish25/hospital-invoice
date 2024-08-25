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

export const Editinvoiceipdhandler = async (data) => {
  const toastId = toast.loading("Editing Invoice...");
  try {
    const response = await apiConnector("PUT", EDITINDOORBILL_API, data);
    toast.success("Invoice Edited successfully");
  } catch (error) {
  }
  toast.dismiss(toastId);
};

