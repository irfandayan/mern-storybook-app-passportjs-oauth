import moment from "moment";

const formatDate = (date, format) => {
  return moment(date).format(format);
};

export default formatDate;
