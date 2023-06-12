import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "~/assets/scss/uploadpreview.scss";
import { AnyFunction } from "~/types";

interface UploadPreviewProp {
  onImgChange?: AnyFunction;
}

const UploadPreview = ({ onImgChange }: UploadPreviewProp) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const dragTextRef = useRef<HTMLSpanElement>(null);

  const [file, setFile] = useState<File>();
  const [img, setImg] = useState<string>("");

  // When browse
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
  };

  // when file is inside drag area
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (dropAreaRef.current && dragTextRef.current) {
      dropAreaRef.current.classList.add("active");
      dragTextRef.current.textContent = "Release to Upload";
    }
  };

  // when file leave the drag area
  const handleDragLeave = () => {
    if (dropAreaRef.current && dragTextRef.current) {
      // when file leave the drag area
      dropAreaRef.current.classList.remove("active");
      // console.log('File left the drag area');
      dragTextRef.current.textContent = "Drag & Drop";
    }
  };

  // when file is dropped
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    // console.log('File is dropped in drag area');

    setFile(event.dataTransfer.files[0]); // grab single file even of user selects multiple files
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = event?.target?.result;
      if (result && typeof result === "string") {
        setImg(result);
        onImgChange?.(result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      <div
        className="drag-area"
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {img && (
          <img
            src={img}
            alt="Uploaded Image"
            onClick={() => inputRef?.current?.click()}
          />
        )}
        {!img && (
          <>
            <div className="icon">
              <FontAwesomeIcon icon={faImages} />
            </div>
            <span className="header" ref={dragTextRef}>
              Drag & Drop
            </span>
            <span className="header">
              or{" "}
              <span
                className="button"
                onClick={() => inputRef?.current?.click()}
              >
                browse
              </span>
            </span>
            <span className="support">Supports: JPEG, JPG, PNG</span>
          </>
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png"
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
};

export default UploadPreview;
