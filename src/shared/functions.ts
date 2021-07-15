/**
 * Prints message to console only if environment variable ALERT_VERBOSE is set 
 * to the string 'true'.
 * 
 * @param message 
 * @param value 
 */
export function alert(message:string, value:any = undefined){
    const verbose = process.env.ALERT_VERBOSE === "true";
    if (verbose){
        if (value != undefined && value != null){
            console.log(message, value);
        }   
        else {
            console.log(message);
        }  
    }
}