import { ObjectId } from "mongodb";
import prisma from "../../prisma-client/prismaClient.js";


// Create Loan Request
const createLoanRequest = async(req, res)=>{
    try{

        const userId = req.user.id;
        console.log("user id is:", userId);
        // const {}

    }catch(err){

    }
}