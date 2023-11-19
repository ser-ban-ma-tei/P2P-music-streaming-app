import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pocketbase = (function() {
    let instance = null;

    const createInstance = () => {
        instance = new PocketBase(process.env.POCKETBASE_URL);
    }

    return {
        getInstance: () => {
            if (instance === null){
                createInstance();
            }

            return instance;
        }
    }
}());

export default pocketbase;