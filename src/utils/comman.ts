import dayjs from "dayjs";

export function getNextMarketDate(): string {
  let date = dayjs();
  while (date.day() === 0 || date.day() === 6) {}
  return date.format("YYYY-MM-DD");
}
