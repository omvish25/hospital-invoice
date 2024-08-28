'use client'

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PageWrapper from "../../page-wrapper";
import { Addinvoiceipdhandler } from "services/operations/ipdinvoices";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  PatientName: yup.string().required("Patient Name is required!"),
  DoctorName: yup.string().required("Doctor Name is required!"),
  PatientType: yup.string().required("Patient Type is required!"),
  IpdNo: yup.string().required("IPD No is required!"),
  Age: yup.string().required("Age is required!"),
  Sex: yup.string().required("Sex is required!"),
  BillDate: yup.date().required("Bill Date is required!"),
  DoaTime: yup.date().required("DOA Time is required!"),
  DodTime: yup.date().required("DOD Time is required!"),
  WardName: yup.string().required("Ward Name is required!"),
  services: yup.array().of(
    yup.object().shape({
      serviceName: yup.string().required("Service Name is required!"),
      servicePrice: yup.string().required("Service Price is required!"),
      serviceQty: yup.string().required("Service Quantity is required!"),
      serviceTotal: yup.string().required("Service Total is required!"),
    })
  ),
  TotalBillAmount: yup.string().required("Total Bill Amount is required!"),
  ConsAmount: yup.string().required("Cons Amount is required!"),
  NetPayAmount: yup.string().required("Net Pay Amount is required!"),
  PaidAmount: yup.string().required("Paid Amount is required!"),
  DueAmount: yup.string().required("Due Amount is required!"),
  status: yup.string().required("Status is required!"),
  AdvanceAmount: yup.string(),
  AdvanceBalAmount: yup.string(),
  AdvanceRefundAmount: yup.string(),
  PaymentDetails: yup.array().of(
    yup.object().shape({
      PaymentType: yup.string().required("Payment Type is required!"),
      PaymentAmount: yup.string().required("Payment Amount is required!"),
    })
  ),
});

export default function IpdForm() {
  const INITIAL_VALUES = {
    PatientName: "",
    DoctorName: "",
    PatientType: "",
    IpdNo: "",
    Age: "",
    Sex: "",
    BillDate: null,
    DoaTime: null,
    DodTime: null,
    WardName: "",
    services: [{ serviceName: "", servicePrice: "", serviceQty: "", serviceTotal: "" }],
    TotalBillAmount: "",
    ConsAmount: "",
    NetPayAmount: "",
    PaidAmount: "",
    DueAmount: "",
    status: "",
    AdvanceAmount: "",
    AdvanceBalAmount: "",
    AdvanceRefundAmount: "",
    PaymentDetails: [{ PaymentType: "", PaymentAmount: "" }],
  };

  const calculateTotalBillAmount = (services) => {
    const total = services.reduce((sum, service) => sum + parseFloat(service.serviceTotal || 0), 0);
    return total.toFixed(2);
  };

  const handleFormSubmit = async (values) => {
    await Addinvoiceipdhandler(values);
  };

  return (
    <PageWrapper title="Create IPD Invoice">
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
          }) => {
            const handleServiceChange = (e, index) => {
              const { name, value } = e.target;
              setFieldValue(`services.${index}.${name.split('.').pop()}`, value);

              // Calculate serviceTotal if servicePrice or serviceQty changes
              const servicePrice = name.includes("servicePrice")
                ? parseFloat(value) || 0
                : parseFloat(values.services[index].servicePrice) || 0;
              const serviceQty = name.includes("serviceQty")
                ? parseFloat(value) || 0
                : parseFloat(values.services[index].serviceQty) || 0;

              const newServiceTotal = (servicePrice * serviceQty).toFixed(2);
              setFieldValue(`services.${index}.serviceTotal`, newServiceTotal);

              // Update the total bill amount
              const updatedServices = values.services.map((service, i) =>
                i === index
                  ? { ...service, [name.split('.').pop()]: value, serviceTotal: newServiceTotal }
                  : service
              );
              setFieldValue("TotalBillAmount", calculateTotalBillAmount(updatedServices));
            };

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="PatientType"
                      label="Patient Type"
                      color="info"
                      size="medium"
                      placeholder="Patient Type"
                      value={values.PatientType}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.PatientType && errors.PatientType}
                      error={Boolean(touched.PatientType && errors.PatientType)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="IpdNo"
                      label="IPD No"
                      color="info"
                      size="medium"
                      placeholder="IPD No"
                      value={values.IpdNo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.IpdNo && errors.IpdNo}
                      error={Boolean(touched.IpdNo && errors.IpdNo)}
                    />
                  </Grid>
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
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Bill Date"
                      sx={{ width: "100%" }}
                      value={values.BillDate}
                      onChange={(value) => setFieldValue("BillDate", value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          color="info"
                          size="medium"
                          error={Boolean(touched.BillDate && errors.BillDate)}
                          helperText={touched.BillDate && errors.BillDate}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="DOA Time"
                      value={values.DoaTime}
                      onChange={(value) => setFieldValue("DoaTime", value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          color="info"
                          size="medium"
                          error={Boolean(touched.DoaTime && errors.DoaTime)}
                          helperText={touched.DoaTime && errors.DoaTime}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="DOD Time"
                      sx={{ width: "100%", height: "150%" }}
                      value={values.DodTime}
                      onChange={(value) => setFieldValue("DodTime", value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          color="info"
                          size="medium"
                          error={Boolean(touched.DodTime && errors.DodTime)}
                          helperText={touched.DodTime && errors.DodTime}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="WardName"
                      label="Ward Name"
                      color="info"
                      size="medium"
                      placeholder="Ward Name"
                      value={values.WardName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.WardName && errors.WardName}
                      error={Boolean(touched.WardName && errors.WardName)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="services"
                      render={(arrayHelpers) => (
                        <div>
                          {values.services.map((service, index) => (
                            <Grid container spacing={3} key={index} alignItems="center">
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
                                  helperText={touched.services?.[index]?.serviceName && errors.services?.[index]?.serviceName}
                                  error={Boolean(touched.services?.[index]?.serviceName && errors.services?.[index]?.serviceName)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <TextField
                                  fullWidth
                                  name={`services.${index}.servicePrice`}
                                  label="Service Price"
                                  color="info"
                                  size="medium"
                                  placeholder="Service Price"
                                  value={service.servicePrice}
                                  onBlur={handleBlur}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  helperText={touched.services?.[index]?.servicePrice && errors.services?.[index]?.servicePrice}
                                  error={Boolean(touched.services?.[index]?.servicePrice && errors.services?.[index]?.servicePrice)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <TextField
                                  fullWidth
                                  name={`services.${index}.serviceQty`}
                                  label="Service Quantity"
                                  color="info"
                                  size="medium"
                                  placeholder="Service Quantity"
                                  value={service.serviceQty}
                                  onBlur={handleBlur}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  helperText={touched.services?.[index]?.serviceQty && errors.services?.[index]?.serviceQty}
                                  error={Boolean(touched.services?.[index]?.serviceQty && errors.services?.[index]?.serviceQty)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <TextField
                                  fullWidth
                                  name={`services.${index}.serviceTotal`}
                                  label="Service Total"
                                  color="info"
                                  size="medium"
                                  placeholder="Service Total"
                                  value={service.serviceTotal}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.services?.[index]?.serviceTotal && errors.services?.[index]?.serviceTotal}
                                  error={Boolean(touched.services?.[index]?.serviceTotal && errors.services?.[index]?.serviceTotal)}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                {values.services.length > 1 && (
                                  <IconButton
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      const updatedServices = values.services.filter((_, i) => i !== index);
                                      setFieldValue("TotalBillAmount", calculateTotalBillAmount(updatedServices));
                                    }}
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
                            onClick={() => {
                              arrayHelpers.push({
                                serviceName: "",
                                servicePrice: "",
                                serviceQty: "",
                                serviceTotal: "",
                              });
                            }}
                          >
                            Add Service
                          </Button>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="TotalBillAmount"
                      label="Total Bill Amount"
                      color="info"
                      size="medium"
                      placeholder="Total Bill Amount"
                      value={values.TotalBillAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.TotalBillAmount && errors.TotalBillAmount}
                      error={Boolean(touched.TotalBillAmount && errors.TotalBillAmount)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="ConsAmount"
                      label="Cons Amount"
                      color="info"
                      size="medium"
                      placeholder="Cons Amount"
                      value={values.ConsAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.ConsAmount && errors.ConsAmount}
                      error={Boolean(touched.ConsAmount && errors.ConsAmount)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="NetPayAmount"
                      label="Net Pay Amount"
                      color="info"
                      size="medium"
                      placeholder="Net Pay Amount"
                      value={values.NetPayAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.NetPayAmount && errors.NetPayAmount}
                      error={Boolean(touched.NetPayAmount && errors.NetPayAmount)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="PaidAmount"
                      label="Paid Amount"
                      color="info"
                      size="medium"
                      placeholder="Paid Amount"
                      value={values.PaidAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.PaidAmount && errors.PaidAmount}
                      error={Boolean(touched.PaidAmount && errors.PaidAmount)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="DueAmount"
                      label="Due Amount"
                      color="info"
                      size="medium"
                      placeholder="Due Amount"
                      value={values.DueAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.DueAmount && errors.DueAmount}
                      error={Boolean(touched.DueAmount && errors.DueAmount)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="status"
                      label="Status"
                      color="info"
                      size="medium"
                      placeholder="Status"
                      value={values.status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.status && errors.status}
                      error={Boolean(touched.status && errors.status)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="PaymentDetails"
                      render={(arrayHelpers) => (
                        <div>
                          {values.PaymentDetails.map((payment, index) => (
                            <Grid container spacing={3} key={index} alignItems="center">
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
                              <Grid item xs={12} sm={5}>
                                <TextField
                                  fullWidth
                                  name={`PaymentDetails.${index}.PaymentAmount`}
                                  label="Payment Amount"
                                  color="info"
                                  size="medium"
                                  placeholder="Payment Amount"
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="AdvanceAmount"
                      label="Advance Amount"
                      color="info"
                      size="medium"
                      placeholder="Advance Amount"
                      value={values.AdvanceAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={
                        touched.AdvanceAmount && errors.AdvanceAmount
                      }
                      error={Boolean(
                        touched.AdvanceAmount && errors.AdvanceAmount
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="AdvanceBalAmount"
                      label="Advance Balance Amount"
                      color="info"
                      size="medium"
                      placeholder="Advance Balance Amount"
                      value={values.AdvanceBalAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={
                        touched.AdvanceBalAmount && errors.AdvanceBalAmount
                      }
                      error={Boolean(
                        touched.AdvanceBalAmount && errors.AdvanceBalAmount
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="AdvanceRefundAmount"
                      label="Advance Refund Amount"
                      color="info"
                      size="medium"
                      placeholder="Advance Refund Amount"
                      value={values.AdvanceRefundAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={
                        touched.AdvanceRefundAmount && errors.AdvanceRefundAmount
                      }
                      error={Boolean(
                        touched.AdvanceRefundAmount && errors.AdvanceRefundAmount
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="info" type="submit">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Card>
    </PageWrapper>
  );
}
