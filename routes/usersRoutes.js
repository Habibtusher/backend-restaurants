import  express  from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/usersController.js';
import { verifyAdmin, verifyUser } from '../middleware/VerifyToken.js';


 const router = express.Router();

router.get('/users', getUsers);
router.delete("/delete/user/:email",verifyUser,deleteUser);
router.patch("/user/update/:email",verifyUser,updateUser);




export default router;