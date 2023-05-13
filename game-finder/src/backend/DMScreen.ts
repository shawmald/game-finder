/**
 * This is a screen that the DM can see for managing all of the enemies and npc's.
 * Later this could implement a map that they can see and share with the users in the group that they are managing.
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */

import { MongoDB } from "./mongoDB";
import { NPC } from "./npc"

export class DMScreen {
    
    public username! : string;
    public NPCList : Array<NPC> = new Array();
    public db! : MongoDB;


    constructor(username : string, db : MongoDB) {
        this.username = username;
        this.db = db;
    }

    public addNPC(npcName : string) {
        this.NPCList.push( new NPC(npcName) );
        this.saveNPC();
    }

    public removeNPC(npcPos : number) {
        if (npcPos > -1) {
            this.NPCList.splice(npcPos, 1);
        }

        this.saveNPC();
    }

    public accessNPC(npcPos : number) {
        if( this.NPCList[npcPos] != null) {
            return this.NPCList[npcPos];
        }
        else {
            return "The npc is null and hasn't been created in this position yet"
        }
    }

    public saveNPC() {
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "GMScreen", this.NPCList);
    }
}