import React, { ComponentType, useRef } from 'react';
import { IUpHereComponent } from './util/IUpHere';
import { UpHere } from '../UpHere';
import { uploadFiles } from './util/uploadFiles';

export const withUpHere = (p: IUpHereComponent) => <T extends object>(
  WrappedComponent: ComponentType<T>,
): React.FC<T> => ({ ...props }) => {
    const {
      accountName, accountSas, containerName, onSuccess, onError, multiple,
    } = p;

    const upHere = new UpHere(accountName, accountSas, containerName);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const showFileDialog = () => inputFileRef.current && inputFileRef.current.click();

    return (
      <div
        role="button"
        onClick={() => showFileDialog()}
        onKeyDown={() => showFileDialog()}
        tabIndex={0}
      >
        <input
          style={{ display: 'none' }}
          ref={inputFileRef}
          type="file"
          multiple={multiple}
          onChange={(e) => uploadFiles({ multiple, onError, onSuccess }, upHere)(e.target.files)}
        />
        <WrappedComponent {...(props as T)} />
      </div>
    );
  };
