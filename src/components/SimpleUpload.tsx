import React, { useRef } from 'react';

import { UpHere } from '../UpHere';
import { IUpHere } from './util/IUpHere';
import { uploadFiles } from './util/uploadFiles';

export const SimpleUpload: React.FC<IUpHere> = ({
  accountName,
  accountSas,
  containerName,
  multiple,
  onSuccess,
  onError,
}: IUpHere) => {
  const upHere = new UpHere(accountName, accountSas, containerName);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const showFileDialog = () => inputFileRef.current && inputFileRef.current.click();

  return (
    <div>
      <input
        style={{ display: 'none' }}
        ref={inputFileRef}
        type="file"
        multiple={multiple}
        onChange={(e) => uploadFiles({ multiple, onError, onSuccess }, upHere)(e.target.files)}
      />
      <button onClick={() => showFileDialog()}>Upload</button>
    </div>
  );
};
