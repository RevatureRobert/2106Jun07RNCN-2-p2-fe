import { formatTimestamp } from '../../../src/shared/functions';

/*
Return should be a string like:
    Wed 28 Jul 2021 at 3:13 PM
    Thu 29 Jul 2021 at 12:16 PM

 > Shows AM or PM
 > Weekday and Month are three letters long
 > Do not print 3:13 PM as '03:13 PM'
*/

let date;

it('displays AM time correctly', () => {
    date = new Date('July 26, 2021 03:14:00');
    expect(formatTimestamp(date)).toMatch('Mon 26 Jul 2021 at 3:14 AM');
});

it('displays high noon correctly', () => {
    date = new Date('July 27, 2021 12:00:00');
    expect(formatTimestamp(date)).toMatch('Tue 27 Jul 2021 at 12:00 PM');
});

it('displays afternoon correctly', () => {
    date = new Date('July 28, 2021 13:14:00');
    expect(formatTimestamp(date)).toMatch('Wed 28 Jul 2021 at 1:14 PM');
});

it('displays midnight correctly', () => {
    date = new Date('July 29, 2021 00:00:00');
    expect(formatTimestamp(date)).toMatch('Thu 29 Jul 2021 at 12:00 AM');
});