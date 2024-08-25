import { apiConnector } from "../apiConnector";
import { IpdCaseEndpoints } from "../apis";
import { toast } from "react-hot-toast";
const { CREATEIPDCASE_API, EDITIPDCASE_API } = IpdCaseEndpoints;

export const Addinvoiceipdhandler = async (data) => {
    const toastId = toast.loading("Adding Bills...");
    try {
        const response = await apiConnector("POST", CREATEIPDCASE_API, data);
        toast.success("Invoice added successfully");
    } catch (error) {

    }
    toast.dismiss(toastId);
};

export const Editadmin = async (data) => {
    const toastId = toast.loading("Editing Admin...");
    try {
        const response = await apiConnector("PUT", EDITIPDCASE_API, data);
        toast.success("Admin Edited successfully");
    } catch (error) {
    }
    toast.dismiss(toastId);
};

