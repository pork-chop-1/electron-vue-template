
export type MenuItemType = {
  name: string;
  key: string;
  clickHandler?: (name: string, key: string, extra: MenuItemType['extra']) => void;
  children?: MenuItemType[];
  extra?: {[someKey:  string] : any}
}
