import { Button, Field, ImageInput, Input, TextEditor } from "@/components";
import {
  useCreatePost,
  useEditPost,
  useForm,
  useUploadImage,
  useUser,
} from "@/hooks";
import { useState } from "react";
import styles from "./Create.module.css";
import { categories } from "./company";
import { Post } from "@itaaj/entities";
import { calculateReadingTime } from "@/utilities/calcualte-reading-time";

interface Props {
  postToEdit?: Partial<Post> | undefined;
  onCloseModal?: () => void;
}

const PostForm = ({ postToEdit = {}, onCloseModal }: Props) => {
  const { editPost } = useEditPost();
  const { uuid: postId, ...editValues } = postToEdit;
  const isEditSession = Boolean(postId);

  const [content, setContent] = useState("");
  const { user } = useUser();
  const { isLoading, urls, url, uploadImage } = useUploadImage();
  console.log("IMAGENES", url, urls);
  const { isCreating, createPost } = useCreatePost();

  const { formState: post, handleChange } = useForm(
    isEditSession
      ? editValues
      : {
          company: "",
          title: "",
          category: "",
          author: user?.uuid,
          featuredImage: url,
          socialImage: url,
          language: "",
          excerpt: "",
        }
  );

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const onSubmit = (data: Partial<Post>) => {
    if (isEditSession) {
      editPost(
        { ...data, uuid: postId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createPost(
        {
          ...post,
          socialImage: url,
          featuredImage: url,
          content,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    }
  };

  const duration = calculateReadingTime(content);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Crear Post</h3>
      </div>

      <div className={styles.grid}>
        <div>
          <Field label="Title" tip="Write a title for your post">
            <Input name="title" value={post.title} onChange={handleChange} />
          </Field>

          <Field label="Category">
            <select name="category" onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Language">
            <select name="language" onChange={handleChange}>
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>
          </Field>
          <Field label="In General?">
            <Input type="checkbox" />
          </Field>
          <ImageInput
            uploadImage={uploadImage}
            loading={isLoading}
            src={url}
            alt=""
            width={300}
            height={300}
          />
          <Field label="Description" tip="Write a description">
            <textarea name="excerpt" onChange={handleChange} />
          </Field>
        </div>
        <div>
          <Field label="Content">
            <TextEditor
              value={content}
              onChange={handleEditorChange}
              className="page"
            />
          </Field>
        </div>
        <Button
          onClick={() =>
            onSubmit({
              ...post,
              duration: duration.toString(),
              socialImage: url,
              featuredImage: url,
              content,
            })
          }
          loading={isCreating}
        >
          Crear
        </Button>
      </div>

      {/* <ConfirmModal title="Post created sucessfully" cancelText="Boom yeah!!!" isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};

export default PostForm;
