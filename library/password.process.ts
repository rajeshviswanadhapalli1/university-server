import bcrypt from 'bcrypt';

const encryptPassword = async(password:string) => {
    return new Promise<{}>(async(resolve,reject) => {
        try {
            const encrypted = await bcrypt.hash(password, 10);
         resolve(encrypted);
          } catch (error) {
            reject(error)
          }
    })
}

const decryptPassword = async (password: string, encrypted: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const decrypted = await bcrypt.compare(password, encrypted);
        resolve(decrypted);
      } catch (error) {
       reject(error)
      }
    });
  };

export {encryptPassword,decryptPassword}