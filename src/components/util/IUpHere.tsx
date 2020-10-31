export interface IUpHere {
  accountName: string;
  accountSas: string;
  containerName: string;
  multiple:boolean;
  onSuccess<T>(t: T): void;
  onError<E>(e: E): void;
}
