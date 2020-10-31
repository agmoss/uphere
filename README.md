# `uphere` [![NPM](https://img.shields.io/npm/v/uphere?style=for-the-badge)](https://www.npmjs.com/package/uphere)

> Upload files to azure

## API

```typescript
interface IUpHere{
  account:string;
  accountSas:string;
  containerName:string;
}
```

## Component API

```typescript
export interface IUpHereComponent {
  accountName: string;
  accountSas: string;
  containerName: string;
  multiple:boolean;
  onSuccess<T>(t: T): void;
  onError<E>(e: E): void;
}
```

### Button

```typescript
const UpHereButton: (p: IUpHereComponent) => <D extends React.ElementType<any> = "button", P = {}>(props: OverrideProps<ButtonTypeMap<P, D>, D>) => JSX.Element
```

### HOC

```typescript
const withUpHere: (p: IUpHereComponent) => <T extends object>(WrappedComponent: React.ComponentType<T>) => React.FC<T>
```
