import  express  from 'express';
// import { addFood } from '../controllers/foodController.js';
import {genarateOrders,getOrders,getOrdersByuser,deleteOrder} from '../controllers/genarateOrderController.js';
import { verifyAdmin } from '../middleware/VerifyToken.js';




 const router = express.Router();

router.post('/genarate-order', genarateOrders);
router.get('/get-orders', getOrders);
router.get('/by-emaill', getOrdersByuser);

router.delete("/delete:id",deleteOrder);
// router.patch("/user/update/:email",verifyUser,updateUser);




export default router;