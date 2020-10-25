import React, { useRef } from "react";

import { UpHere } from "./UpHere";

interface IUploadFile {
  accountName: string;
  accountSas: string;
  containerName: string;
  onSuccess<T>(t: T): void;
  onError<E>(e: E): void;
}
export const UploadFile: React.FC<IUploadFile> = ({
  accountName,
  accountSas,
  containerName,
  onSuccess,
  onError,
}: IUploadFile) => {
  const upHere = new UpHere(accountName, accountSas, containerName);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList | null) => {
    if (files) {
      const result = await upHere.uploadToAzure(files[0]);
      if (result._tag === "Right") {
        onSuccess(result.right);
      } else {
        onError(result.left);
      }
    }
  };

  const showFileDialog = () =>
    inputFileRef.current && inputFileRef.current.click();

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={inputFileRef}
        type="file"
        multiple={false}
        onChange={(e) => uploadFiles(e.target.files)}
      />
      <button onClick={() => showFileDialog()}>Upload</button>
    </div>
  );
};
