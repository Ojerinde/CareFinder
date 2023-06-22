"use client";
import React, { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../UI/Button/Button";
import classes from "./TextEditor.module.css";

interface Props {
  onSubmit?: (data: string) => void;
}
const TextEditor: React.FC<Props> = ({ onSubmit }) => {
  const [showPreview, setShowPreview] = useState<"write" | "preview">("write");
  const [content, setContent] = useState<string>("");
  const updateContent = (event: FormEvent<HTMLTextAreaElement>) => {
    const text = event?.target as HTMLInputElement;
    setContent((prev) => text.value);
    if (onSubmit) onSubmit(text.value);
  };
  return (
    <div className={classes.text__editor}>
      {showPreview === "write" ? (
        <textarea
          className={classes.textarea}
          autoFocus
          placeholder="Write your content here...we support markdown also"
          value={content}
          onChange={updateContent}
        ></textarea>
      ) : (
        <ReactMarkdown className={classes.markdown} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      )}
      <div className={classes.btn__box}>
        <Button
          type="button"
          className={`${classes.button} ${
            showPreview === "write" && classes.active
          }`}
          onClick={() => setShowPreview((prev) => "write")}
        >
          Write
        </Button>
        <Button
          type="button"
          className={`${classes.button} ${
            showPreview === "preview" && classes.active
          }`}
          onClick={() => setShowPreview((prev) => "preview")}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};
export default TextEditor;
