import { Schema, mongoose } from "mongoose";
import optTemplate from "../mail/emailVerificationTemplate.js";

const optSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    opt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
})

async function sendVerificationEmail(email, opt) {
    try {
        const mailResponse = await sendEmail(email, "Verification Email", optTemplate(opt));
        console.log("Email sent: ", mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error
    }
}

optSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.opt)
    }
    next();
})

const optModel = mongoose.model("OPT", optSchema);
export default optModel;