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