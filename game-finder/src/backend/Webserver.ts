/**
 * This is the webserver where all of the commands that frontend would need can be accessed.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { ProfileManagement } from "./ProfilesManagement"; 
import { MongoDB } from "./mongoDB";   
import { Profile } from "./Profile";

import express from "express";
import cors from 'cors';
import {Request, Response, NextFunction } from 'express'; //Not sure if NextFunction is needed for this but I'll leave it in for now 
import { DMScreen } from "./DMScreen";


//https://www.kindacode.com/snippet/node-js-express-typescript-req-query-type/

export async function startServer() {
  const server = express();
  //server.use(cors); //https://www.twilio.com/blog/add-cors-support-express-typescript-api
  server.use(cors({
    allowedHeaders: "*"
  }))
  const db = new MongoDB("mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority");
  const profileManagement = new ProfileManagement(db);

  /**
   * DONE
   */
  server.get('/SignIn', async (req: Request, res: Response) => {
    const displayName = req.query.DisplayName as string;
    const username = req.query.Username as string;
    const pw = req.query.Password as string;
    const email = req.query.Email as string;
    const msg = await profileManagement.signIn( displayName, email, username, pw);
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
    const privacyLvl = req.query.PrivacyLevel as string;
    const blockedProfiles = req.query.BlockedProfiles as Array<string>;
    const friends = req.query.Friends as Array<string>;
    const location = req.query.Location as string;
    const status = req.query.Status as string;
    const tags = req.query.Tags as any;
    const aboutMe = req.query.AboutMe as string;
    const pfp = req.query.PFP as string;
    const availableTime = req.query.AvailableTime as string; 
    const timezone = req.query.Timezone as string;
    updateProfile.editInformation(displayName, pw, privacyLvl, blockedProfiles, friends, location, status, tags, aboutMe, pfp, availableTime, timezone);

    res.send( "The information has been edited");
  } )

  /**
   * DONE
   */
  server.get('/ReturnProfileInformation', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    profile.setMongoDB(null);
    let JSONConversion = JSON.stringify( profile );
    profile.setMongoDB(db);
    res.send( JSONConversion );
  } )


  server.get('/CheckFriendOrBlock', async (req: Request, res: Response) => {

    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username);

    if(option == "friend") {
      if(profile.friends.indexOf(otherUser) > -1 ) {
        res.send( true );
      }
    }
    else if(option == "block") {
      if(profile.blockedProfiles.indexOf(otherUser) > -1 ) {
        res.send( true );
      }
    }
    else {
      res.send( false );
    }
  
  } )


  server.get('/AddFriendOrBlock', async (req: Request, res: Response) => {

    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username);

    if(option == "friend") {
      profile.addFriend(otherUser);
      res.send( "The user was friended" );
    }
    else if(option == "block") {
      profile.addBlocked(otherUser);
      res.send( "The user was blocked" );
    }
    else {
      res.send( "The user was friended or blocked" );
    }
  
  } )

  server.get('/RemoveFriendOrBlock', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username);

    if(option == "friend") {
      profile.removeFriend(otherUser);
      res.send( "The user was unfriended" );
    }
    else if(option == "block") {
      profile.removeBlocked(otherUser);
      res.send( "The user was unblocked" );
    }
    else {
      res.send( "The user was remvoed from blocked" );
    }

  } )


  /**
   * DONE
   */
  server.get('/ReturnProfileVar', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const reqVar = req.query.ReqVar as string;
    let profile = await profileManagement.accessUser(username);
    const retrievedVar = profile[reqVar];
    res.send ( retrievedVar );
  } )

  /**
   * DONE
   */
  server.get('/SetProfileVar', async (req: Request, res: Response) => { 
    const username = req.query.Username as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.NewVar as any;
    let profile = await profileManagement.accessUser(username);
    profile[reqVar] = newVar;
    profile.updateDB();
    res.send( profile[reqVar] );
 } )


 /**
  * 
  * CHARACTER SHEETS WEBSERVER
  * 
  */

  /**
   * DONE
   */
  server.get('/AddCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charName = req.query.CharacterName as string;
    
    profile.createCharSheet(charName);

    res.send( "Character Sheet should be uploaded to profile" );
  } )


  /**
   * 
   */
  server.get('/ReturnCharacterSheetInfo', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = req.query.CharacterPos as string;
    let charSheet = await profile.accessCharacterSheet( Number.parseInt(charPos) );
    
    res.send( JSON.stringify(charSheet) );
  } )


  /**
   * 
   */
  server.get('/ReturnCharacterSheetLength', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    let length = 0;
    if(profile.charSheets == null) {
      //Do nothing
    }
    else{
      length = profile.charSheets.length;
    }
    console.log( length );
    
    res.send( String(length) );
  } )

  /**
   * DONE
   */
  server.get('/UpdateCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = req.query.CharacterPos as string;
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    const charName = req.query.CharacterName as string;
    const race = req.query.Race as string;
    const background   = req.query.Background as string;
    const backstory = req.query.Backstory as string;
    const lvl = req.query.Lvl as string;
    const charClass = req.query.CharacterClass as string;
    const equipment = req.query.Equipment as string;
    const stats =  convertStrToNum( req.query.Stats as string ); //Change to Array<number>
    const statMods =  convertStrToNum( req.query.StatModifiers as string );  //Change to Array<number>
    const combatStats =  convertStrToNum( req.query.CombatStats as string ); //Change to Array<number>
    const money =  convertStrToNum( req.query.Money as string ); //Change to Array<number>
    const spells = null as any; //This is to add spells later
    const skills = req.query.Skills as Array<string>;
    const pictures = req.query.Pictures as Array<string>;
    profile.updateCharSheet(charSheet, charName, race, background, backstory, lvl, charClass, equipment, stats, statMods,
    combatStats, money, spells, skills, pictures);

    res.send( "Character Sheet should be updated" );
  } )

  /**
   * 
   */
  server.get('/SetCharacterSheetVar', async (req: Request, res : Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = req.query.CharacterPos as string;
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.NewVar as any;
    charSheet[reqVar] = newVar;
    profile.updateDB();

    res.send( newVar );
  } )


  /**
   * 
   * SPELL WEBSERVER
   * 
   */


  /**
   * TO-DO BUG FIX
   */
  server.get('/AddSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charName = req.query.CharacterName as string;
    let charSheet = profile.accessCharacterSheet(charName);

    const spellName = req.query.SpellName as string;

    charSheet.createSpell(spellName, db);

    res.send( "Spell has been added to character sheet" );
  } )
  
  /**
   * TO-DO BUG FIX
   */
  server.get('/UpdateSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = Number.parseInt( req.query.CharacterName as string );
    let charSheet = profile.accessCharacterSheet(charPos);

    const spellPos = Number.parseInt( req.query.SpellPos as string);
    const spellName = req.query.SpellName as string;
    const castingTime = req.query.CastingTime as string;
    const range = req.query.Range as string;
    const duration = req.query.Duration as string;
    const desc = req.query.Description as string;
    const spellLvl = req.query.SpellLvl as string;
    const school = req.query.School as Array<string>;
    const components = req.query.Components as Array<string>;
    const races  = req.query.Races as Array<string>;
    const reqClasses = req.query.ReqClasses as Array<String>;

    let spell = charSheet.accessSpell( spellPos );
    charSheet.updateSpell( spell, spellName, castingTime, range, duration, desc, spellLvl, school, components, races, reqClasses );

    res.send( "Spell has been updated" );
  } )

  /**
   * TO-DO : BUG FIX
   */
  server.get('/RecommendSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = Number.parseInt( req.query.CharacterName as string );
    let charSheet = profile.accessCharacterSheet(charPos);
    let recSpells = charSheet.spellRecommendation();
    
    res.send ( JSON.stringify(recSpells) );
  } )


  /**
   * TO-DO : BUG FIX
   */
  server.get('/ReturnSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPos as string;
    const spellPos = req.query.SpellPos as string;
    let profile = await profileManagement.accessUser(username);
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    
    res.send ( JSON.stringify(spell) );
  } )

  /**
  * TO-DO : BUG FIX
  */
  server.get('/SetSpellVar', async (req: Request, res : Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPos as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.NewVar as any;
    const spellPos = req.query.SpellPos as string;
    let profile = await profileManagement.accessUser(username);
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    spell[reqVar] = newVar;
    profile.updateDB();

    res.send( newVar );
  } )

  /**
   * TO-DO : BUG FIX
   */
  server.get('/GetSpellVar', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPos as string;
    const reqVar = req.query.ReqVar as string;
    const spellPos = req.query.SpellPos as string;
    let profile = await profileManagement.accessUser(username);
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    
    res.send ( spell[reqVar] );
  } )


  /**
   * 
   * GMSCREEN / NPC WEBSERVER
   * 
   */

  server.get('/CreateNPC', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const npcName = req.query.NPCName as string;
    let dmScreen = profile.dmScreen;
    dmScreen.addNPC(npcName);
    profile.updateDB();
    
    res.send ( "The NPC was created" );
  } )

  server.get('/EditNPC', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const npcPos = req.query.NPCPos as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.Newvar as any;
    let npc = profile.dmScreen.accessNPC( Number.parseInt(npcPos) );
    npc[reqVar] = newVar;
    profile.updateDB();

    res.send ( "NPC was modified" );
  } )

  server.get('/ReturnNPCs', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    let npcList = profile.dmScreen.npcList;

    res.send ( JSON.stringify(npcList) );
  } )


  server.listen(80);
  
}

/**
 * This function converts any Array<string> to an Array<number> because it only takes that for queries 
 * instead of being able to take Array<number> directly.
 * @param arrStr 
 */
function convertStrToNum(arrStr : string){
  const parse = JSON.parse(arrStr).map((str: string) => {
    return parseInt(str);
  });
  return parse;
}
