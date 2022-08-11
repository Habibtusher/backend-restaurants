import  express  from 'express';

import { addMessages, getAllMessages } from '../controllers/messagesController.js';

 const router = express.Router();

router.post('/addmsg', addMessages)
router.post('/getmsg', getAllMessages)



export default router;