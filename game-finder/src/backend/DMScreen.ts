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


    constructor(username : string, npcs : Array<NPC>) {
        this.username = username;
        this.NPCList = npcs;
    }

    public addNPC(npcName : string) {
        this.NPCList.push( new NPC(npcName) );
    }

    public removeNPC(npcPos : number) {
        if (npcPos > -1) {
            this.NPCList.splice(npcPos, 1);
        }
    }

    public accessNPC(npcPos : number) {
        if( this.NPCList[npcPos] != null) {
            return this.NPCList[npcPos];
        }
        else {
            return "The npc is null and hasn't been created in this position yet"
        }
    }
}