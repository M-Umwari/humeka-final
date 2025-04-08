import {signUp, login} from '../controllers/userController'
import { Router } from "express";
import { validateLogin, validateSignup } from "../middleware/validation/authSchema";
import {google} from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

const authRouter = Router()


authRouter.post('/signup', validateSignup, signUp)
authRouter.post('/login', validateLogin, login)

authRouter.get('/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent'
    });
    res.redirect(authUrl);
  });
  
  
authRouter.get('/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
      const tokenResponse = await oauth2Client.getToken(code as string);
      const tokens = tokenResponse.tokens;
      
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token)
      
      res.json({accessToken: tokens.access_token, refreshToken: tokens.refresh_token});
    } catch (error) {
      console.error('Error during token exchange:', error);
      res.status(500).send('Authentication failed: ' + error.message);
    }
});


export default authRouter