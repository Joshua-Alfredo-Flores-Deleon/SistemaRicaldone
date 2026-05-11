import dotenv from "dotenv";
dotenv.config();

export const config = {
    db:{
        URL:process.env.DB_URL
    },
    jwt:{
        secret:process.env.JWT_secret_Key
    },
    email:{
        user_email:process.env.USER_EMAIL, 
        user_password:process.env.USER_PASSWORD
    }
}

export default config;