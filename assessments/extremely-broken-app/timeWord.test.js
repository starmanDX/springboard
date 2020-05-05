const timeWord = require('./timeWord');

describe('All #timeWord functions', () => {
  test('#timeToWords is a function', () => {
    expect(typeof timeWord.timeToWords).toBe('function');
  });
  test('#convertHoursToWord is a function', () => {
    expect(typeof timeWord.convertHoursToWord).toBe('function');
  });
  test('#convertMinutesToWords is a function', () => {
    expect(typeof timeWord.convertMinutesToWords).toBe('function');
  });
});

describe("#convertHoursToWord", function () {
  test("should return 'twelve' if hour is '00'", function () {
    expect(timeWord.convertHoursToWord('00')).toBe('twelve');
  });
  test("should convert 24-hour string to 12-hour word", function () {
    expect(timeWord.convertHoursToWord('13')).toBe('one');
    expect(timeWord.convertHoursToWord('24')).toBe('twelve');
  });
  test("should convert 12-hour string to 12-hour word", function () {
    expect(timeWord.convertHoursToWord('01')).toBe('one');
    expect(timeWord.convertHoursToWord('12')).toBe('twelve');
  });
});

describe("#convertMinutesToWords", function () {
  test("should return 'o'clock' if minutes are '00'", function () {
    expect(timeWord.convertMinutesToWords('00')).toBe("o'clock");
  });
  test("should return 'oh (minute)' if minutes are less than 10", function () {
    expect(timeWord.convertMinutesToWords('01')).toBe('oh one');
    expect(timeWord.convertMinutesToWords('09')).toBe('oh nine');
  });
  test("should convert sub-20 minute string to sub-20 minute word", function () {
    expect(timeWord.convertMinutesToWords('10')).toBe('ten');
    expect(timeWord.convertMinutesToWords('19')).toBe('nineteen');
  });
  test("should convert minute string to minute word", function () {
    expect(timeWord.convertMinutesToWords('20')).toBe('twenty');
    expect(timeWord.convertMinutesToWords('29')).toBe('twenty nine');
    expect(timeWord.convertMinutesToWords('50')).toBe('fifty');
    expect(timeWord.convertMinutesToWords('59')).toBe('fifty nine');
  });
  test("should return unknown if tens minute is above 5", function () {
    expect(timeWord.convertMinutesToWords('60')).toBe('unknown');
    expect(timeWord.convertMinutesToWords('69')).toBe('unknown');
  });
});

describe("#timeToWords", function () {
  test("should return 'midnight' if hours and minutes are '00'", function () {
    expect(timeWord.timeToWords('00:00')).toBe('midnight');
  });
  test("should return 'noon' if hours are '12' and minutes are '00'", function () {
    expect(timeWord.timeToWords('12:00')).toBe('noon');
  });
  test("should convert am time to am words", function () {
    expect(timeWord.timeToWords('01:00')).toBe("one o'clock am");
    expect(timeWord.timeToWords('00:01')).toBe("twelve oh one am");
    expect(timeWord.timeToWords('11:59')).toBe("eleven fifty nine am");
  });
  test("should convert pm time to pm words", function () {
    expect(timeWord.timeToWords('13:00')).toBe("one o'clock pm");
    expect(timeWord.timeToWords('13:01')).toBe("one oh one pm");
    expect(timeWord.timeToWords('23:59')).toBe("eleven fifty nine pm");
  });
});