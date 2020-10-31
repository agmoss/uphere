import { Button, ButtonTypeMap, ButtonProps } from '@material-ui/core';
import React, { useRef } from 'react';
import { UpHere } from '../UpHere';
import { IUpHereComponent } from './util/IUpHere';
import { uploadFiles } from './util/uploadFiles';

export const UpHereButton = (p: IUpHereComponent) => <
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
>(
    props: ButtonProps<D, P>,
  ) => {
  const {
    accountName, accountSas, containerName, onSuccess, onError, multiple,
  } = p;

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
      <Button {...props} onClick={() => showFileDialog()} />
    </div>

  );
};
