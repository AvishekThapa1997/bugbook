"use client";
import React, { ComponentProps, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/Dialog";
import { Box, Button, LoadingButton } from "../ui";
import { cn } from "../../../lib";

type DialogAction = Omit<ComponentProps<typeof LoadingButton>, "children"> & {
  text: string;
  showLoadingAction?: boolean;
};

interface BaseDialogProps {
  title: ReactNode;
  trigger?: ReactNode;
  description?: ReactNode;

  dialogProps?: ComponentProps<typeof Dialog>;
  triggerProps?: ComponentProps<typeof DialogTrigger>;
  contentProps?: ComponentProps<typeof DialogContent>;
  headerProps?: ComponentProps<typeof DialogHeader>;
  titleProps?: ComponentProps<typeof DialogTitle>;
  descriptionProps?: ComponentProps<typeof DialogDescription>;
  footerProps?: ComponentProps<typeof DialogFooter>;
  actionProps: {
    container?: ComponentProps<typeof Box>;
    positive: DialogAction;
    negative: DialogAction;
  };
}
const BaseDialog = React.memo(
  ({
    title,
    actionProps,
    trigger,
    description = <></>,

    dialogProps = {},
    triggerProps = {},
    contentProps = {},
    headerProps = {},
    titleProps = {},
    descriptionProps = {},
    footerProps = {}
  }: BaseDialogProps) => {
    const { open, ...remainingDialogProps } = dialogProps;
    const { className: actionContainerClasses } = actionProps.container ?? {};
    const {
      text: postiveActionText,
      showLoadingAction: showPositiveActionAsLoadingAction,
      onClick: handlePositiveAction,
      isLoading: isPostiveActionLoading,
      disabled: positiveActionDisabled,
      ...postiveActionProps
    } = actionProps.positive ?? {};
    const {
      text: negativeActionText,
      showLoadingAction: showNegativeActionAsLoadingAction,
      isLoading: isNegativeActionLoading,
      onClick: handleNegativeAction,
      disabled: negativeActionDisabled,
      ...negativeActionProps
    } = actionProps.negative ?? {};
    const openDialog =
      open || isPostiveActionLoading || isNegativeActionLoading;
    const isActionsDisabled = positiveActionDisabled || negativeActionDisabled;
    return (
      <Dialog
        open={openDialog}
        {...remainingDialogProps}
      >
        {trigger && <DialogTrigger {...triggerProps}>{trigger}</DialogTrigger>}
        <DialogContent {...contentProps}>
          <DialogHeader {...headerProps}>
            <DialogTitle {...titleProps}>{title}</DialogTitle>
            <DialogDescription {...descriptionProps}>
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter {...footerProps}>
            <Box
              className={cn(
                "flex justify-center gap-2 sm:justify-end",
                actionContainerClasses
              )}
            >
              <LoadingButton
                onClick={handlePositiveAction}
                {...postiveActionProps}
                disabled={isActionsDisabled}
                isLoading={isPostiveActionLoading}
              >
                {postiveActionText}
              </LoadingButton>
              <LoadingButton
                onClick={handleNegativeAction}
                disabled={isActionsDisabled}
                {...negativeActionProps}
                isLoading={isNegativeActionLoading}
              >
                {negativeActionText}
              </LoadingButton>
            </Box>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
BaseDialog.displayName = "BaseDialog";
export { BaseDialog };
