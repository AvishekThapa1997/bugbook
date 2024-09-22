import React, { useCallback } from "react";
import { BaseDialog } from "../../../_components/common/BaseDialog";
import { useDeletePost } from "../_hooks";
import { useDeletePostConfirmationDialog } from "../_hooks/useDeletePostConfirmationDialog";
import { useToastNotification } from "../../_hooks";

interface DeletePostConfirmationDialogProps {
  trigger?: React.ReactElement;
}

const DeletePostConfirmationDialog = ({
  trigger
}: DeletePostConfirmationDialogProps) => {
  const { open, postId, closeDialog } = useDeletePostConfirmationDialog();
  const { mutate, isPending } = useDeletePost(postId);
  const toast = useToastNotification();
  const handlePositiveAction = () => {
    mutate(postId, {
      onSuccess(data) {
        closeDialog();
        toast("Post is deleted successfully.", {
          type: "success"
        });
      },
      onError(error, variables, context) {
        console.log({ error, variables, context });
      }
    });
  };

  const handleNegativeAction = () => {
    if (!isPending) {
      closeDialog();
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && !isPending) {
      closeDialog();
    }
  };

  return (
    <BaseDialog
      dialogProps={{
        open,
        onOpenChange(open) {
          handleDialogOpenChange(open);
        }
      }}
      trigger={trigger}
      triggerProps={{ asChild: true }}
      title='Delete Post?'
      description='Are you sure you want to delete this post? This cannot be undone'
      contentProps={{
        id: "delete-dialog",
        className: "gap-6"
      }}
      actionProps={{
        positive: {
          variant: "destructive",
          text: "Delete",
          isLoading: isPending,
          onClick: handlePositiveAction
        },
        negative: {
          text: "Cancel",
          isLoading: false,
          variant: "outline",
          onClick: handleNegativeAction
        }
      }}
    />
  );
};

export { DeletePostConfirmationDialog };
