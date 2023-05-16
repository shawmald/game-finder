/**
 * 
 * @author: Andrew Skevington-Olivera
 * @date: 13-5-23
 */



export class NPC {

    public name!: string;
    public lvl! : number;
    public class! : string;
    public notes! : string;
    public stats = [];  //Change it to map later
    public statModifiers = [];

    constructor(name : string) {
        this.name = name;
    }   
}