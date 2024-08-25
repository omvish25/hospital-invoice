import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib";
// STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles";
// ========================================================================


// ========================================================================
export default function ProductRow({
  product
}) {
  const {
    BillNo,
    MrNo,
    PatientName,
    DoctorName,
    TotalBillAmount,
    id,
    published,
    slug
  } = product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);
  return <StyledTableRow tabIndex={-1} role="checkbox">
    <StyledTableCell align="left">


      {BillNo}


    </StyledTableCell>

    <StyledTableCell align="left">
      {MrNo}
    </StyledTableCell>

    <StyledTableCell align="left">
{PatientName}
    </StyledTableCell>

    <StyledTableCell align="left">{DoctorName}</StyledTableCell>

    <StyledTableCell align="left">
    {TotalBillAmount}
    </StyledTableCell>

    <StyledTableCell align="center">
      <StyledIconButton onClick={() => router.push(`/admin/products/${id}`)}>
        <Edit />
      </StyledIconButton>

      <StyledIconButton>
        <RemoveRedEye />
      </StyledIconButton>

      <StyledIconButton>
        <Delete />
      </StyledIconButton>
    </StyledTableCell>
  </StyledTableRow>;
}