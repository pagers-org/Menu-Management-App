declare module 'Component' {
  export type TProps = { [key: string]: any };
  export type TPresentation = (...args: TProps[]) => string;
}

declare module 'App' {
  export type TMenuProps = {
    menuId: string;
    name: string;
    isSoldOut: boolean;
  };
  export type TMenuPageProps = {
    menuList: TMenuProps[];
    id: string;
    text: string;
  };
  export type TMenuPage = (props: TMenuPageProps) => string;
  export type TMenu = { menuId: string; name: string; isSoldOut: boolean };
}
