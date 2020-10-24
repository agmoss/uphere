import React, { useRef } from "react";

import { UpHere } from "./UpHere";

interface IUploadFile {
  accountName: string;
  accountSas: string;
  containerName: string;
}
export const UploadFile: React.FC<IUploadFile> = ({
  accountName,
  accountSas,
  containerName,
}: IUploadFile) => {
  const upHere = new UpHere(accountName, accountSas, containerName);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = (files: FileList | null) =>
    files && upHere.uploadToAzure(files[0]);

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
