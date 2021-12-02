/*
Function for formatting strings like "2019-08-06 12:34" / date objects
Gets date string in format like above / date object and formatting type
1 (default): 12.06.2021 13:29
2: 12 ИЮНЯ 2021
*/

const ISOStringPayloadLength = "2021-11-25T16:21".length;

const yearString = " г.";

const formatterFullMonth = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const formatterDefault = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatDate(date, type = 1) {
  try {
    let dateObj;
    if (typeof date === "string") dateObj = new Date(date);
    else dateObj = date;
    switch (type) {
      case 2: {
        return formatterFullMonth.format(dateObj).replace(yearString, "");
      }
      default: {
        return formatterDefault.format(dateObj).replace(",", "");
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

export { formatDate, dateObjectToString };
