import styles from './TextEditor.module.css';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'quill/dist/quill.snow.css'; 
interface Props extends ReactQuillProps {
    className?: string;
}

const TOOLBAR_OPTIONS = [
    [{header: [1,2,3,4,5,6,false]}],
    [{font: []}],
    [{list: "ordered"}, {list: "bullet"}],
    ["bold", "italic", "underline"],
    [{color: []}, {background: []}],
    [{script: "sub"}, {script: "super"}],
    [{align: []}],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const TextEditor = ({className, ...rest}: Props) => {
    return (
        <div className={className == 'page'? 'container_page' : styles.container}>
            <ReactQuill {...rest} modules={{toolbar: TOOLBAR_OPTIONS}} />
        </div>
    )
}

export default TextEditor