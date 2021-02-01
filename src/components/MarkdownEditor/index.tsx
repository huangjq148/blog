import React, { useState, useEffect } from 'react'
// import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
import SimpleMDE from "react-simplemde-editor";
import styles from "./index.less"
import "./easymde.min.css";
import "./preview.less";
import "./css/font-awesome.min.css";

// https://github.com/Ionaru/easy-markdown-editor#options-list

declare interface Prop {
    value?: string;
    onChange?: (content: string) => void
};


const EditPage: React.FC<Prop> = (props) => {
    // const [content, setContent] = useState(props.value || "# Just a title  ,Just a default content")

    // useEffect(() => {
    //     if (props.onChange) {
    //         props.onChange(content)
    //     }
    // }, [content])

    return (
        <div className={styles.container1}>
            <SimpleMDE
                className={styles.editor}
                id="your-custom-id"
                value={props.value}
                options={{
                    sideBySideFullscreen: false,
                    spellChecker: false,
                    maxHeight: '300px',
                    toolbar: [
                        'bold',
                        'italic',
                        'heading',
                        '|',
                        'quote',
                        'code',
                        'table',
                        'horizontal-rule',
                        'unordered-list',
                        'ordered-list',
                        '|',
                        'link',
                        'image',
                        '|',
                        'side-by-side',
                        'fullscreen',
                        '|',
                        'guide'
                    ]
                }}
                onChange={props.onChange}
            />
        </div>
    )
}

export default EditPage