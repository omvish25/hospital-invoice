import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        return formattedDate;
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indoor Case Paper</title>
     <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            width: 100%;
            max-width: 1500px;
            margin: auto;
            border: 1px solid #000;
            padding: 20px;
        }
            </style>
</head>
<body >
 <div class="container">
    <div style=" padding-left: 5rem; padding-right: 5rem;">
    <div style="text-align: center;  padding-bottom: 10px;">
        <h2 style="margin: 0;">OM MULTISPECIALITY HOSPITAL</h2>
        <p style="margin: 5px 0;">New Arogya Nagar, Omerga, Dist- Osmanabad Pin- 413606</p>
        <p style="margin: 5px 0;">Call: 06009460096</p>
    </div>
    <div style="border: 1px solid black; height: 50px; margin-bottom: 20px; background-color: gray;">
        <p style="text-align: center; font-weight: 800;   ">INDOOR CASE PAPER</p>

    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="width: 100%;">
            <td style="padding: 5px; "><strong>MR. No</strong> </td>
            <td style="padding: 5px;">: ${MrNo}</td>
            <td style="padding: 5px; "><strong>Gender</strong> </td>
            <td style="padding: 5px;"> : ${caseData.Sex}</td>
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Patient Name</strong> </td>
            <td style="padding: 5px;">: ${caseData.PatientName}</td>
            <td style="padding: 5px;"><strong>Marital Status</strong> </td>
            <td style="padding: 5px;"> : ${caseData.MaritialStatus}</td>
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Age</strong> </td>
            <td style="padding: 5px;"> : ${caseData.Age}</td>
           
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Address</strong></td>
            <td style="padding: 5px;"> : ${caseData.Address}</td>
         
           
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Mobile No</strong></td>
            <td style="padding: 5px;">${caseData.MobileNo} </td>
            <td style="padding: 5px;"><strong>MLC No</strong></td>
            <td style="padding: 5px;"> ${caseData.MlcNo} </td>
           
          
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Phone No</strong></td>
            <td style="padding: 5px;">: ${caseData.PhoneNumber}</td>
            <td style="padding: 5px;"><strong>Admission Time</strong></td>
            <td style="padding: 5px;"> : ${new Date(caseData.AdmissionTime).toLocaleDateString('en-CA')}</td>
        
           
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Admission Date</strong></td>
            <td style="padding: 5px;"> :${new Date(AdmissionDate).toLocaleDateString('en-CA')}</td>
            <td style="padding: 5px;"><strong>Department Name</strong> </td>
            <td style="padding: 5px;"> : ${caseData.DepartmentName}</td>
           
           
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>IP No</strong></td>
            <td style="padding: 5px;">: ${caseData.IpNo}</td>
            <td style="padding: 5px;"><strong>Company Name</strong>  </td>
            <td style="padding: 5px;"> :${caseData.CompanyName} </td>
          
         
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Doctor Name</strong></td>
            <td style="padding: 5px;"> : ${caseData.DoctorName}</td>
            <td style="padding: 5px;"><strong>Tariff Name</strong> </td>
            <td style="padding: 5px;"> : ${caseData.TariffName}</td>
          
          
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Doctor Name 2</strong> </td>
            <td style="padding: 5px;"> :${caseData.SecondDoctorName} </td>
            <td style="padding: 5px;"><strong>Bed Name</strong> </td>
            <td style="padding: 5px;"> : ${caseData.BedName} 1</td>
            
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Doctor Name 3</strong>  </td>
            <td style="padding: 5px;">:${caseData.ThirdDoctorName} </td>
            <td style="padding: 5px;"><strong>Relationship Name</strong> </td>
            <td style="padding: 5px;"> :${caseData.RelationName}</td>
          
         
          
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Refd. Doctor Name</strong> </td>
            <td style="padding: 5px;"> : ${caseData.RefDoctorName }</td>
            <td style="padding: 5px;"><strong>Relative Phone No</strong> </td>
            <td style="padding: 5px;"> : ${caseData.RelationPhoneNoo}</td>
          
       
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Relative Name</strong> </td>
            <td style="padding: 5px;"> :${caseData.RelationName} </td>
            <td style="padding: 5px;"><strong>Relative Address</strong> </td>
            <td style="padding: 5px;"> : ${caseData.RelationAddress}</td>
         
          
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Patient Category</strong> </td>
            <td style="padding: 5px;"> : ${caseData.PatientCategory}</td>
            <td style="padding: 5px;"><strong></strong> </td>
            <td style="padding: 5px;"></td>
           
          
        </tr>
        <tr>
            <td style="padding: 5px;"><strong>Is Reimbursement</strong> </td>
      <td style="padding: 5px;"> : ${caseData.isReimbursement }</td>
      <td style="padding: 5px;"></td>
      <td style="padding: 5px;"></td>
        </tr>

    </table>

    <p style="font-size: 14px;">
        I hereby give consent for the hospitalization of me/my <strong>uncle</strong>. I have been explained 
        about the nature of the illness and the need for hospitalization in a language easily understood by me. I hereby give consent for 
        the necessary investigations and procedures as may be found necessary during the hospital stay. The consent being given after 
        full knowledge of the nature of the illness. I/we agree to abide by the schedule of charges and rules and regulations of the 
        hospital.
    </p>

    <div style="margin-top: 50px;">
        <p style="font-size: 14px;">
            Left thumb Impression of patient <span style="float: right;">Signature/left thumb Impression of patient</span>
        </p>
        <p style="font-size: 14px; margin-top: 50px;">
            Patients are requested to deposit their ornaments, jewellery and money with their relatives, hospital will not be responsible for 
            any loss incurred.
        </p>
        <p style="font-size: 14px; text-align: right;">On Admission</p>
    </div>
</div>
 </div>
</body>
</html>

`;

        // Create a temporary DOM element to hold the HTML content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        // Use html2canvas to convert the HTML to a canvas
        html2canvas(tempDiv).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 0, 0, 210, 297);
            doc.save(`hospital-casepaper-${MrNo}.pdf`);
            document.body.removeChild(tempDiv);
        });
    };
    const [casePublish, setCasePublish] = useState(published);

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{MrNo}</StyledTableCell>
            <StyledTableCell align="left">{PatientName}</StyledTableCell>
            <StyledTableCell align="left">{DoctorName}</StyledTableCell>
            <StyledTableCell align="left">{CompanyName}</StyledTableCell>
            <StyledTableCell align="left">
                {new Date(AdmissionDate).toLocaleDateString('en-CA')}  {/* 'en-CA' for YYYY-MM-DD format */}
            </StyledTableCell>


            <StyledTableCell align="center">
                <StyledIconButton onClick={() => router.push(`/admin/categories/${id}`)}>
                    <Edit />
                </StyledIconButton>

                <StyledIconButton onClick={handleDownloadPdf}>
                    <RemoveRedEye />
                </StyledIconButton>

                <StyledIconButton>
                    <Delete />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}