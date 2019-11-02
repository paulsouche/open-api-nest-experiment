declare module 'openapi-to-typescript' {
  export const GenerateTypings: (schema: any) => Promise<string>;
}
