import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import AddCardIcon from '@mui/icons-material/AddCard';
import { apiConnector } from "services/apiConnector";
import { IpdCaseEndpoints } from "services/apis";
const { DELETEIPDCASE_API, GETSEARCHIPDCASE_API } = IpdCaseEndpoints;
// GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch";
// STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles";
// ========================================================================


// ========================================================================
export default function CategoryRow({ caseData }) {
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


    const handleAdvanceDownloadPdf = () => {
        const doc = new jsPDF();
        const scale = 2;


        const htmlContent = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hospital Bill</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
             letter-spacing: 1px;
        }
        .container {
            width: 100%;
            max-width: 1300px;
            height: 3,508px;
            margin: auto;
            border: 1px solid #000;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            width: 100px;
            height: auto;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 2px 0;
        }
        .bill-info {
            width: 100%;
            margin-bottom: 20px;
            margin-top: 30px;
           
        }
        .bill-info table {
            width: 100%;
            border-collapse: collapse;
        }
        .bill-info th, .bill-info td {
            text-align: left;
            padding: 4px;
            
        }
        .bill-info th {
            width: 15%;
        }
        .service-details {
            margin-bottom: 20px;
        }
        .service-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .service-details th, .service-details td {
            padding: 8px;
           
            text-align: right;
        }
        .service-details th {
            background-color: #f0f0f0;
        }
        .totals {
            text-align: right;
            margin-top: 20px;
        }
        .totals .total-amount {
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
        }
        .footer .amount-words, .footer .advance-details, .footer .payment-details {
            margin-bottom: 20px;
        }
        .footer .prepared-by, .footer .authorized-by {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin-bottom: 30px; margin-top: 20px;">OM Vishvekar Superspeciality HOSPITAL</h1>
            <p><strong>New Arogya Nagar, Omerga, Dist- Osmanabad Pin- 413606 </strong></p>
            <p> <strong>Call:- 06009460096</strong></p>
           
        </div>
        <div style=" display: flex;  align-items: center; justify-content: end; border-radius: 10px; height: 15px; padding-right: 4rem; margin-top: 40px;">
            <p ><strong>Print Date :</strong>  ${convertToDDMMYYYY(caseData?.CreatedAt)}</p>
        </div>
        <div style=" display: flex; border: 1px solid black; align-items: center; justify-content: center; border-radius: 10px; height: 40px;">
            <p><strong>IP FINAL BILL</strong></p>
        </div>

        <div class="bill-info">
            <table>
                <tr>
                    <th>Mr No:</th>
                    <td>${caseData?.MrNo}</td>
                    <th>Ip No:</th>
                    <td>${caseData?.IpNo}</td>
                    <th>Bill Date:</th>
                    <td>${convertToDDMMYYYY(caseData?.AdmissionDate)}</td>
                </tr>
                <tr>
                    <th>Address:</th>
                    <td>${caseData?.Address}</td>
                    <th>Age / Sex:</th>
                    <td>${caseData?.Age} / ${caseData?.Sex}</td>
                    <th>Bill Time:</th>
                    <td>${convertToIndian12HourTime(caseData?.AdmissionTime)}</td>
                  
                </tr>
             
                <tr>
                    <th>Patient Name:</th>
                    <td>${caseData?.PatientName}</td>
            
                    <th></th>
                    <td></td>
                    <th>Marrital Status:</th>
                    <td>${caseData?.MaritialStatus}</td>
                </tr>
                <tr>
                    <th>Doctor Name:</th>
                    <td>${caseData?.DoctorName}</td>
                   
                    <th></th>
                    <td></td>
                    <th>Bed Name:</th>
                    <td>${caseData?.BedName}</td>
                </tr>
                <tr>
                    <th>Patient Type:</th>
                    <td>${caseData?.PatientCategory}</td>
                </tr>
            </table>
        </div>

       

    
        <div style="display: flex; justify-content: space-between; padding-right: 0.5rem; padding-left: 0.5rem; margin-top: 2rem;">
            <div style="border: 1px solid black;  width: 50%;  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);" class="advance-details">
                <div style="display: flex; justify-content: center;"><p>advance-details</p></div>
                <div style="display: flex; justify-content: center; width: 100%;">
                <table style="width: 100%;">
                    <tbody>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Amt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">${caseData?.AdvanceAmount}</td>
                        </tr>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Bal Amt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">0</td>
                        </tr>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Refund Amt&nbsp;&nbsp; :</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
           




        </div>

       <div style="display: flex; width: 100%; justify-content: space-between; padding: 1rem; margin-top: 5rem;"> 
        <div>

          <p>Prepared-by </p>
          <p>Admin Admin</p>
        
         </div>
        <div style="text-align: center; padding-right: 2rem;">
            <p><strong>Authorized By</strong> </p>
            <p>  OM Vishvekar Superspeciality HOSPITAL</p>
    

        </div>

       </div>
        </div>
    </div>
</body>
</html>

    `;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        const opt = {
            scale: scale,
            useCORS: true,
            logging: true
        };

        html2canvas(tempDiv, {
            scale: 4,  // Increase scale for higher resolution
            useCORS: true,
            logging: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio

            const doc = new jsPDF({
                orientation: imgHeight > 297 ? 'portrait' : 'landscape', // Adjust orientation based on aspect ratio
                unit: 'mm',
                format: [imgWidth, imgHeight], // Dynamic format based on content
            });

            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, 'FAST'); // or 'NONE' for no compression

            doc.save(`hospital-advance-${caseData?.MrNo}.pdf`);

            document.body.removeChild(tempDiv);
        });

    };
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

    function convertToIndian12HourTime(isoDateString) {
        const date = new Date(isoDateString);
    
        // Convert to IST (Indian Standard Time, UTC+5:30)
        const utcOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + utcOffset);
    
        // Extract hours, minutes, and whether it's AM or PM
        let hours = istDate.getUTCHours();
        const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12; // If hour is 0, set it to 12 (midnight or noon)
    
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    function convertToDDMMYYYY(isoDateString) {
        const date = new Date(isoDateString);
    
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getUTCFullYear();
    
        return `${day}:${month}:${year}`;
    }

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
<h2 style="margin: 0;">OM VISHVEKAR SUPERSPECIALITY HOSPITAL</h2>
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
            <td style="padding: 5px;"> : ${caseData.RefDoctorName}</td>
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
      <td style="padding: 5px;"> : ${caseData.isReimbursement}</td>
      <td style="padding: 5px;"></td>
      <td style="padding: 5px;"></td>
        </tr>

    </table>

    <p style="font-size: 14px;">
        I hereby give consent for the hospitalization of me/my <strong>_______________________________________________________________</strong>. I have been explained 
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

        html2canvas(tempDiv, {
            scale: 4,  // Increase scale for higher resolution
            useCORS: true,
            logging: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio

            const doc = new jsPDF({
                orientation: imgHeight > 297 ? 'portrait' : 'landscape', // Adjust orientation based on aspect ratio
                unit: 'mm',
                format: [imgWidth, imgHeight], // Dynamic format based on content
            });

            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, 'FAST'); // or 'NONE' for no compression

            doc.save(`hospital-MrNo-${MrNo}.pdf`);

            document.body.removeChild(tempDiv);
        });
    };
    const [casePublish, setCasePublish] = useState(published);
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Do you want to delete this?");

        if (confirmDelete) {
            try {
                const response = await apiConnector(
                    "DELETE",
                    `${DELETEIPDCASE_API}?id=${id}`
                );

                if (response.status === 200) { // Assuming 200 means successful deletion
                    alert("Record deleted successfully!");
                    window.location.reload(); // Refresh the page
                } else {
                    alert("Failed to delete the record.");
                }
            } catch (error) {
                console.error("Error deleting record:", error);
                alert("An error occurred while deleting the record.");
            }
        }
    };

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
                <StyledIconButton onClick={handleAdvanceDownloadPdf}>
                    <AddCardIcon />
                </StyledIconButton>
                <StyledIconButton>
                    <Delete onClick={handleDelete} />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}