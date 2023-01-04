
export type MenuItemType = {
  name: string;
  key: string;
  clickHandler?: (name: string, key: string) => void;
  children?: MenuItemType[];
}
