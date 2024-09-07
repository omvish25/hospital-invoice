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
    Age: yup.string(),
    Sex: yup.string(),
    MaritialStatus: yup.string(),
    Address: yup.string(),
    MobileNo: yup.string(),
    PhoneNumber: yup.string(),
    AdmissionDate: yup.string(),
    DoctorName: yup.string(),
    SecondDoctorName: yup.string(),
    ThirdDoctorName: yup.string(),
    RefDoctorName: yup.string(),
    RelativeName: yup.string(),
    PatientCategory: yup.string(),
    isReimbursement: yup.string(),
    MlcNo: yup.string(),
    AdmissionTime: yup.string(),
    DepartmentName: yup.string(),
    CompanyName: yup.string(),
    TariffName: yup.string(),
    BedName: yup.string(),
    RelationName: yup.string(),
    RelationPhoneNoo: yup.string(),
    RelationAddress: yup.string(),
});


// ================================================================
export default function CategoryForm(props) {

    const [initialValues, setInitialValues] = useState(null);
    const [id, setId] = useState(null);
    const pathname = usePathname();
    const slug = pathname.split("/").pop();

    async function fetchData() {
        try {
            const response = await axios.get(`${BASE_URL}/finddatabyidipocase?slug=${slug}`);
            const data = response?.data;

            setId(data?._id);

            setInitialValues({
                PatientName: data?.PatientName || "",
                Age: data?.Age || "",
                Sex: data?.Sex || "",
                MaritialStatus: data?.MaritialStatus || "",
                Address: data?.Address || "",
                MobileNo: data?.MobileNo || "",
                PhoneNumber: data?.PhoneNumber || "",
                AdmissionDate: data?.AdmissionDate || null,
                AdmissionTime: data?.AdmissionTime || null,
                DoctorName: data?.DoctorName || "",
                SecondDoctorName: data?.SecondDoctorName || "",
                ThirdDoctorName: data?.ThirdDoctorName || "",
                RefDoctorName: data?.RefDoctorName || "",
                RelativeName: data?.RelativeName || "",
                PatientCategory: data?.PatientCategory || "",
                isReimbursement: data?.isReimbursement || "",
                MlcNo: data?.MlcNo || "",
                DepartmentName: data?.DepartmentName || "",
                CompanyName: data?.CompanyName || "",
                TariffName: data?.TariffName || "",
                BedName: data?.BedName || "",
                RelationName: data?.RelationName || "",
                RelationPhoneNoo: data?.RelationPhoneNoo || "",
                RelationAddress: data?.RelationAddress || "",
                AdvanceAmounts: data?.AdvanceAmounts || [
                    {
                        amount: "",
                        date: null,
                        method: "",
                    },
                ],
            });
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSubmit = async (values) => {
        const data = { ...values, id: id };

        await Editadmin(data);
    };

    if (!initialValues) {
        return <p>Loading...</p>;
    }

    return (
        <PageWrapper title="Edit Case Paper">
            <Card className="p-3">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
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

                                <Grid item xs={12}>
                                    <FieldArray name="AdvanceAmounts">
                                        {({ push, remove }) => (
                                            <div>
                                                {values.AdvanceAmounts?.map((advance, index) => (
                                                    <Grid container spacing={3} key={index} alignItems="center">
                                                        <Grid item xs={12} sm={3}>
                                                            <TextField
                                                                fullWidth
                                                                name={`AdvanceAmounts.${index}.amount`}
                                                                label="Advance Amount"
                                                                value={advance.amount}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                helperText={
                                                                    touched.AdvanceAmounts?.[index]?.amount && errors.AdvanceAmounts?.[index]?.amount
                                                                }
                                                                error={Boolean(
                                                                    touched.AdvanceAmounts?.[index]?.amount && errors.AdvanceAmounts?.[index]?.amount
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={3}>
                                                            <DatePicker
                                                                label="Date"
                                                                value={advance.date || null}
                                                                onChange={(newDate) => setFieldValue(`AdvanceAmounts.${index}.date`, newDate)}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        helperText={
                                                                            touched.AdvanceAmounts?.[index]?.date && errors.AdvanceAmounts?.[index]?.date
                                                                        }
                                                                        error={Boolean(
                                                                            touched.AdvanceAmounts?.[index]?.date && errors.AdvanceAmounts?.[index]?.date
                                                                        )}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={3}>
                                                            <TextField
                                                                fullWidth
                                                                name={`AdvanceAmounts.${index}.method`}
                                                                label="Payment Method"
                                                                value={advance.method}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                helperText={
                                                                    touched.AdvanceAmounts?.[index]?.method && errors.AdvanceAmounts?.[index]?.method
                                                                }
                                                                error={Boolean(
                                                                    touched.AdvanceAmounts?.[index]?.method && errors.AdvanceAmounts?.[index]?.method
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={1}>
                                                            {values.AdvanceAmounts.length > 1 && (
                                                                <IconButton onClick={() => remove(index)} color="error">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                                <Button
                                                    sx={{ mt: 2 }}
                                                    variant="contained"
                                                    color="info"
                                                    onClick={() => push({ amount: "", date: null, method: "" })}
                                                >
                                                    Add Advance Payment
                                                </Button>
                                            </div>
                                        )}
                                    </FieldArray>
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