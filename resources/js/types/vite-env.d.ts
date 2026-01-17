/// <reference types="vite/client" />

declare function route(name: string, params?: any, absolute?: boolean, config?: any): string;
declare function route(): { current: (name?: string, params?: any) => boolean };
