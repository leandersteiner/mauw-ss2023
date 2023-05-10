import { MenuProps } from "antd";
import { ReactNode, Key } from "react";

export type MenuItem = Required<MenuProps>['items'][number];

export type SideMenuEntry = {
    label: string;
    icon: ReactNode;
    childEntries?: SideMenuEntry[];
    disabled?: boolean;
    onClick?: () => void;
};

function createMenuItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
    disabled?: boolean,
    onClick?: () => void
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        disabled,
        onClick
    } as MenuItem;
}

export function toMenuItemArray(menuEntries: SideMenuEntry[]): MenuItem[] {
    return menuEntries.map((menuEntry, index) => {
        if (menuEntry.childEntries != null) {
            return createMenuItem(
                menuEntry.label,
                index,
                menuEntry.icon,
                toMenuItemArray(menuEntry.childEntries),
                menuEntry.disabled,
                menuEntry.onClick
            );
        } else {
            return createMenuItem(
                menuEntry.label,
                index,
                menuEntry.icon,
                undefined,
                menuEntry.disabled,
                menuEntry.onClick
            );
        }
    });
}