/**
 * This is the webserver where all of the API Calls that frontend would need and the API calls are :
 * 
 * PROFILES:
 *  - SignIn
 *  - Login
 *  - CheckUser
 *  - UpdateProfileInformation
 *  - ReturnProfileInformation
 *  - CheckFriendOrBlock
 *  - AddFriendOrBlock
 *  - RemoveFriendOrBlock
 *  - ReturnProfileVar
 *  - SetProfileVar
 * 
 * CHARACTER SHEET:
 *  - AddCharacterSheet
 *  - ReturnCharacterSheetInfo
 *  - ReturnCharacterSheetLength
 *  - UpdateCharacterSheet
 *  - SetCharacterSheetVar
 *  
 * SPELLS: 
 *  - AddSpells
 *  - UpdateSpells
 *  - RecommendSpells
 *  - ReturnSpells
 *  - SetSpellVar
 *  - GetSpellVar
 * 
 * DMSCREEN:
 *  - CreateNPC
 *  - EditNPC
 *  - ReturnNPCs
 * 
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { ProfileManagement } from "./ProfilesManagement"; 
import { MongoDB } from "./mongoDB";   

import express from "express";
import cors from 'cors';
import {Request, Response, NextFunction } from 'express'; //Not sure if NextFunction is needed for this but I'll leave it in for now 

export async function startServer() {
  const server = express();
  server.use(cors({
    allowedHeaders: "*"
  }))
  const db = new MongoDB("mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority");
  const profileManagement = new ProfileManagement(db);

  /**
   * This is the API call for allowing frontend to send a SignIn request with all of the different fields necessary for it.
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
   * 
   * PROFILE WEBSERVER API'S
   * 
   */

  /**
   * This is the Login API.
   */
  server.get('/Login', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const pw = req.query.Password as string;
    const msg = await profileManagement.login( username, pw);
    res.send(msg);
  } )

  /**
   * This just checks if a user exists in the profileList array from the database.
   */
  server.get('/CheckUser', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let usernameList = profileManagement.returnProfileUsernames();
    if( usernameList.indexOf(username) > -1 ) {
      res.send(true);
    }
    else {
      res.send(false);
    }

  } )

  /**
   * This allows for frontend to edit all of the information of a Profile Obj at once.
   */
  server.get('/UpdateProfileInformation', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const updateProfile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
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
   * This returns a Profile object given the username to frontend as a JSON Obj.
   */
  server.get('/ReturnProfileInformation', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    profile.setMongoDB(null); 
    let JSONConversion = JSON.stringify( profile );
    profile.setMongoDB(db);
    res.send( JSONConversion );
  } )


  /**
   * This checks if another user is blocked or friended by the user.
   */
  server.get('/CheckFriendOrBlock', async (req: Request, res: Response) => {

    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?

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


  /**
   * Gives the two options of adding a user to the Friend List or BlockedUsers List.
   */
  server.get('/AddFriendOrBlock', async (req: Request, res: Response) => {

    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?

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

  /**
   * Removes the other user from the blocked or friends list.
   */
  server.get('/RemoveFriendOrBlock', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const otherUser = req.query.OtherUser as string;
    const option = req.query.Option as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?

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
   * This returns a selected profile variable.
   */
  server.get('/ReturnProfileVar', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const reqVar = req.query.ReqVar as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const retrievedVar = profile[reqVar];
    res.send ( retrievedVar );
  } )

  /**
   * This sets only one profile variable
   */
  server.get('/SetProfileVar', async (req: Request, res: Response) => { 
    const username = req.query.Username as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.NewVar as any;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    profile[reqVar] = newVar;
    profile.updateDB();
    res.send( profile[reqVar] );
 } )


 /**
  * 
  * CHARACTER SHEET WEBSERVER API'S
  * 
  */

  /**
   * This adds a character sheet to the profile.
   */
  server.get('/AddCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const charName = req.query.CharacterName as string;
    
    profile.createCharSheet(charName);

    res.send( "Character Sheet should be uploaded to profile" );
  } )


  /**
   * This returns the character sheet info at a specified position.
   */
  server.get('/ReturnCharacterSheetInfo', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const charPos = req.query.CharacterPos as string;
    let charSheet = await profile.accessCharacterSheet( Number.parseInt(charPos) );
    
    res.send( JSON.stringify(charSheet) );
  } )


  /**
   * This returns the length of the character sheet array length in profile.
   */
  server.get('/ReturnCharacterSheetLength', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
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
   * This allows for all of the variables of character sheet to be modified at once.
   */
  server.get('/UpdateCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
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
   * This sets an individual variable in character sheet.
   */
  server.get('/SetCharacterSheetVar', async (req: Request, res : Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
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
   * SPELL WEBSERVER API'S
   * 
   */


  /**
   * This adds a spell to a character sheet given just the spell name
   */
  server.get('/AddSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const charPos = req.query.CharacterPosition as string;
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );

    const spellName = req.query.SpellName as string;
    charSheet.createSpell(spellName, db);
    profile.updateDB();

    res.send( "Spell has been added to character sheet" );
  } )
  
  /**
   * This API updates multiple variables at once for a spell
   */
  server.get('/UpdateSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const charPos = Number.parseInt( req.query.CharacterPosition as string );
    let charSheet = profile.accessCharacterSheet(charPos);

    //All the spell info to be updated.
    const spellPos = Number.parseInt( req.query.SpellPosition as string);
    const spellName = req.query.SpellName as string;
    const level = req.query.Level as string;
    const duration = req.query.Duration as string;
    const school = req.query.School as string;
    const range = req.query.Range as string;
    const components = req.query.Components as string;
    const classes = req.query.Classes as Array<string>;
    const text = req.query.Text as string;
    const castingTime = req.query.CastingTime as string;

    let spell = charSheet.accessSpell( spellPos );
    charSheet.updateSpell( spell, spellName, level, duration, school, range, components, classes, text, castingTime);

    res.send( "Spell has been updated" );
  } )

  /**
   * This returns recommended spells as a JSON Obj if they match the character sheet's class.
   */
  server.get('/RecommendSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const charPos = Number.parseInt( req.query.CharacterPosition as string );
    let charSheet = profile.accessCharacterSheet(charPos);

    if( charSheet != null ) {
      let recSpells = await charSheet.spellRecommendation( db );
      res.send( JSON.stringify(recSpells) );
    }
    else{
      res.send( "The character sheet doesn't have a class so this won't work.")
    }
    
  } )


  /**
   * This returns all of the spells that're in the character sheet.
   */
  server.get('/ReturnSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPosition as string;
    const spellPos = req.query.SpellPosition as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    
    res.send ( JSON.stringify(spell) );
  } )

  /**
  * This API sets one of the spell variables given character sheet position, and spell position.
  */
  server.get('/SetSpellVar', async (req: Request, res : Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPosition as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.NewVar as any;
    const spellPos = req.query.SpellPosition as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    spell[reqVar] = newVar;
    profile.updateDB();

    res.send( newVar );
  } )

  /**
   * This returns a variable of a specified spell by its position along with the character sheet's position in the array.
   */
  server.get('/GetSpellVar', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    const charPos = req.query.CharacterPosition as string;
    const reqVar = req.query.ReqVar as string;
    const spellPos = req.query.SpellPosition as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    let charSheet = profile.accessCharacterSheet( Number.parseInt(charPos) );
    let spell = charSheet.accessSpell( Number.parseInt(spellPos) );
    
    res.send ( spell[reqVar] );
  } )


  /**
   * 
   * GMSCREEN / NPC WEBSERVER API'S
   * 
   */

  /**
   * This API creates an NPC given the Profile username and NPC name.
   */
  server.get('/CreateNPC', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const npcName = req.query.NPCName as string;
    let dmScreen = profile.dmScreen;
    dmScreen.addNPC(npcName);
    profile.updateDB();
    
    res.send ( "The NPC was created" );
  } )

  /**
   * This API only modifies one variable of an NPC
   */
  server.get('/EditNPC', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    const npcPos = req.query.NPCPos as string;
    const reqVar = req.query.ReqVar as string;
    const newVar = req.query.Newvar as any;
    let npc = profile.dmScreen.accessNPC( Number.parseInt(npcPos) );
    npc[reqVar] = newVar;
    profile.updateDB();

    res.send ( "NPC was modified" );
  } )

  /**
   * This returns all of the NPC's in NPCList in DMScreen and sends them as a JSON Obj
   */
  server.get('/ReturnNPCs', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username); //Maybe I should have a check for if profile is null ?
    let npcList = profile.dmScreen.npcList;

    res.send ( JSON.stringify(npcList) );
  } )

  //The port that the webserver has
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
