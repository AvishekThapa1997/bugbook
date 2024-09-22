import { useContext } from "react";
import { DeletePostConfirmationDialogContext } from "../_provider/DeletePostConfirmationDialogProvider";

export const useDeletePostConfirmationDialog = () => {
  const deleteConfirmationDialogContext = useContext(
    DeletePostConfirmationDialogContext
  );
  if (!deleteConfirmationDialogContext) {
    throw new Error(
      "useDeletePostConfirmationDialog must be used with DeletePostConfirmationDialogProvider"
    );
  }
  return deleteConfirmationDialogContext;
};
