export const DataParserUtils = {
  parseDisplayedData: items => {
    let currentTime = Date.now();
    let result = [...items];
    for (let i = 0; i < items.length; i++) {
      result[i] = {
        ...items[i],
        remainingDays: Math.round(
          (items[i].dueTime - currentTime) / (1000 * 60 * 60 * 24),
        ),
      };
    }
    return result;
  },
  getDisplayedDate: date => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  },
};
