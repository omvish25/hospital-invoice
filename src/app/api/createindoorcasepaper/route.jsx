import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/utils';
import { Ipd } from '@/app/lib/models'; 

export async function POST(request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { 
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
