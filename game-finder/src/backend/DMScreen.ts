/**
 * This is a screen that the DM can see to manage all of the NPC's.
 * This allows the DM to have the ability to :
 * AddNPCs() : Add a new NPC to the NPCList array.
 * RemoveNPCs() : Remove a NPC from the NPCList array at the specified position.
 * AccessNPC() : Returns the NPC information at the specified position.
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */


import { NPC } from "./npc"

export class DMScreen {
    
    public username! : string;
    public NPCList : Array<NPC> = new Array();


    /**
     * Constructor to conncet the DMScreen to a Username and create a blank array for NPC's to be stored in
     * Actually the username can probably be removed later as the information is no longer being stored through this class and is
     * instead being stored in Profile now.
     * @param username 
     * @param npcs 
     */
    constructor(username : string, npcs : Array<NPC>) {
        this.username = username;
        this.NPCList = npcs;
    }

    /**
     * This makes a new NPC with default values and adds it to the array
     * @param npcName 
     */
    public addNPC() {
        this.NPCList.push( new NPC() );
    }

    /**
     * This removes the NPC at the position that's given
     * @param npcPos 
     */
    public removeNPC(npcPos : number) {
        if (npcPos > -1) {
            this.NPCList.splice(npcPos, 1);
        }
    }

    /**
     * Checks if there's a NPC at the position, and if there isn't then a string is sent back saying there's no NPC at that position.
     * @param npcPos 
     * @returns the NPC if that position exists in the array or a string saying that there's no NPC at this position.
     */
    public accessNPC(npcPos : number) {
        if( this.NPCList[npcPos] != null) {
            return this.NPCList[npcPos];
        }
        else {
            return "The npc is null and hasn't been created in this position yet"
        }
    }
}