import { encryptPassword } from '../../library/password.process';
import {IUser} from '../interfaces/interface';
import User  from '../models/user';


const saveUser = (body:any) => {
    return new Promise<{}>(async(resolve,reject) => {
        try {
            // const randomPassword = (Math.random() + 1).toString(36).substring(5);
            const hashedpassword = await encryptPassword(body.password);
            body.password = hashedpassword;
            const saveuser = new User(body);
            const saveduser: IUser = await saveuser.save();
            resolve(saveduser)
        } catch (ex:any) {
            reject(ex)    
        }
    })
}

export const UserServices =  {saveUser}