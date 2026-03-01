import { useState } from "react";
import styles from "./New.module.css";
import { Button, Field, ImageInput, Input, TextEditor } from "@/components";
import { useCreatePost, useForm, useUploadImage, useUser } from "@/hooks";
import { categories } from "./company";
import { calculateReadingTime } from "@/utilities/calcualte-reading-time";
import { Link } from "react-router-dom";

const NewBlog = () => {
  const { user } = useUser();
  const { isLoading, url, uploadImage } = useUploadImage();
  const [content, setContent] = useState("");
  const { isCreating, createPost } = useCreatePost();

  const { formState: post, handleChange } = useForm({
    company: "",
    title: "",
    category: "",
    author: user?.uuid,
    featuredImage: url,
    socialImage: url,
    language: "",
    excerpt: "",
  });

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const duration = calculateReadingTime(content);

  const onSubmit = () => {
    createPost({
      ...post,
      socialImage: url,
      featuredImage: url,
      content,
      duration: duration.toString(),
    });
  };

  return (
    <div className={styles.container_post_form}>
      <div className={styles.content_form_post}>
        <div className={styles.iz}>
          <div className={styles.header}>
            <span>Paso 1</span>
            <h2>Crear un post</h2>
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
                  <textarea name="excerpt" onChange={handleChange} />
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
                <option value="">Selecciona una categoria</option>
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
          </div>
          <div className={styles.footer_form_post_der}>
            <Button className={styles.btn_draft} variant="cancel">
              Guardar Borrador 
            </Button>
            <Button onClick={() => onSubmit()} loading={isCreating}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
