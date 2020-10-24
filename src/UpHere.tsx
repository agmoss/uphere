import {
  AnonymousCredential,
  BlobServiceClient,
  ContainerClient,
} from "@azure/storage-blob";

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
   * Upload to Azure in browser
   * @param file
   * @param blockBlobClient
   */
  uploadToAzure = async (file: File) => {
    try {
      const blockBlobClient = this.azGetBlockBlobClient(
        file.name,
        this.azGetContainerClient(this.azGetBlobServiceClient())
      );

      await blockBlobClient.uploadBrowserData(file, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      });

      return {
        url: blockBlobClient.url,
        blobName: blockBlobClient.name,
        accountName: blockBlobClient.accountName,
        fileSize: file.size,
        fileName: file.name,
        fileType: file.type,
      };
    } catch (err) {
      throw err;
    }
  };

  /**
   *
   * @param blobName
   * @param containerClient
   */
  azGetBlockBlobClient = (
    blobName: string,
    containerClient: ContainerClient
  ) => {
    return containerClient.getBlockBlobClient(blobName);
  };

  /**
   *
   * @param blobServiceClient
   */
  azGetContainerClient = (blobServiceClient: BlobServiceClient) => {
    return blobServiceClient.getContainerClient(this.containerName);
  };

  azGetBlobServiceClient = () => {
    const anonymousCredential = new AnonymousCredential();
    return new BlobServiceClient(
      `https://${this.account}.blob.core.windows.net${this.accountSas}`,
      anonymousCredential
    );
  };
}
