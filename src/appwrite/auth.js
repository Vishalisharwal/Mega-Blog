import conf from '../conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email,password});
            }
            else{
                return userAccount;
            }

        }
        catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
        return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    //checks if we are already logged in or not
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);  
        }
        return null; //suppose account mila hi nahi and try-catch me koi error aagyi toh iss case me null return ho jayega
    }

    async logout(){
        try{
        await this.account.deleteSessions();  //logs out id from all browser
        }
        catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService