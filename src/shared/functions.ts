/**
 * Prints message to console only if environment variable ALERT_VERBOSE is set 
 * to the string 'true'.
 * 
 * @param message 
 * @param value 
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