import jwt,{ Secret } from 'jsonwebtoken';
import {config} from '../config/config'

const generatetokens = (obj:{}, secret?: Secret | null) => {
    return new Promise<{}>(async(resolve,reject) => {
        try {
            const token = await jwt.sign(obj, secret || config.jwt.JWT_SECRET, {
              expiresIn: config.jwt.JWT_EXPIRE
            });
            resolve(token);
          } catch (error) {
            reject(error);
          }
    })
}


export {generatetokens}