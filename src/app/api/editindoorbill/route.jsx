import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from "../../lib/models";
import connectToDatabase from '../../lib/utils';
import { ObjectId } from 'mongodb'; 

export async function PUT(request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json({ error: '_id is required' }, { status: 400 });
        }

        if (!ObjectId.isValid(_id)) {
            return NextResponse.json({ error: 'Invalid _id format' }, { status: 400 });
        }

        const updatedFields = {
            MrNo: body.MrNo, 
            PatientName: body.PatientName, 
            DoctorName: body.DoctorName, 
            PatientType: body.PatientType, 
            IpdNo: body.IpdNo, 
            Age: body.Age, 
            Sex: body.Sex, 
            BillDate: body.BillDate, 
            DoaTime: body.DoaTime, 
            DodTime: body.DodTime, 
            WardName: body.WardName, 
            services: body.services, 
            TotalBillAmount: body.TotalBillAmount, 
            ConsAmount: body.ConsAmount, 
            NetPayAmount: body.NetPayAmount, 
            PaidAmount: body.PaidAmount, 
            DueAmount: body.DueAmount, 
            status: body.status, 
            AdvanceAmount: body.AdvanceAmount, 
            AdvanceBalAmount: body.AdvanceBalAmount, 
            AdvanceRefundAmount: body.AdvanceRefundAmount, 
            PaymentDetails: body.PaymentDetails
        };

        Object.keys(updatedFields).forEach(key => updatedFields[key] === undefined && delete updatedFields[key]);

        const updatedIpd = await Ipd.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!updatedIpd) {
            return NextResponse.json({ error: 'IPD record not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'IPD record updated successfully', ipd: updatedIpd }, { status: 200 });
    } catch (error) {
        console.error('Error updating IPD record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
