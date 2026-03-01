import { useEffect, useState } from "react";
import styles from "./New.module.css";
import { Button, Field, ImageInput, Input, TextEditor } from "@/components";
import { useEditPost, useForm, useUploadImage, useUser } from "@/hooks";
import { categories } from "./company";
import { Link, useSearchParams } from "react-router-dom";
import { getPostByIdApi } from "@/services";
import { Post } from "@itaaj/entities";

const EditBlog = () => {
  const { user } = useUser();
  const { editPost, isEditing } = useEditPost();
  const { isLoading, url, uploadImage } = useUploadImage();
  const [content, setContent] = useState("");

  const [searchParams] = useSearchParams();
  const postFound = !searchParams.get("post") ? "" : searchParams.get("post");
  const [postData, setPostData] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      if (postFound) {
        const data = await getPostByIdApi(postFound);
        setPostData(data);
      }
    };
    fetchPost();
  }, [postFound]);

  useEffect(() => {
    if (postData) {
      handleSyntheticChange("title", postData.title);
      handleSyntheticChange("excerpt", postData.excerpt);
      handleSyntheticChange("category", postData.category);
      setContent(postData.content);
    }
  }, [postData]);

  const handleSyntheticChange = (name: string, value: string) => {
    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  // const duration = calculateReadingTime(content);

  const { formState: post, handleChange } = useForm({
    id: "",
    company: "",
    title: "",
    category: "",
    author: user?.uuid,
    featuredImage: url,
    socialImage: url,
    language: "",
    excerpt: "",
  });

  const onSubmit = () => {
    editPost({
      ...post,
      id: postData?.id,
      featuredImage: url ? url : postData?.featuredImage,
    });
  };

  return (
    <div className={styles.container_post_form}>
      <div className={styles.content_form_post}>
        <div className={styles.iz}>
          <div className={styles.header}>
            <span>Paso 1</span>
            <h2>Editar un post</h2>
          </div>
          <div className={styles.container_post}>
            <div className={styles.post_body}>
              <div className={styles.form}>
                <Field label="Titulo" tip="Escribe un titulo para tu post">
                  <Input
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  label="Descripcion"
                  tip="Escribe una descripcion breve de tu post"
                >
                  <textarea
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Contenido del post">
                  <TextEditor
                    value={content}
                    onChange={handleEditorChange}
                    className="page"
                  />
                </Field>
              </div>
            </div>
          </div>
          <div className={styles.footer_form_post}>
            <Link to={"/blogs"}>Descartar</Link>
          </div>
        </div>

        <div className={styles.der}>
          <div className={styles.header}>
            <span>Paso 2</span>
            <h2>Ultimos pasos</h2>
          </div>
          <div className={styles.selects_step}>
            <Field label="Categoria">
              <select name="category" onChange={handleChange}>
                <option value="">
                  {postData ? postData.category : "Selecciona una categoria"}
                </option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cargar imagen">
              <ImageInput
                uploadImage={uploadImage}
                loading={isLoading}
                src={url}
                alt=""
                width={300}
                height={300}
              />
            </Field>
            <div className={styles.image_bd}>
              <img src={url ? url : postData?.featuredImage} alt="image-new" />
            </div>
          </div>
          <div className={styles.footer_form_post_der}>
            <Button className={styles.btn_draft} variant="cancel">
              Guardar Borrador
            </Button>
            <Button onClick={() => onSubmit()} loading={isEditing}>
              Actualizar post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
