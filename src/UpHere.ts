import {
  AnonymousCredential,
  BlobServiceClient,
  ContainerClient,
} from '@azure/storage-blob';

import {
  left,
  right,
  Right,
  Left,
} from 'fp-ts/lib/Either';

type __UpHere__<T> = Right<T> | Left<Error>

type Up = {
  url: string,
  blobName: string,
  accountName: string,
  fileSize: number,
  fileName: string,
  fileType: string,
}

export class UpHere {

  account: string;
  accountSas: string;
  containerName: string;

  constructor(account: string, accountSas: string, containerName: string) {
    this.account = account;
    this.accountSas = accountSas;
    this.containerName = containerName;
  }

  /**
   * Upload to Azure blob storage in browser
   * @param file
   * @param blockBlobClient
   */
  uploadToAzure = async (file: File): Promise<__UpHere__<Up>> => {
    try {
      const blockBlobClient = this.azGetBlockBlobClient(
        file.name,
        this.azGetContainerClient(this.azGetBlobServiceClient()),
      );

      await blockBlobClient.uploadBrowserData(file, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      });

      return right({
        url: blockBlobClient.url,
        blobName: blockBlobClient.name,
        accountName: blockBlobClient.accountName,
        fileSize: file.size,
        fileName: file.name,
        fileType: file.type,
      });
    } catch (err: unknown) {
      return left(err as Error);
    }
  };

  deleteBlob = async (blobName: string) => {
    const blockBlobClient = this.azGetBlockBlobClient(
      blobName,
      this.azGetContainerClient(this.azGetBlobServiceClient()),
    );
    return await blockBlobClient.delete();
  }

  /**
   *
   * @param blobName
   * @param containerClient
   */
  azGetBlockBlobClient = (
    blobName: string,
    containerClient: ContainerClient,
  ) => containerClient.getBlockBlobClient(blobName);

  /**
   *
   * @param blobServiceClient
   */
  azGetContainerClient = (blobServiceClient: BlobServiceClient) => blobServiceClient.getContainerClient(this.containerName);

  azGetBlobServiceClient = () => {
    const anonymousCredential = new AnonymousCredential();
    return new BlobServiceClient(
      `https://${this.account}.blob.core.windows.net${this.accountSas}`,
      anonymousCredential,
    );
  };
}
