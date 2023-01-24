export interface ComponentProps {
    permissions?: string[];
    noPermissionsNeeded?: boolean;
    children: JSX.Element;
}
