import React from 'react';

export interface IUpHereComponent {
  accountName: string;
  accountSas: string;
  containerName: string;
  multiple:boolean;
  onSuccess<Up>(t: Up): void;
  onError<Error>(e: Error): void;
}
