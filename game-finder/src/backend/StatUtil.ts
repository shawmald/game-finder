/**
 * Stat Utility Class
 * 
 * contains methods for calculating various stats
 * 
 * @author Sydney Silverman
 */
export class StatUtil{

    constructor(){}

    /**
     * Calculate a stat's modifier given the stat.
     * 
     * @param stat (number)
     * @returns (number)
     */
    public calcMod( stat: number | undefined ): number;
    public calcMod( stat: number ): number {
        let mod: number = <number>stat;

        if( (mod % 2) != 0 ){ mod -= 1; }   //if number is odd: subtract one
        mod = (mod-10)/2;

        return mod;
    }

    /**
     * Test calcMod() with inputs 1-30
     * @returns (string)
     */
    public test_calcMod(): string {
        let output: string = ``;

        for( let i=1; i<31; i++ ){
            output += `Stat: ${i}\tMod: ${this.calcMod(i)}\n`
        }

        return output;
    }
    
}