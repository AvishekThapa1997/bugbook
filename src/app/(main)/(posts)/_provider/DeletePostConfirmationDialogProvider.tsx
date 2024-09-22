import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState
} from "react";
import { PostDto } from "../../../dto/postDto";

type DeletePostConfirmationDialogContext = {
  postId: PostDto["id"];
  open?: boolean;
  setPostId: Dispatch<SetStateAction<PostDto["id"]>>;
  closeDialog: () => void;
};

export const DeletePostConfirmationDialogContext =
  createContext<DeletePostConfirmationDialogContext | null>(null);

export const DeletePostConfirmationDialogProvider = ({
  children
}: PropsWithChildren) => {
  const [postId, setPostId] = useState<PostDto["id"]>("");
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const closeDialog = useCallback(() => {
    setDialogVisibility(false);
    setPostId("");
  }, []);
  return (
    <DeletePostConfirmationDialogContext.Provider
      value={{
        closeDialog,
        postId,
        setPostId,
        open: dialogVisibility || !!postId
      }}
    >
      {children}
    </DeletePostConfirmationDialogContext.Provider>
  );
};
