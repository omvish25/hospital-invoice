"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PageWrapper from "../page-wrapper";
import { Editadmin } from "services/operations/ipocaseinvoices";
import { usePathname } from "next/navigation";
import { BASE_URL } from "services/apis";
import axios from "axios";


const VALIDATION_SCHEMA = yup.object().shape({
  
    PatientName: yup.string(),
    Age: yup.string().required("Age is required!"),
    Sex: yup.string().required("Sex is required!"),
    MaritialStatus: yup.string(),
    Address: yup.string(),
    MobileNo: yup.string(),
    PhoneNumber: yup.string(),
    AdmissionDate: yup.string(),
    IpNo: yup.string(),
    DoctorName: yup.string(),
    SecondDoctorName: yup.string(),
    ThirdDoctorName: yup.string(),
    RefDoctorName: yup.string(),
    RelativeName: yup.string(),
    PatientCategory: yup.string(),
    isReimbursement: yup.string().required("Reimbursement status is required!"),
    MlcNo: yup.string().required("MLC No is required!"),
    AdmissionTime: yup.string().required("Admission Time is required!"),
    DepartmentName: yup.string().required("Department Name is required!"),
    CompanyName: yup.string().required("Company Name is required!"),
    TariffName: yup.string().required("Tariff Name is required!"),
    BedName: yup.string().required("Bed Name is required!"),
    RelationName: yup.string().required("Relation Name is required!"),
    RelationPhoneNoo: yup.string().required("Relation Phone No is required!"),
    RelationAddress: yup.string().required("Relation Address is required!"),
});


// ================================================================
export default function CategoryForm(props) {

    const [currentCategoryData, setCurrentCategoryData] = useState();
    const [id, setId] = useState();
    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    async function fetchData() {
        try {
            // Ensure that slug is properly formatted in the URL
            const response = await axios.get(
                `${BASE_URL}/finddatabyidipocase?slug=${slug}`
            );
            setCurrentCategoryData(response?.data);
            setId(response?.data?._id);
        } catch (error) {
            console.error("Failed to fetch data", error);
            // Handle error if necessary
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const INITIAL_VALUES = {
       
        PatientName: currentCategoryData?.PatientName || "",
        Age: currentCategoryData?.Age || "",
        Sex: currentCategoryData?.Sex || "",
        MaritialStatus: currentCategoryData?.MaritialStatus || "", // Note the spelling here matches the schema
        Address: currentCategoryData?.Address || "",
        MobileNo: currentCategoryData?.MobileNo || "",
        PhoneNumber: currentCategoryData?.PhoneNumber || "",
        AdmissionDate: currentCategoryData?.AdmissionDate || "",
        IpNo: currentCategoryData?.IpNo || "",
        DoctorName: currentCategoryData?.DoctorName || "",
        SecondDoctorName: currentCategoryData?.SecondDoctorName || "",
        ThirdDoctorName: currentCategoryData?.ThirdDoctorName || "",
        RefDoctorName: currentCategoryData?.RefDoctorName || "",
        RelativeName: currentCategoryData?.RelativeName || "",
        PatientCategory: currentCategoryData?.PatientCategory || "",
        isReimbursement: currentCategoryData?.isReimbursement || "",
        MlcNo: currentCategoryData?.MlcNo || "",
        AdmissionTime: currentCategoryData?.AdmissionTime || "",
        DepartmentName: currentCategoryData?.DepartmentName || "",
        CompanyName: currentCategoryData?.CompanyName || "",
        TariffName: currentCategoryData?.TariffName || "",
        BedName: currentCategoryData?.BedName || "",
        RelationName: currentCategoryData?.RelationName || "",
        RelationPhoneNoo: currentCategoryData?.RelationPhoneNoo || "",
        RelationAddress: currentCategoryData?.RelationAddress || "",
        // Adding fields to maintain consistency with schema
    };

    const handleFormSubmit = async (values) => {
        const data = {
            ...values,
            id: id, // Ensure `id` is correctly defined
        };

        await Editadmin(data);
        // Implement form submission logic here (e.g., API call)
    };
    if (!currentCategoryData) {
        return <p>Loading...</p>;
    }
    return (
        <PageWrapper title="Edit Case Paper">
            <Card className="p-3">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={INITIAL_VALUES}
                    validationSchema={VALIDATION_SCHEMA}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                
                                {/* Patient Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="PatientName"
                                        label="Patient Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Patient Name"
                                        value={values.PatientName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.PatientName && errors.PatientName}
                                        error={Boolean(touched.PatientName && errors.PatientName)}
                                    />
                                </Grid>

                                {/* Age */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="Age"
                                        label="Age"
                                        color="info"
                                        size="medium"
                                        placeholder="Age"
                                        value={values.Age}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.Age && errors.Age}
                                        error={Boolean(touched.Age && errors.Age)}
                                    />
                                </Grid>

                                {/* Sex */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="Sex"
                                        label="Sex"
                                        color="info"
                                        size="medium"
                                        placeholder="Sex"
                                        value={values.Sex}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.Sex && errors.Sex}
                                        error={Boolean(touched.Sex && errors.Sex)}
                                    />
                                </Grid>

                                {/* Marital Status */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="MaritialStatus"
                                        label="Marital Status"
                                        color="info"
                                        size="medium"
                                        placeholder="Marital Status"
                                        value={values.MaritialStatus}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.MaritialStatus && errors.MaritialStatus}
                                        error={Boolean(touched.MaritialStatus && errors.MaritialStatus)}
                                    />
                                </Grid>

                                {/* Address */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="Address"
                                        label="Address"
                                        color="info"
                                        size="medium"
                                        placeholder="Address"
                                        value={values.Address}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.Address && errors.Address}
                                        error={Boolean(touched.Address && errors.Address)}
                                    />
                                </Grid>

                                {/* Mobile No */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="MobileNo"
                                        label="Mobile No"
                                        color="info"
                                        size="medium"
                                        placeholder="Mobile No"
                                        value={values.MobileNo}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.MobileNo && errors.MobileNo}
                                        error={Boolean(touched.MobileNo && errors.MobileNo)}
                                    />
                                </Grid>

                                {/* Phone Number */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="PhoneNumber"
                                        label="Phone Number"
                                        color="info"
                                        size="medium"
                                        placeholder="Phone Number"
                                        value={values.PhoneNumber}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.PhoneNumber && errors.PhoneNumber}
                                        error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                                    />
                                </Grid>

                                {/* Admission Date */}
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="Admission Date"
                                        sx={{ width: "100%" }}
                                        color="info"
                                        size="medium"
                                        placeholder="Admission Date"
                                        value={values.AdmissionDate || null}  // Ensure the value is a valid date or null
                                        onBlur={handleBlur}
                                        onChange={(newDate) => {
                                            setFieldValue("AdmissionDate", newDate);  // Update form state with the new date
                                        }}
                                        helperText={touched.AdmissionDate && errors.AdmissionDate}
                                        error={Boolean(touched.AdmissionDate && errors.AdmissionDate)}
                                    />
                                </Grid>

                                {/* Admission Time */}
                                <Grid item xs={12} sm={6}>
                                    <TimePicker
                                        label="Admission Time"
                                        sx={{ width: "100%" }}
                                        color="info"
                                        size="large"
                                        placeholder="Admission Time"
                                        value={values.AdmissionTime || null}  // Ensure the value is a valid time or null
                                        onBlur={handleBlur}
                                        onChange={(newTime) => {
                                            setFieldValue("AdmissionTime", newTime);  // Update form state with the new time
                                        }}
                                        helperText={touched.AdmissionTime && errors.AdmissionTime}
                                        error={Boolean(touched.AdmissionTime && errors.AdmissionTime)}
                                    />

                                </Grid>

                                {/* Doctor Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="DoctorName"
                                        label="Doctor Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Doctor Name"
                                        value={values.DoctorName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.DoctorName && errors.DoctorName}
                                        error={Boolean(touched.DoctorName && errors.DoctorName)}
                                    />
                                </Grid>
                                {/* Doctor Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="SecondDoctorName"
                                        label="Doctor Name 2"
                                        color="info"
                                        size="medium"
                                        placeholder="Doctor Name"
                                        value={values.SecondDoctorName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.SecondDoctorName && errors.SecondDoctorName}
                                        error={Boolean(touched.SecondDoctorName && errors.SecondDoctorName)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="ThirdDoctorName"
                                        label="Doctor Name 3"
                                        color="info"
                                        size="medium"
                                        placeholder="Doctor Name"
                                        value={values.ThirdDoctorName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.ThirdDoctorName && errors.ThirdDoctorName}
                                        error={Boolean(touched.ThirdDoctorName && errors.ThirdDoctorName)}
                                    />
                                </Grid>

                                {/* Ref Doctor Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="RefDoctorName"
                                        label="Ref Doctor Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Ref Doctor Name"
                                        value={values.RefDoctorName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.RefDoctorName && errors.RefDoctorName}
                                        error={Boolean(touched.RefDoctorName && errors.RefDoctorName)}
                                    />
                                </Grid>

                                {/* Relative Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="RelativeName"
                                        label="Relative Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Relative Name"
                                        value={values.RelativeName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.RelativeName && errors.RelativeName}
                                        error={Boolean(touched.RelativeName && errors.RelativeName)}
                                    />
                                </Grid>

                                {/* Patient Category */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="PatientCategory"
                                        label="Patient Category"
                                        color="info"
                                        size="medium"
                                        placeholder="Patient Category"
                                        value={values.PatientCategory}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.PatientCategory && errors.PatientCategory}
                                        error={Boolean(touched.PatientCategory && errors.PatientCategory)}
                                    />
                                </Grid>

                                {/* Reimbursement Status */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="isReimbursement"
                                        label="Reimbursement Status"
                                        color="info"
                                        size="medium"
                                        placeholder="Reimbursement Status"
                                        value={values.isReimbursement}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.isReimbursement && errors.isReimbursement}
                                        error={Boolean(touched.isReimbursement && errors.isReimbursement)}
                                    />
                                </Grid>

                                {/* MLC No */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="MlcNo"
                                        label="MLC No"
                                        color="info"
                                        size="medium"
                                        placeholder="MLC No"
                                        value={values.MlcNo}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.MlcNo && errors.MlcNo}
                                        error={Boolean(touched.MlcNo && errors.MlcNo)}
                                    />
                                </Grid>

                                {/* IP No */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="IpNo"
                                        label="IP No"
                                        color="info"
                                        size="medium"
                                        placeholder="IP No"
                                        value={values.IpNo}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.IpNo && errors.IpNo}
                                        error={Boolean(touched.IpNo && errors.IpNo)}
                                    />
                                </Grid>

                                {/* Department Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="DepartmentName"
                                        label="Department Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Department Name"
                                        value={values.DepartmentName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.DepartmentName && errors.DepartmentName}
                                        error={Boolean(touched.DepartmentName && errors.DepartmentName)}
                                    />
                                </Grid>

                                {/* Company Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="CompanyName"
                                        label="Company Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Company Name"
                                        value={values.CompanyName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.CompanyName && errors.CompanyName}
                                        error={Boolean(touched.CompanyName && errors.CompanyName)}
                                    />
                                </Grid>

                                {/* Tariff Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="TariffName"
                                        label="Tariff Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Tariff Name"
                                        value={values.TariffName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.TariffName && errors.TariffName}
                                        error={Boolean(touched.TariffName && errors.TariffName)}
                                    />
                                </Grid>

                                {/* Bed Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="BedName"
                                        label="Bed Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Bed Name"
                                        value={values.BedName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.BedName && errors.BedName}
                                        error={Boolean(touched.BedName && errors.BedName)}
                                    />
                                </Grid>

                                {/* Relation Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="RelationName"
                                        label="Relation Name"
                                        color="info"
                                        size="medium"
                                        placeholder="Relation Name"
                                        value={values.RelationName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.RelationName && errors.RelationName}
                                        error={Boolean(touched.RelationName && errors.RelationName)}
                                    />
                                </Grid>

                                {/* Relation Phone No */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="RelationPhoneNoo"
                                        label="Relation Phone No"
                                        color="info"
                                        size="medium"
                                        placeholder="Relation Phone No"
                                        value={values.RelationPhoneNoo}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.RelationPhoneNoo && errors.RelationPhoneNoo}
                                        error={Boolean(touched.RelationPhoneNoo && errors.RelationPhoneNoo)}
                                    />
                                </Grid>

                                {/* Relation Address */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="RelationAddress"
                                        label="Relation Address"
                                        color="info"
                                        size="medium"
                                        placeholder="Relation Address"
                                        value={values.RelationAddress}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.RelationAddress && errors.RelationAddress}
                                        error={Boolean(touched.RelationAddress && errors.RelationAddress)}
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Card>
        </PageWrapper>
    );
}