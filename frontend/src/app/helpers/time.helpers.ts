import * as moment from "moment";

export const parseTimeToLocalFromNow = (time: string) => {
  if (!time) {
    return "";
  }

  const currentTime = moment();
  const startTime = moment(time).local();

  var duration = moment.duration(currentTime.diff(startTime));
  var hours = duration.asHours();

  if (hours > 24)
    return startTime.fromNow();

  return startTime.format("HH:mm:ss DD/MM/YYYY");
};