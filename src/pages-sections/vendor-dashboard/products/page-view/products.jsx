"use client";

import { useState,useEffect } from "react";
import { apiConnector } from "services/apiConnector";
import { IndoorBillsEndpoints } from "services/apis";
const { GETINDOORBILL_API, GETSEARCHIPDBILLS_API } = IndoorBillsEndpoints;
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

import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper"; 
// CUSTOM DATA MODEL


// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "BillNo",
  label: "Bill No",
  align: "left"
}, {
  id: "MrNo",
  label: "Mr No",
  align: "left"
}, {
  id: "PatientName",
  label: "Patient Name",
  align: "left"
}, {
  id: "DoctorName",
  label: "Doctor Name",
  align: "left"
}, {
  id: "TotalBillAmount",
  label: "Total Bill Amount",
  align: "left"
}, {
  id: "action",
  label: "Action",
  align: "center"
}]; 
// =============================================================================


// =============================================================================
export default function ProductsPageView({
  products
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
      `${GETINDOORBILL_API}?page=${currentPage}`
    );
    setAllInvoiceList(response?.data?.ipdBills);
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
      `${GETSEARCHIPDBILLS_API}?search=${searchQuery}`
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

  const filteredProducts = allInvoiceList.map(item => ({
    id: item._id,
    BillNo: item.BillNo,
    MrNo: item.MrNo,
    PatientName: item.PatientName,
    DoctorName: item.DoctorName,
    PatientType: item.PatientType,
    IpdNo: item.IpdNo,
    Age: item.Age,
    Sex: item.Sex,
    BillDate: item.BillDate,
    DoaTime: item.DoaTime,
    DodTime: item.DodTime,
    WardName: item.WardName,
    services: item.services,
    TotalBillAmount: item.TotalBillAmount,
    ConsAmount: item.ConsAmount,
    NetPayAmount: item.NetPayAmount,
    PaidAmount: item.PaidAmount,
    DueAmount: item.DueAmount,
    status: item.status,
    AdvanceAmount: item.AdvanceAmount,
    AdvanceBalAmount: item.AdvanceBalAmount,
    AdvanceRefundAmount: item.AdvanceRefundAmount,
    PaymentDetails: item.PaymentDetails
  
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
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={products.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((product, index) => <ProductRow key={index} product={product} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination  onChange={handleChangePage}
            count={totalPages}
            page={currentPage - 0} />
        </Stack>
      </Card>
    </PageWrapper>;
}