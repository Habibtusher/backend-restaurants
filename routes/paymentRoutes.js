import express from "express"

import { addPayments } from '../controllers/paymentsControllers.js';




const router = express.Router();


router.post('/add-payment',addPayments)



export default router;