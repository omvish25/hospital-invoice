import { apiConnector } from "../apiConnector";
import { vendorEndpoints } from "../apis";

import { toast } from "react-hot-toast";

const { ADDVENDOR_API,EDITVENDOR_API,CHANGEORDERSTATUSBYVENDOR } = vendorEndpoints;

export const AddVendor = async (data) => {
    const toastId = toast.loading("Adding Vendor...");
    try {
      const response = await apiConnector("POST", ADDVENDOR_API, data);
      toast.success("Vendor added successfully");
    } catch (error) {
  
    }
    toast.dismiss(toastId);
  };

  export const EditVendor = async (data) => {
    const toastId = toast.loading("Editing Vendor...");
    try {
      const response = await apiConnector("PUT", EDITVENDOR_API, data);
      toast.success("Vendor Edited successfully");
    } catch (error) {
 
    }
    toast.dismiss(toastId);
  };

  export const ChangeOrderStatusByVendor = async (data) => {
    const toastId = toast.loading("Editing Vendor...");
    try {
      const response = await apiConnector("PUT", CHANGEORDERSTATUSBYVENDOR, data);
      toast.success("Status Changed successfully");
    } catch (error) {
  
    }
    toast.dismiss(toastId);
  };