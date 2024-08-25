import { formatDistanceToNowStrict, formatDate } from "date-fns";
import { ErrorData } from "../../types";
import { CONSTANTS } from "../../constants";

const ONE_DAY = 24 * 60 * 60 * 1000;
export const formatRelativeDate = (from: Date) => {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < ONE_DAY) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  }
  if (currentDate.getFullYear() === from.getFullYear()) {
    return formatDate(from, "MMM d");
  }
  return formatDate(from, "MMM d, yyy");
};

export const isEmail = (input: string) => input.includes("@");

export const getErrorCode = (error?: ErrorData) => {
  if (!error) return CONSTANTS.ERROR_STATUS_CODE.SERVER_ERROR;
  return typeof error.code === "number"
    ? error.code
    : CONSTANTS.ERROR_STATUS_CODE.SERVER_ERROR;
};

export const sleep = (delay: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, delay);
  });
};

export const formatNumber = (n: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(n);
};
