"use client";

import styles from "./TextEditor.module.css";
import ReactQuill, { ReactQuillProps } from "react-quill";

// IMPORTANTE: importar el CSS de react-quill, no de quill
import "react-quill/dist/quill.snow.css";

interface Props extends ReactQuillProps {
  className?: string;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = ({ className, ...rest }: Props) => {
  const containerClass =
    className === "page" ? "container_page" : styles.container;

  return (
    <div className={containerClass}>
      <ReactQuill
        {...rest}
        theme="snow"
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        className={styles.editor}
      />
    </div>
  );
};

export default TextEditor;
