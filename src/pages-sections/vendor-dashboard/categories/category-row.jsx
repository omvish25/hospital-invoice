import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch";
// STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles";
// ========================================================================


// ========================================================================
export default function CategoryRow({ caseData }) {
  console.log("caseData", caseData);
  const {
    MrNo,
    PatientName,
    DoctorName,
    CompanyName,
    AdmissionDate,
    id,
    published,
    slug
  } = caseData || {};

  const router = useRouter();
  const [casePublish, setCasePublish] = useState(published);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">{MrNo}</StyledTableCell>
      <StyledTableCell align="left">{PatientName}</StyledTableCell>
      <StyledTableCell align="left">{DoctorName}</StyledTableCell>
      <StyledTableCell align="left">{CompanyName}</StyledTableCell>
      <StyledTableCell align="left">{AdmissionDate}</StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/ipdcase/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}