import {type Request, type Response, Router} from "express";
import {verifyTokens} from "../middleware/verify_tokens.js";
import {createUser} from "../controllers/user_controller.js";
import {loginUser} from "../controllers/user_controller.js";
import {getUser} from "../controllers/user_controller.js";
import {updateUser} from "../controllers/user_controller.js";
//import {deleteUser} from "../controllers/user_controller.js";

const router = Router();

router.post('/create/users', async (req: Request, res: Response) => {
     const userData = req.body;
     const result = await createUser(userData);
     if (result.message === 'User saved') {
         res.status(201).json(result);
     } else {
         res.status(400).json(result);
     }
});

router.post('/login/bibliotecario', async (req: Request, res: Response) => {
    const {email, password_user} = req.body;
    const result = await loginUser(email, password_user);
    if (result.message === 'Login successful') {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

router.get('/users', verifyTokens,  async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    console.log(userId);
    const result = await getUser(userId);
    res.status(200).json(result);
});

router.put('/update/users', verifyTokens, async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const userData = req.body;
    const result = await updateUser(userId, userData);
    if (result.message === 'User updated successfully') {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

// router.delete('/delete/users', verifyTokens, async (req: Request, res: Response) => {
//     const userId = (req as any).userId;
//     const result = await deleteUser(userId);
//     if (result.message === 'User deleted successfully') {
//         res.status(200).json(result);
//     } else {
//         res.status(400).json(result);
//     } 
// });

export default router;