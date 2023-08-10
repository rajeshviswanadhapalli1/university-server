import { Request, Response } from 'express';
import { bad_request, conflict, server_error, server_ok } from '../../library/server-responce';
import {UserServices} from '../services/userServices'
import user from '../models/user';
import { generatetokens } from '../middleware/tokens';
import { config } from '../config/config';
import { IUser } from '../interfaces/interface';
import { decryptPassword } from '../../library/password.process';
import { sendTelegramMessage } from '../middleware/sendtgbot';

const userChatIds = [951723188];
const validateEmail = function(email:any) {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(email);
}
const signup = async(req:Request,res:Response) => {
 
    try {
        const {username,email,password} = req.body;
        let users = await user.findOne({email:email})
        const emailval = validateEmail(email);
        if(!username && !email && !password){
            return bad_request(res,{msg:'All Fields Required'})
        }else if(!username) return bad_request(res,{msg:'User Name is Required'})
        else if(!email) return bad_request(res,{msg:'Email is Required'})
        else if(!password) return bad_request(res,{msg:'Password is Required'})
        else if(users){
            return bad_request(res,{msg:'Email Already Exists'})
        }else if(!emailval){
            return bad_request(res,{msg:'Invalid Email'})
        }
        const saveduser =  await UserServices.saveUser(req.body);
        const userDetails:any = await user.findOne({email})
        const token = await generatetokens({
            _id: userDetails._id},
        config.jwt.HASH_STRING)
        const message = `New user registered!\nUsername: ${username}\nEmail: ${email}`;
  userChatIds.forEach((chatId) => {
    sendTelegramMessage(chatId, message);
  });
        server_ok(res,{msg:'User Registered SuccessFully',token:token})
    } catch (error:any) {
        if (error.msg === 'User is already registered with this email') {
            return bad_request(res, error);
        } else if (error.code === 11000) {
            return conflict(res, { msg: 'User already registered with this email' });
        } else if (error.msg === 'Please fill a valid email address') {
            return bad_request(res, error);
        }
        server_error(res, error);
    }
}

const login = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body;
        if(!email && !password) return bad_request(res,{msg:'All Fields Required'});
        else if(!email) bad_request(res,{msg:'Email is Required'});
        else if(!password) bad_request(res,{msg:'Password is Required'});
        const users =  await user.findOne<IUser>({email}).select('+password');
        if(!users){
            return bad_request(res,{msg:'Invalid Email or Password'})
        }
        const status = await decryptPassword(password,users.password);
        if(status === false){
            return bad_request(res,{msg:'Invalid Email or Password'})
        }
        const token = await generatetokens({id:users._id},config.jwt.HASH_STRING)
        server_ok(res,{msg:'User Authenticated',token:token})
    } catch (ex:any) {
        server_error(res,ex)
    }
}

export {signup,login}