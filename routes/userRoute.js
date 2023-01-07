import express from 'express'
import { signUp , signIn , updateUserRole , authenticateUser , authorizedUser , deleteUser} from '../controllers/authenticationController.js'



const router = express.Router()

router.route('/signUp').post(signUp)
router.route('/signIn').post(signIn)
router.route('/deleteUser').delete( authorizedUser('admin'), deleteUser)
router.route('/assignRole/:id').patch( authenticateUser, authorizedUser('admin'),updateUserRole)


export default router