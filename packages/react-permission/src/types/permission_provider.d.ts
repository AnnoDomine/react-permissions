export type TypePermissionContext = {
    config: {
        current: { permissions: TypePermissionWithDefault | null };
        no_permissions_needed: boolean;
        fallback_component?: JSX.Element;
        own_permission_name?: TypeOwnPermissionNames;
    };
};
export type PermissionProviderContextProps = TypePermissionContext & {
    children: JSX.Element;
};
export type TypeOwnPermissionNames<PermissionType = string> = {
    view: PermissionType;
    create: PermissionType;
    update: PermissionType;
    delete: PermissionType;
};
export type TypePermissionWithDefault = {
    [permissionName: string]: { [permission: string]: boolean } & TypeOwnPermissionNames<boolean>;
} | null;
