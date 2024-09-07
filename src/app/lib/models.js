const mongoose = require("mongoose");

const IpdSchema = new mongoose.Schema(
    {
        BillNo: {
            type: String,
            required: true,
        },
        MrNo: {
            type: String,
            required: true,
        },
        PatientName: {
            type: String,
        },
        DoctorName: {
            type: String,
        },
        PatientType: {
            type: String,
        },
        IpdNo: {
            type: String,
        },
        Age: {
            type: String,
            required: true,
        },
        Sex: {
            type: String,
            required: true,
        },
        BillDate: {
            type: Date,
            required: true,
        },
        DoaTime: {
            type: Date,
            required: true,
        },
        DodTime: {
            type: Date,
            required: true,
        },
        
        WardName: {
            type: String,
            required: true,
        },
        services: [
            {
                serviceName: { type: String },
                servicePrice: { type: String },
                serviceQty: { type: String },
                serviceTotal: { type: String },
            }
        ],
        TotalBillAmount: {
            type: String,
            required: true,
        },
        ConsAmount: {
            type: String,
            required: true,
        },
        NetPayAmount: {
            type: String,
            required: true,
        },
        PaidAmount: {
            type: String,
            required: true,
        },
        DueAmount: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        AdvanceAmount: {
            type: String,
        },
        AdvanceBalAmount: {
            type: String,
        },
        AdvanceRefundAmount: {
            type: String,
        },
        PaymentDetails: [
            {
                PaymentType: { type: String },
                PaymentAmount: { type: String },
            }
        ]

    },
    { timestamps: true }
);

const IpdCasePaperSchema = new mongoose.Schema(
    {

        MrNo: {
            type: String,
            required: true,
        },
        PatientName: {
            type: String,
        },
        Age: {
            type: String,
           
        },
        Sex: {
            type: String,
          
        },
        MaritialStatus: {
            type: String,
        },
        Address: {
            type: String,
        },
        MobileNo: {
            type: String,
        },
        PhoneNumber: {
            type: String,
        },
        AdmissionDate: {
            type: String,
        },
        IpNo: {
            type: String,
        },
        DoctorName: {
            type: String,
        },
        SecondDoctorName: {
            type: String,
        },
        ThirdDoctorName: {
            type: String,
        },
        RefDoctorName: {
            type: String,
        },
        RelativeName: {
            type: String,
        },
        PatientCategory: {
            type: String,
        },
        isReimbursement: {
            type: String,
         
        },
        MlcNo: {
            type: String,
        },
        AdmissionTime: {
            type: String,
           
        },
        DepartmentName: {
            type: String,
         
        },

        CompanyName: {
            type: String,
          
        },
        TariffName: {
            type: String,
            
        },
        BedName: {
            type: String,
        
        },
        RelationName: {
            type: String,
           
        },
        RelationPhoneNoo: {
            type: String,
         
        },
        RelationAddress: {
            type: String,
           
        },
        AdvanceAmounts: [
            {
                amount: {
                    type: String, 
                },
                date: {
                    type: Date, 
                },
                method: {
                    type: String, 
                }
            }
        ],

    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
},
    { timestamps: true }
);



export const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export const Ipd = mongoose.models.Ipd || mongoose.model("Ipd", IpdSchema);
export const IpdCase = mongoose.models.IpdCase || mongoose.model("IpdCase", IpdCasePaperSchema);