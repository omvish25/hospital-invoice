import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function POST(request) {
    try {
        await connectToDatabase();

        const body = await request.json();

        const {
            MrNo,
            PatientName,
            Age,
            Sex,
            MaritialStatus,
            Address,
            MobileNo,
            PhoneNumber,
            AdmissionDate,
            IpNo,
            DoctorName,
            SecondDoctorName,
            ThirdDoctorName,
            RefDoctorName,
            RelativeName,
            PatientCategory,
            isReimbursement,
            MlcNo,
            AdmissionTime,
            DepartmentName,
            CompanyName,
            TariffName,
            BedName,
            RelationName,
            RelationPhoneNoo,
            RelationAddress,
        } = body;

        const newIpdCasePaper = new IpdCase({
            MrNo,
            PatientName,
            Age,
            Sex,
            MaritialStatus,
            Address,
            MobileNo,
            PhoneNumber,
            AdmissionDate,
            IpNo,
            DoctorName,
            SecondDoctorName,
            ThirdDoctorName,
            RefDoctorName,
            RelativeName,
            PatientCategory,
            isReimbursement,
            MlcNo,
            AdmissionTime,
            DepartmentName,
            CompanyName,
            TariffName,
            BedName,
            RelationName,
            RelationPhoneNoo,
            RelationAddress,
        });

        // Save the document to the database
        await newIpdCasePaper.save();

        // Return a success response with the created IpdCasePaper record
        return NextResponse.json({ message: 'IPD Case Paper record created successfully', IpdCase: newIpdCasePaper }, { status: 201 });
    } catch (error) {
        // Log any errors and return an error response
        console.error('Error creating IPD Case Paper record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
