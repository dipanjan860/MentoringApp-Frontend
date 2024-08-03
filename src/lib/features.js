import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtention = url.split(".").pop();

  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  ) {
    return "video";
  }

  if (fileExtention === "mp3" || fileExtention === "wav") {
    return "audio";
  }

  if (
    fileExtention === "png" ||
    fileExtention === "jpg" ||
    fileExtention === "jpeg" ||
    fileExtention === "gif"
  ) {
    return "image";
  }

  return "file";
};

const transformImage = (url = "", width = 100) => url;

const getLast7days = () => {
  const currDate = moment();

  const last7days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7days.unshift(dayName);
  }

  return last7days;
};

export { fileFormat, transformImage, getLast7days };
