import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from "../../lib/models";
import connectToDatabase from '../../lib/utils';

async function generateAutoIncrementedValue(field, prefix = '', length = 6) {
    const latestRecord = await Ipd.findOne({}).sort({ [field]: -1 });
    let nextValue = 1;
    if (latestRecord && latestRecord[field]) {
        const currentMax = parseInt(latestRecord[field].replace(prefix, ''));
        nextValue = currentMax + 1;
    }
    const paddedValue = nextValue.toString().padStart(length, '0');
    return `${prefix}${paddedValue}`;
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        
        // Auto-generate BillNo and MrNo
        const BillNo = await generateAutoIncrementedValue('BillNo', 'BILL-');
        const IpdNo = await generateAutoIncrementedValue('IpdNo', 'IPD-');

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
            PaymentDetails 
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
