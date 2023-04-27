/**
 * 
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { ProfileManagement } from "./ProfilesManagement"; 
import { MongoDB } from "./mongoDB";    //To remove after testing

import express from "express";
import {Request, Response, NextFunction } from 'express'; //Not sure if NextFunction is needed for this but I'll leave it in for now 


//https://www.kindacode.com/snippet/node-js-express-typescript-req-query-type/

export async function startServer() {
  const server = express();
  const db = new MongoDB("mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority");
  const profileManagement = new ProfileManagement(db);

  /**
   * DONE
   */
  server.get('/SignIn', async (req: Request, res: Response) => {
    const displayName = req.query.DisplayName as string;
    const username = req.query.Username as string;
    const pw = req.query.Password as string;
    const msg = await profileManagement.signIn( displayName, username, pw);
    res.send(msg);
  } )

  /**
   * DONE
   */
  server.get('/Login', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const pw = req.query.Password as string;
    const msg = await profileManagement.login( username, pw);
    res.send(msg);
  } )

  /**
   * DONE
   */
  server.get('/UpdateProfileInformation', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const updateProfile = await profileManagement.accessUser(username);
    const displayName = req.query.DisplayName as string;
    const pw = req.query.Password as string;
    const permissionLevel = req.query.PermissionLevel as string;
    const blockedProfiles = req.query.BlockedProfiles as Array<string>;
    const friends = req.query.Friends as Array<string>;
    updateProfile.editInformation(displayName, pw, permissionLevel, blockedProfiles, friends);

    const msg = "The information had been edited";
    res.send(msg);
  } )

  /**
   * DONE
   */
  server.get('/ReturnProfileInformation', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    profile.setMongoDB(null);
    let JSONConversion = JSON.stringify( profile );
    console.log( JSONConversion );
    profile.setMongoDB(db);
    res.send( JSON.stringify(JSONConversion) );
  } )

  server.get('/AddCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const msg = await profileManagement.accessUser(username);
    res.send( JSON.stringify(msg) );
  } )

  //I need to add another spells to the spell Database
  server.get('/AddSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const msg = await profileManagement.accessUser(username);
    res.send( JSON.stringify(msg) );
  } )

  //I need to grab the name of the characterSheet
  server.get('/UpdateCharacterSheet', async (req: Request, res: Response) => {
    const charName = req.query.CharacterName as string;
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    let charSheet = profile.accessCharacterSheet(charName);


    res.send( JSON.stringify("Something") );
  } )
  
  server.get('/UpdateSpells', async (req: Request, res: Response) => {
    const charName = req.query.CharacterName as string;
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    let charSheet = profile.accessCharacterSheet(charName);
    
    res.send( JSON.stringify("Something spell") );
  } )

  //I need username and charName for a characterSheet to be added and then pulling up the characterSheet and adding a spell to it 
  //Need to be able to change characterSheet & spell information incase of typos
  //Need to be able to change profile information

  server.listen(3000);

  
}



/**
 * I need the requests of  
 * -Logging in  -DONE
 * -Signing in  -DONE
 * -Creating Character Sheets -TODO, this should be based on the characterSheet token or charName
 * -Creating Spells -TODO, -should be based on the characterSheet token / charName
 * -Getting profile information -DONE
 */