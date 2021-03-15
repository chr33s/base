import { Browser, Page } from "playwright";

declare global {
  const page: Page;
  const browser: Browser;
  const browserName: string;
}

declare module "*.css" {
  const css: any;
  export default css;
}

declare module "*.json" {
  const json: any;
  export default json;
}

declare module "*.svg" {
  const svg: any;
  export default svg;
}
