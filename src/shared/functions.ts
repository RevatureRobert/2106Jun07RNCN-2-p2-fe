/**
 * Prints message to console only if environment variable ALERT is set to 'on'.
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