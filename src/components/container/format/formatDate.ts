import moment from "moment";

const formatDate = (date: Date) => {
  return moment().format("hh:mm DD-MM-YYYY");
};

export const formatDay = (date: Date) => {
  return moment().format("DD-MM-YYYY");
};

export const formatDateMon = (date: any) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

export default formatDate;
