"use client";

import { useState, useEffect } from "react";
import { apiConnector } from "services/apiConnector";
import { IpdCaseEndpoints } from "services/apis";
const { GETIPDCASE_API, GETSEARCHIPDCASE_API } = IpdCaseEndpoints;
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useRouter, useSearchParams } from "next/navigation";
// GLOBAL CUSTOM COMPONENTS
import useMediaQuery from "@mui/material/useMediaQuery";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Link from "next/link";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable";
//  LOCAL CUSTOM COMPONENT

import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL


// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "MrNo", label: "MR No", align: "left" },
  { id: "PatientName", label: "Patient Name", align: "left" },
  { id: "DoctorName", label: "Doctor Name", align: "left" },
  { id: "CompanyName", label: "Company Name", align: "left" },
  { id: "AdmissionDate", label: "Admission Date", align: "left" },
  { id: "action", label: "Action", align: "center" }
]; 
// =============================================================================


// =============================================================================
export default function CategoriesPageView({
  categories
}) {
  const [invoiceList, setInvoiceList] = useState([]);
  const [allInvoiceList, setAllInvoiceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchPaginationProducts = async () => {
    const currentPage = page || 1;
    const response = await apiConnector(
      "GET",
      `${GETIPDCASE_API}?page=${currentPage}`
    );
    setAllInvoiceList(response?.data?.data);
    setCurrentPage(response?.data?.currentPage);
    setTotalPages(response?.data?.totalPages);
  };
  useEffect(() => {

    fetchPaginationProducts();
  }, [page]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchPaginationProducts();
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    const response = await apiConnector(
      "GET",
      `${GETSEARCHIPDCASE_API}?search=${searchQuery}`
    );
    setAllInvoiceList(response?.data?.results);
  };
  const handleChangePage = (event, newPage) => {
    const parsedPage = parseInt(newPage, 10);

    if (!isNaN(parsedPage) && parsedPage > 0) {
      router.push(`?page=${parsedPage}`);
    } else {
      console.error("Invalid page value:", newPage);
      router.push(`?page=1`);
    }
  };

  const filteredProducts = allInvoiceList?.map(item => ({
    id: item._id,
    MrNo: item.MrNo,
    PatientName: item.PatientName,
    Age: item.Age,
    Sex: item.Sex,
    MaritialStatus: item.MaritialStatus,
    Address: item.Address,
    MobileNo: item.MobileNo,
    PhoneNumber: item.PhoneNumber,
    AdmissionDate: item.AdmissionDate,
    IpNo: item.IpNo,
    DoctorName: item.DoctorName,
    SecondDoctorName: item.SecondDoctorName,
    ThirdDoctorName: item.ThirdDoctorName,
    RefDoctorName: item.RefDoctorName,
    RelativeName: item.RelativeName,
    PatientCategory: item.PatientCategory,
    isReimbursement: item.isReimbursement,
    MlcNo: item.MlcNo,
    AdmissionTime: item.AdmissionTime,
    DepartmentName: item.DepartmentName,
    CompanyName: item.CompanyName,
    TariffName: item.TariffName,
    BedName: item.BedName,
    RelationName: item.RelationName,
    RelationPhoneNoo: item.RelationPhoneNoo,
    RelationAddress: item.RelationAddress,
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleRequestSort
  } = useMuiTable({
    listData: filteredProducts
  });

  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return <PageWrapper title="IPD Bill List">
    <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
      <SearchInput
        placeholder="Search Invoices..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button
        href="/admin/products/create"
        color="info"
        fullWidth={downSM}
        variant="contained"
        startIcon={<Add />}
        LinkComponent={Link}
        sx={{
          minHeight: 44,
        }}
      >
        Add IPD Bill
      </Button>
    </FlexBox>
    <Card>
      <Scrollbar autoHide={false}>
        <TableContainer sx={{
          minWidth: 900
        }}>
          <Table>
            <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={categories.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

            <TableBody>
              {filteredList.map((caseData, index) => <CategoryRow key={index} caseData={caseData} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Stack alignItems="center" my={4}>
        <TablePagination onChange={handleChangePage}
          count={totalPages}
          page={currentPage - 0} />
      </Stack>
    </Card>
  </PageWrapper>;
}