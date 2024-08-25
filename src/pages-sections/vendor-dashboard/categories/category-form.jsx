"use client";

import { useState } from "react";
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
import { Addinvoiceipdhandler } from "services/operations/ipocaseinvoices";


const VALIDATION_SCHEMA = yup.object().shape({
  CaseNo: yup.string().required("Case No is required!"),
  MrNo: yup.string().required("MR No is required!"),
  PatientName: yup.string().required("Patient Name is required!"),
  Age: yup.number().required("Age is required!").positive().integer(),
  Sex: yup.string().required("Sex is required!"),
  MaritalStatus: yup.string().required("Marital Status is required!"),
  Address: yup.string().required("Address is required!"),
  ContactNumber: yup.string().required("Contact Number is required!"),
  Email: yup.string().email("Invalid email format").required("Email is required!"),
  CompanyName: yup.string().required("Company Name is required!"),
  AdmissionDate: yup.date().required("Admission Date is required!"),
  AdmissionTime: yup.date().required("Admission Time is required!"),
  DischargeDate: yup.date().nullable(),
  DischargeTime: yup.date().nullable(),
  Department: yup.string().required("Department is required!"),
  BedName: yup.string().required("Bed Name is required!"),
  DoctorName: yup.string().required("Doctor Name is required!"),
  RefDoctorName: yup.string(),
  Diagnosis: yup.string().required("Diagnosis is required!"),
  Treatment: yup.string().required("Treatment is required!"),
  services: yup.array().of(
    yup.object().shape({
      serviceName: yup.string().required("Service Name is required!"),
      servicePrice: yup.number().required("Service Price is required!").positive(),
      serviceQty: yup.number().required("Service Quantity is required!").positive().integer(),
      serviceTotal: yup.number().required("Service Total is required!").positive(),
    })
  ),
  Status: yup.string().required("Status is required!"),
  PaymentDetails: yup.array().of(
    yup.object().shape({
      PaymentType: yup.string().required("Payment Type is required!"),
      PaymentAmount: yup.number().required("Payment Amount is required!").positive(),
    })
  ),
});


// ================================================================
export default function CategoryForm(props) {
  const INITIAL_VALUES = {
    CaseNo: "",
    MrNo: "",
    PatientName: "",
    Age: "",
    Sex: "",
    MaritalStatus: "",
    Address: "",
    ContactNumber: "",
    Email: "",
    CompanyName: "",
    AdmissionDate: null,
    AdmissionTime: null,
    DischargeDate: null,
    DischargeTime: null,
    Department: "",
    BedName: "",
    DoctorName: "",
    RefDoctorName: "",
    Diagnosis: "",
    Treatment: "",
    services: [{ serviceName: "", servicePrice: "", serviceQty: "", serviceTotal: "" }],
    Status: "",
    PaymentDetails: [{ PaymentType: "", PaymentAmount: "" }],
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    await Addinvoiceipdhandler(values);
    // Implement form submission logic here (e.g., API call)
  };

  return (
    <PageWrapper title="Create IpdCase">
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
                {/* Case Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="CaseNo"
                    label="Case No"
                    color="info"
                    size="medium"
                    placeholder="Case No"
                    value={values.CaseNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.CaseNo && errors.CaseNo}
                    error={Boolean(touched.CaseNo && errors.CaseNo)}
                  />
                </Grid>

                {/* MR Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="MrNo"
                    label="MR No"
                    color="info"
                    size="medium"
                    placeholder="MR No"
                    value={values.MrNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.MrNo && errors.MrNo}
                    error={Boolean(touched.MrNo && errors.MrNo)}
                  />
                </Grid>

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
                    type="number"
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
                    name="MaritalStatus"
                    label="Marital Status"
                    color="info"
                    size="medium"
                    placeholder="Marital Status"
                    value={values.MaritalStatus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.MaritalStatus && errors.MaritalStatus}
                    error={Boolean(touched.MaritalStatus && errors.MaritalStatus)}
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

                {/* Contact Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="ContactNumber"
                    label="Contact Number"
                    color="info"
                    size="medium"
                    placeholder="Contact Number"
                    value={values.ContactNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.ContactNumber && errors.ContactNumber}
                    error={Boolean(touched.ContactNumber && errors.ContactNumber)}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="Email"
                    label="Email"
                    color="info"
                    size="medium"
                    placeholder="Email"
                    type="email"
                    value={values.Email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.Email && errors.Email}
                    error={Boolean(touched.Email && errors.Email)}
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

                {/* Admission Date */}
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Admission Date"
                    sx={{ width: "100%" }}
                    value={values.AdmissionDate}
                    onChange={(value) => setFieldValue("AdmissionDate", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        color="info"
                        size="medium"
                        error={Boolean(touched.AdmissionDate && errors.AdmissionDate)}
                        helperText={touched.AdmissionDate && errors.AdmissionDate}
                      />
                    )}
                  />
                </Grid>

                {/* Admission Time */}
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Admission Time"
                    sx={{ width: "100%" }}
                    value={values.AdmissionTime}
                    onChange={(value) => setFieldValue("AdmissionTime", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        color="info"
                        size="medium"
                        error={Boolean(touched.AdmissionTime && errors.AdmissionTime)}
                        helperText={touched.AdmissionTime && errors.AdmissionTime}
                      />
                    )}
                  />
                </Grid>

                {/* Discharge Date */}
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Discharge Date"
                    sx={{ width: "100%" }}
                    value={values.DischargeDate}
                    onChange={(value) => setFieldValue("DischargeDate", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        color="info"
                        size="medium"
                        error={Boolean(touched.DischargeDate && errors.DischargeDate)}
                        helperText={touched.DischargeDate && errors.DischargeDate}
                      />
                    )}
                  />
                </Grid>

                {/* Discharge Time */}
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Discharge Time"
                    sx={{ width: "100%" }}
                    value={values.DischargeTime}
                    onChange={(value) => setFieldValue("DischargeTime", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        color="info"
                        size="medium"
                        error={Boolean(touched.DischargeTime && errors.DischargeTime)}
                        helperText={touched.DischargeTime && errors.DischargeTime}
                      />
                    )}
                  />
                </Grid>

                {/* Department */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="Department"
                    label="Department"
                    color="info"
                    size="medium"
                    placeholder="Department"
                    value={values.Department}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.Department && errors.Department}
                    error={Boolean(touched.Department && errors.Department)}
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

                {/* Reference Doctor Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="RefDoctorName"
                    label="Reference Doctor Name"
                    color="info"
                    size="medium"
                    placeholder="Reference Doctor Name"
                    value={values.RefDoctorName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.RefDoctorName && errors.RefDoctorName}
                    error={Boolean(touched.RefDoctorName && errors.RefDoctorName)}
                  />
                </Grid>

                {/* Diagnosis */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Diagnosis"
                    label="Diagnosis"
                    color="info"
                    size="medium"
                    placeholder="Diagnosis"
                    multiline
                    rows={4}
                    value={values.Diagnosis}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.Diagnosis && errors.Diagnosis}
                    error={Boolean(touched.Diagnosis && errors.Diagnosis)}
                  />
                </Grid>

                {/* Treatment */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Treatment"
                    label="Treatment"
                    color="info"
                    size="medium"
                    placeholder="Treatment"
                    multiline
                    rows={4}
                    value={values.Treatment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.Treatment && errors.Treatment}
                    error={Boolean(touched.Treatment && errors.Treatment)}
                  />
                </Grid>

                {/* Services */}
                <Grid item xs={12}>
                  <FieldArray
                    name="services"
                    render={(arrayHelpers) => (
                      <div>
                        <h4>Services</h4>
                        {values.services.map((service, index) => (
                          <Grid container spacing={3} key={index} alignItems="center">
                            {/* Service Name */}
                            <Grid item xs={12} sm={3}>
                              <TextField
                                fullWidth
                                name={`services.${index}.serviceName`}
                                label="Service Name"
                                color="info"
                                size="medium"
                                placeholder="Service Name"
                                value={service.serviceName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.services?.[index]?.serviceName &&
                                  errors.services?.[index]?.serviceName
                                }
                                error={Boolean(
                                  touched.services?.[index]?.serviceName &&
                                  errors.services?.[index]?.serviceName
                                )}
                              />
                            </Grid>

                            {/* Service Price */}
                            <Grid item xs={12} sm={3}>
                              <TextField
                                fullWidth
                                name={`services.${index}.servicePrice`}
                                label="Service Price"
                                color="info"
                                size="medium"
                                placeholder="Service Price"
                                type="number"
                                value={service.servicePrice}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.services?.[index]?.servicePrice &&
                                  errors.services?.[index]?.servicePrice
                                }
                                error={Boolean(
                                  touched.services?.[index]?.servicePrice &&
                                  errors.services?.[index]?.servicePrice
                                )}
                              />
                            </Grid>

                            {/* Service Quantity */}
                            <Grid item xs={12} sm={3}>
                              <TextField
                                fullWidth
                                name={`services.${index}.serviceQty`}
                                label="Service Quantity"
                                color="info"
                                size="medium"
                                placeholder="Service Quantity"
                                type="number"
                                value={service.serviceQty}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.services?.[index]?.serviceQty &&
                                  errors.services?.[index]?.serviceQty
                                }
                                error={Boolean(
                                  touched.services?.[index]?.serviceQty &&
                                  errors.services?.[index]?.serviceQty
                                )}
                              />
                            </Grid>

                            {/* Service Total */}
                            <Grid item xs={12} sm={3}>
                              <TextField
                                fullWidth
                                name={`services.${index}.serviceTotal`}
                                label="Service Total"
                                color="info"
                                size="medium"
                                placeholder="Service Total"
                                type="number"
                                value={service.serviceTotal}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.services?.[index]?.serviceTotal &&
                                  errors.services?.[index]?.serviceTotal
                                }
                                error={Boolean(
                                  touched.services?.[index]?.serviceTotal &&
                                  errors.services?.[index]?.serviceTotal
                                )}
                              />
                            </Grid>

                            {/* Delete Service Button */}
                            <Grid item xs={12} sm={1}>
                              {values.services.length > 1 && (
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                  color="error"
                                >
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
                          onClick={() =>
                            arrayHelpers.push({
                              serviceName: "",
                              servicePrice: "",
                              serviceQty: "",
                              serviceTotal: "",
                            })
                          }
                        >
                          Add Service
                        </Button>
                      </div>
                    )}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="Status"
                    label="Status"
                    color="info"
                    size="medium"
                    placeholder="Status"
                    value={values.Status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.Status && errors.Status}
                    error={Boolean(touched.Status && errors.Status)}
                  />
                </Grid>

                {/* Payment Details */}
                <Grid item xs={12}>
                  <FieldArray
                    name="PaymentDetails"
                    render={(arrayHelpers) => (
                      <div>
                        <h4>Payment Details</h4>
                        {values.PaymentDetails.map((payment, index) => (
                          <Grid container spacing={3} key={index} alignItems="center">
                            {/* Payment Type */}
                            <Grid item xs={12} sm={5}>
                              <TextField
                                fullWidth
                                name={`PaymentDetails.${index}.PaymentType`}
                                label="Payment Type"
                                color="info"
                                size="medium"
                                placeholder="Payment Type"
                                value={payment.PaymentType}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.PaymentDetails?.[index]?.PaymentType &&
                                  errors.PaymentDetails?.[index]?.PaymentType
                                }
                                error={Boolean(
                                  touched.PaymentDetails?.[index]?.PaymentType &&
                                  errors.PaymentDetails?.[index]?.PaymentType
                                )}
                              />
                            </Grid>

                            {/* Payment Amount */}
                            <Grid item xs={12} sm={5}>
                              <TextField
                                fullWidth
                                name={`PaymentDetails.${index}.PaymentAmount`}
                                label="Payment Amount"
                                color="info"
                                size="medium"
                                placeholder="Payment Amount"
                                type="number"
                                value={payment.PaymentAmount}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.PaymentDetails?.[index]?.PaymentAmount &&
                                  errors.PaymentDetails?.[index]?.PaymentAmount
                                }
                                error={Boolean(
                                  touched.PaymentDetails?.[index]?.PaymentAmount &&
                                  errors.PaymentDetails?.[index]?.PaymentAmount
                                )}
                              />
                            </Grid>

                            {/* Delete Payment Button */}
                            <Grid item xs={12} sm={2}>
                              {values.PaymentDetails.length > 1 && (
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                  color="error"
                                >
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
                          onClick={() =>
                            arrayHelpers.push({
                              PaymentType: "",
                              PaymentAmount: "",
                            })
                          }
                        >
                          Add Payment
                        </Button>
                      </div>
                    )}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button variant="contained" color="info" type="submit">
                    Save
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