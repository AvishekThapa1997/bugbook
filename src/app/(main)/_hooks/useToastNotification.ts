import { error } from "console";
import toast from "react-hot-toast";

type ToastOptions = Parameters<typeof toast>[1] & {
  type?: "success" | "error" | "custom" | "loading" | "blank";
};

export const useToastNotification = (
  toastOptions: ToastOptions = { type: "success" }
) => {
  const showToast = (
    message?: string,
    options: ToastOptions = { type: toastOptions.type }
  ) => {
    // @ts-ignore
    toast[options.type!](message ?? "Something went wrong.Please try again.", {
      ...toastOptions,
      ...options
    });
  };
  return showToast;
};
