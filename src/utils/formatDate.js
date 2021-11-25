/*
Function for formatting strings like "2019-08-06 12:34"
Gets date string in format like above and formatting type
1 (default): 12.06.2021 13:29
2: 12 ИЮНЯ 2021
*/

const ISOStringPayloadLength = "2021-11-25T16:21".length;

const monthArray = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function formatDateString(dateString, type = 1) {
  try {
    const dateStringSplitted = dateString.split(" ");
    switch (type) {
      case 2: {
        const dateArray = dateStringSplitted[0].split("-").reverse();
        dateArray[1] = monthArray[parseInt(dateArray[1]) - 1];
        return dateArray.join(" ");
      }
      default: {
        return (
          dateStringSplitted[0].split("-").reverse().join(".") +
          " " +
          dateStringSplitted[1]
        );
      }
    }
  } catch {
    return "wrong date format";
  }
}

function dateObjectToString(dateObj) {
  try {
    return dateObj
      .toISOString()
      .slice(0, ISOStringPayloadLength)
      .split("T")
      .join(" ");
  } catch {
    return "wrong date format";
  }
}

export { formatDateString, dateObjectToString };
