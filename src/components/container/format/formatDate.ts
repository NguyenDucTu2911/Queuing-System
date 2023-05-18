import moment from "moment";

const formatDate = (date: Date) => {
    return moment().format("YYYY-DD-MM");
}

export default formatDate;