import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import { StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";
import { toWords } from 'number-to-words';




export default function ProductRow({ product }) {
    const {
        BillNo,
        MrNo,
        PatientName,
        DoctorName,
        TotalBillAmount,
        id,
        published,
        slug,
        IpdNo,
        BillDate,
        Age,
        Sex,
        DoaTime,
        DodTime,
        WardName,
        PatientType,
        services,
        ConsAmount,
        NetPayAmount,
        PaidAmount,
        AdvanceAmount,
        AdvanceBalAmount,
        AdvanceRefundAmount,
        PaymentDetails
    } = product || {};
    const router = useRouter();
    const [productPublish, setProductPublish] = useState(published);
    const printDateto = new Date().toLocaleDateString('en-GB')
    const paidAmountInWords = toWords(PaidAmount) + " Only";
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
    const formattedBillDate = formatDate(BillDate);
    const formatedDoaTime = formatDate(DoaTime)
    const formatedDodTime = formatDate(DodTime)
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const scale = 2;
        const servicesRows = services.map((service) => `
        <tr>
            <td style="text-align: left;">${service.serviceName}</td>
            <td>${service.servicePrice}</td>
            <td>${service.serviceQty}</td>
            <td>${service.serviceTotal}</td>
        </tr>
    `).join('');

        const paymentRows = PaymentDetails.map((pay) => `
    <tr style="width: 100%;">
                            <th style="width: 50%; ">${pay?.PaymentType} :           </th>
                            <td style="width: 50%; text-align: end; ">${pay?.PaymentAmount}</td>
                        </tr>
`).join('');

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
            <p ><strong>Print Date :</strong>  ${printDateto}</p>
        </div>
        <div style=" display: flex; border: 1px solid black; align-items: center; justify-content: center; border-radius: 10px; height: 40px;">
            <p><strong>IP FINAL BILL</strong></p>
        </div>

        <div class="bill-info">
            <table>
                <tr>
                    <th>Bill No:</th>
                    <td>${BillNo}</td>
                    <th>IPD No:</th>
                    <td>${IpdNo}</td>
                    <th>Bill Date:</th>
                    <td>${formattedBillDate}</td>
                </tr>
                <tr>
                    <th>MR No:</th>
                    <td>${MrNo}</td>
                    <th>Age / Sex:</th>
                    <td>${Age} / ${Sex}</td>
                    <th>DOA / Time:</th>
                    <td>${formatedDoaTime}</td>
                  
                </tr>
             
                <tr>
                    <th>Patient Name:</th>
                    <td>${PatientName}</td>
            
                    <th></th>
                    <td></td>
                    <th>DOD / Time:</th>
                    <td>${formatedDodTime}</td>
                </tr>
                <tr>
                    <th>Doctor Name:</th>
                    <td>${DoctorName}</td>
                   
                    <th></th>
                    <td></td>
                    <th>Ward Name:</th>
                    <td>${WardName}</td>
                </tr>
                <tr>
                    <th>Patient Type:</th>
                    <td>${PatientType}</td>
                </tr>
            </table>
        </div>

        <div class="service-details">
            <table>
                <thead>
                    <tr>
                        <th style="text-align: left; border-bottom: 1px solid black; border-top: 1px solid black;">Service Name</th>
                        <th style="border-bottom: 1px solid black; border-top: 1px solid black;">Price</th>
                        <th style=" padding-left: 40px; width: 15%; border-bottom: 1px solid black; border-top: 1px solid black;">Qty</th>
                        <th style=" border-bottom: 1px solid black; border-top: 1px solid black;">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                ${servicesRows}
                </tbody>
            </table>
        </div>

        <div   style="  display: flex; justify-content: end; margin-top: 20px;  width: 100%; border-bottom: 1px solid black; border-top: 1px solid black; padding-top: 15px; padding-bottom: 15px;">
            <table style="width: 35%; ">
                <tbody>
                    <tr>
                    <th style="font-weight: bold; text-align: start;" >Total Bill Amount: </th>
                    <td style="text-align: end;">${TotalBillAmount}</td>
                    </tr>
                    <tr>
                        <th style="font-weight: bold; text-align: start; " >Cons. Amount: </th>
                        <td style="text-align: end;">${ConsAmount}</td>
                        </tr>
                        <tr>
                            <th style="font-weight: bold; text-align: start; " >Net Pay Amount: </th>
                            <td style="text-align: end;">${NetPayAmount}</td>
                            </tr>
                            <tr>
                                <th style="font-weight: bold; text-align: start; " >Paid Amount: </th>
                                <td style="text-align: end;">${PaidAmount}</td>
                                </tr>
                    
                   
                </tbody>
              
            </table>
        </div>
        <div style=" margin-left: 30px; margin-top: 2rem;">
            <p><strong> Amt in words : </strong> ${paidAmountInWords}</p>
        </div>
        <div style="display: flex; justify-content: space-between; padding-right: 0.5rem; padding-left: 0.5rem; margin-top: 2rem;">
            <div style="border: 1px solid black;  width: 50%;  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);" class="advance-details">
                <div style="display: flex; justify-content: center;"><p>advance-details</p></div>
                <div style="display: flex; justify-content: center; width: 100%;">
                <table style="width: 100%;">
                    <tbody>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Amt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">${AdvanceAmount}</td>
                        </tr>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Bal Amt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">${AdvanceBalAmount}</td>
                        </tr>
                        <tr style="width: 100%;">
                            <th style="width: 50%; padding-left: 10px;  text-align: start; ">Advance Refund Amt&nbsp;&nbsp; :</th>
                            <td style="width: 40%; text-align: end; padding-right: 10px; ">${AdvanceRefundAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <div style="border: 1px solid black; padding-left: 1rem;  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3); padding-right: 1rem; width: 35%;" class="payment-details">
                <div style="display: flex; justify-content: center;"><p>payment-details</p></div>
                <table>
                    <tbody>
                      ${paymentRows}
                    </tbody>
                </table>

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
    
        doc.save(`hospital-bill-${BillNo}.pdf`);
        
        document.body.removeChild(tempDiv);
    });
    
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{BillNo}</StyledTableCell>
            <StyledTableCell align="left">{MrNo}</StyledTableCell>
            <StyledTableCell align="left">{PatientName}</StyledTableCell>
            <StyledTableCell align="left">{DoctorName}</StyledTableCell>
            <StyledTableCell align="left">{TotalBillAmount}</StyledTableCell>
            <StyledTableCell align="center">
                <StyledIconButton onClick={() => router.push(`/admin/products/${id}`)}>
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
