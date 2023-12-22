import dayjs from "dayjs";

const formatDate = (date: string) => {
  return dayjs(date).format('DD, MMM, YYYY');
}

export default {
  formatDate,
}
