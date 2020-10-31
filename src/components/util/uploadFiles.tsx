import { UpHere } from '../../UpHere';
import { IUpHere } from './IUpHere';

export const uploadFiles = (
  opts: Pick<IUpHere, 'multiple' | 'onError' | 'onSuccess'>,
  upHere: UpHere,
) => async (files: FileList | null) => {
  const { multiple, onSuccess, onError } = opts;
  if (files) {
    if (multiple) {
      const result = await Promise.all(
        Array.from(files).map((f) => upHere.uploadToAzure(f)),
      );
      if (result.every((v) => v._tag === 'Right')) {
        result.map((v) => onSuccess(v));
      } else {
        result.filter((v) => v._tag === 'Left').map((s) => onError(s));
      }
    } else {
      const result = await upHere.uploadToAzure(files[0]);
      if (result._tag === 'Right') {
        onSuccess(result.right);
      } else {
        onError(result.left);
      }
    }
  }
};
