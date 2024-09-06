import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/utils';
import { IpdCase } from '../../lib/models';

export async function POST(request) {
    try {
        await connectToDatabase();

        const body = await request.json();

        const {
            PatientName,
            Age,
            Sex,
            MaritialStatus,
            Address,
            MobileNo,
            PhoneNumber,
            AdmissionDate,
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
            AdvanceAmount
        } = body;

        // Generate the MrNo
        const lastIpdCase = await IpdCase.findOne().sort({ MrNo: -1 });
        const newMrNoNumber = lastIpdCase ? parseInt(lastIpdCase.MrNo.split('-')[1]) + 1 : 1;
        const newMrNo = `MR-${newMrNoNumber}`;

        // Generate the IpNo
        const lastIpNoCase = await IpdCase.findOne().sort({ IpNo: -1 });
        const newIpNoNumber = lastIpNoCase ? parseInt(lastIpNoCase.IpNo.split('-')[1]) + 1 : 1;
        const newIpNo = `IP-${newIpNoNumber}`;

        const newIpdCasePaper = new IpdCase({
            MrNo: newMrNo,
            IpNo: newIpNo, // Assign the auto-generated IpNo here
            PatientName,
            Age,
            Sex,
            MaritialStatus,
            Address,
            MobileNo,
            PhoneNumber,
            AdmissionDate,
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
            AdvanceAmount
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
