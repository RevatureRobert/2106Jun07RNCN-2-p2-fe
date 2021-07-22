import { ShallowWrapper } from "enzyme";

/**
 * Prints console.log(message, value) only if environment variable ALERT is set
 * to 'on'.
 *
 * @param message - string to print to console
 * @param value (optional) variable to print after string
 */
export function alert(message: string, value: any) {
  const verbose = process.env.ALERT === 'on';
  if (verbose) {
    if (value != undefined && value != null) {
      console.log(message, value);
    } else {
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

export function formatTimestamp(unformattedTimestamp: Date): string {
  // Setting up days/months arrays for use in timestamps.
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  // Create hours and ampm variables and set them using an anonymous function
  let hours = 0;
  let ampm = 'AM';
  (() => {
    if (unformattedTimestamp.getHours() === 0) {
      hours = 12;
      ampm = 'AM';
    } else if (
      unformattedTimestamp.getHours() > 0 &&
      unformattedTimestamp.getHours() < 12
    ) {
      hours = unformattedTimestamp.getHours();
      ampm = 'AM';
    } else if (unformattedTimestamp.getHours() === 12) {
      hours = 12;
      ampm = 'PM';
    } else if (unformattedTimestamp.getHours() > 12) {
      hours = unformattedTimestamp.getHours() - 12;
      ampm = 'PM';
    }
  })();

  // Actually create formatted timestamp: Day Date Month Year at Time (12 hr)
  return (
    days[unformattedTimestamp.getDay()] +
    ' ' +
    unformattedTimestamp.getDate().toString() +
    ' ' +
    months[unformattedTimestamp.getMonth()] +
    ' ' +
    unformattedTimestamp.getFullYear().toString() +
    ' at ' +
    hours.toString() +
    ':' +
    unformattedTimestamp.getMinutes().toString().padStart(2, '0') +
    ' ' +
    ampm
  );
}
