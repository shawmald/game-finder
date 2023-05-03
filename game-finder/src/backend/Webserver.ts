/**
 * This is the webserver where all of the commands that frontend would need can be accessed.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { ProfileManagement } from "./ProfilesManagement"; 
import { MongoDB } from "./mongoDB";   
import { Profile } from "./Profile";

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
    const tags = req.query.Tags as Array<string>;
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
    console.log( JSONConversion );
    profile.setMongoDB(db);
    res.send( JSON.stringify(JSONConversion) );
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
   * DONE
   */
  server.get('/AddCharacterSheet', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charName = req.query.CharacterName as string;
    const race = req.query.Race as string;
    const background   = req.query.Background as string;
    const backstory = req.query.Backstory as string;
    const lvl = req.query.Lvl as string;
    const charClass = req.query.CharacterClass as string;
    const equipment = req.query.Equipment as string;
    const stats = convertStrToNum( req.query.Stats as string ); //Change to Array<number>
    const statMods =  convertStrToNum( req.query.StatModifiers as string );  //Change to Array<number>
    const combatStats =  convertStrToNum( req.query.CombatStats as string ); //Change to Array<number>
    const money =  convertStrToNum( req.query.Money as string ); //Change to Array<number>
    //const spells = null as any; //This is to add spells later
    const skills = req.query.Skills as Array<string>;
    const pictures = req.query.Pictures as Array<string>;
    profile.createCharSheet(charName, race, background, backstory, lvl, charClass, equipment, stats, statMods,
    combatStats, money, skills, pictures);

    res.send( "Character Sheet should be uploaded to profile" );
  } )

  /**
   * DONE
   */
  server.get('/AddSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charName = req.query.CharacterName as string;
    let charSheet = profile.accessCharacterSheet(charName);

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

    charSheet.createSpell(spellName, castingTime, range, duration, desc, spellLvl, school, components, races, reqClasses, db);

    res.send( "Spell has been added to character sheet" );
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
   * DONE
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
   * TO-DO
   */
  server.get('/RecommendSpells', async (req: Request, res: Response) => {
    const username = req.query.Username as string;
    let profile = await profileManagement.accessUser(username);
    const charPos = Number.parseInt( req.query.CharacterName as string );
    let charSheet = profile.accessCharacterSheet(charPos);
    let recSpells = charSheet.spellRecommendation();
    
    res.send ( JSON.stringify(recSpells) );
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
