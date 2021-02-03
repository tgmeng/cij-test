exports.calcAverageActualTime = timeList =>
  timeList.reduce((result, time) => result + time, 0) / timeList.length;
