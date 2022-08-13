import  express  from 'express';
// import { addFood } from '../controllers/foodController.js';
import { addFood, deleteFood, getFood} from '../controllers/foodController.js';
import { verifyAdmin } from '../middleware/VerifyToken.js';




 const router = express.Router();

router.post('/add-food', addFood);
router.post('/get-food',getFood)
router.post('/delete-food',deleteFood);
// router.delete("/delete/user/:email",verifyUser,deleteUser);
// router.patch("/user/update/:email",verifyUser,updateUser);




export default router;