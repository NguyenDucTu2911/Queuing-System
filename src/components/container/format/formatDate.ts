import moment from "moment";

const formatDate = (date: Date) => {
    return moment().format("hh:mm DD-MM-YYYY");
}

export default formatDate;