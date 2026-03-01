import { Button } from "@/components";
import { Modal } from "@/containers";
import PostForm from "./PostForm";
import { Post } from "@itaaj/entities";

interface Props {
  postToEdit?: Partial<Post> | undefined;
  onCloseModal?: () => void;
}

const CreatePost = ({ postToEdit = {} }: Props) => {
  const { uuid: postId } = postToEdit;
  const isEditSession = Boolean(postId);
  return (
    <Modal>
      <Modal.Open opens="brand-form">
        <Button>Create Post</Button>
      </Modal.Open>
      <Modal.Window
        title={isEditSession ? "Edit Post" : "Create Post"}
        name="brand-form"
      >
        <PostForm postToEdit={postToEdit} />
      </Modal.Window>
    </Modal>
  );
};

export default CreatePost;
