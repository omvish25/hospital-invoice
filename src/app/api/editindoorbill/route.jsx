import { NextRequest, NextResponse } from 'next/server';
import { Ipd } from '../../lib/models';
import connectToDatabase from '../../lib/utils';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
    try {
        // Establish a connection to the database
        await connectToDatabase();

        // Parse the incoming JSON request
        const { _id, MrNo,BillNo, PatientName, DoctorName, PatientType, IpdNo, Age, Sex, BillDate, DoaTime, DodTime, WardName, services, TotalBillAmount, ConsAmount, NetPayAmount, PaidAmount, DueAmount, status, AdvanceAmount, AdvanceBalAmount, AdvanceRefundAmount, PaymentDetails } = await request.json();

        // Validate the presence of the IPD record ID
        if (!_id) {
            return new NextResponse(JSON.stringify({ error: '_id is required' }), { status: 400 });
        }

        // Validate the format of the provided ID
        if (!ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ error: 'Invalid _id format' }), { status: 400 });
        }

        // Find the existing IPD record by ID
        const ipdRecord = await Ipd.findById(_id);

        // If the IPD record does not exist, return a 404 response
        if (!ipdRecord) {
            return new NextResponse(JSON.stringify({ error: 'IPD record not found' }), { status: 404 });
        }

        // Update the IPD record fields if provided in the request
        if (MrNo) ipdRecord.MrNo = MrNo;
        if (BillNo) ipdRecord.BillNo = BillNo;


        
        if (PatientName) ipdRecord.PatientName = PatientName;
        if (DoctorName) ipdRecord.DoctorName = DoctorName;
        if (PatientType) ipdRecord.PatientType = PatientType;
        if (IpdNo) ipdRecord.IpdNo = IpdNo;
        if (Age) ipdRecord.Age = Age;
        if (Sex) ipdRecord.Sex = Sex;
        if (BillDate) ipdRecord.BillDate = BillDate;
        if (DoaTime) ipdRecord.DoaTime = DoaTime;
        if (DodTime) ipdRecord.DodTime = DodTime;
        if (WardName) ipdRecord.WardName = WardName;
        if (services) ipdRecord.services = services;
        if (TotalBillAmount) ipdRecord.TotalBillAmount = TotalBillAmount;
        if (ConsAmount) ipdRecord.ConsAmount = ConsAmount;
        if (NetPayAmount) ipdRecord.NetPayAmount = NetPayAmount;
        if (PaidAmount) ipdRecord.PaidAmount = PaidAmount;
        if (DueAmount) ipdRecord.DueAmount = DueAmount;
        if (status) ipdRecord.status = status;
        if (AdvanceAmount) ipdRecord.AdvanceAmount = AdvanceAmount;
        if (AdvanceBalAmount) ipdRecord.AdvanceBalAmount = AdvanceBalAmount;
        if (AdvanceRefundAmount) ipdRecord.AdvanceRefundAmount = AdvanceRefundAmount;
        if (PaymentDetails) ipdRecord.PaymentDetails = PaymentDetails;

        // Save the updated IPD record back to the database
        await ipdRecord.save();

        // Return a success response with the updated IPD record data
        return new NextResponse(JSON.stringify({ success: true, ipd: ipdRecord }), { status: 200 });

    } catch (error) {
        // Log any errors that occur and return a 500 response
        console.error('Error updating IPD record:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
