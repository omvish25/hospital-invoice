import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from "../../lib/models";
import connectToDatabase from '../../lib/utils';



export async function POST(request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        
        const lastIpNoCase = await Ipd.findOne().sort({ BillNo: -1 });
        const newIpNoNumber = lastIpNoCase ? parseInt(lastIpNoCase.BillNo.split('-')[1]) + 1 : 302;
        const BillNo = `BILL-${newIpNoNumber}`;

        const { 
            PatientName, 
            DoctorName, 
            MrNo,
            PatientType,  
            Age, 
            Sex, 
            BillDate, 
            DoaTime, 
            DodTime, 
            WardName, 
            services, 
            TotalBillAmount, 
            ConsAmount, 
            NetPayAmount, 
            PaidAmount, 
            DueAmount, 
            status, 
            AdvanceAmount, 
            AdvanceBalAmount, 
            AdvanceRefundAmount, 
            PaymentDetails,
            IpdNo
        } = body;

        const newIpd = new Ipd({
            BillNo, 
            MrNo, 
            PatientName, 
            DoctorName, 
            PatientType, 
            IpdNo, 
            Age, 
            Sex, 
            BillDate, 
            DoaTime, 
            DodTime, 
            WardName, 
            services, 
            TotalBillAmount, 
            ConsAmount, 
            NetPayAmount, 
            PaidAmount, 
            DueAmount, 
            status, 
            AdvanceAmount, 
            AdvanceBalAmount, 
            AdvanceRefundAmount, 
            PaymentDetails
        });
        
        await newIpd.save();
        return NextResponse.json({ message: 'IPD record created successfully', ipd: newIpd }, { status: 201 });
    } catch (error) {
        console.error('Error creating IPD record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
