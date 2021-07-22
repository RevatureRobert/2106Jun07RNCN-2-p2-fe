import { ShallowWrapper } from "enzyme";

/**
 * Prints console.log(message, value) only if environment variable ALERT is set 
 * to 'on'.
 * 
 * @param message - string to print to console
 * @param value (optional) variable to print after string
 */
export function alert(message:string, value:any){
    const verbose = process.env.ALERT === "on";
    if (verbose){
        if (value != undefined && value != null){
            console.log(message, value);
        }   
        else {
            console.log(message);
        }  
    }
}

export function diveLikeCrazy(numberOfDives:number, shallow:ShallowWrapper){
    const display = shallow.debug();
    if (numberOfDives<=0){
      console.log('Dive 0: \n', display);
    }
    else {
      console.log(`Dive ${numberOfDives}: \n`, display);
      numberOfDives--;
      diveLikeCrazy(numberOfDives, shallow.dive());
    }
  }