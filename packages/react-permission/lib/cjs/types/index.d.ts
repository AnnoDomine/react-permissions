type ComponentProps = {
    permissions?: string[];
    noPermissionsNeeded?: boolean;
    children: JSX.Element;
};

type TypePermissionContext = {
    config: {
        current: { permissions: TypePermissionWithDefault | null };
        no_permissions_needed: boolean;
        fallback_component?: JSX.Element;
        own_permission_name?: TypeOwnPermissionNames;
    };
};
type PermissionProviderContextProps = TypePermissionContext & {
    children: JSX.Element;
};
type TypeOwnPermissionNames<PermissionType = string> = {
    view: PermissionType;
    create: PermissionType;
    update: PermissionType;
    delete: PermissionType;
};
type TypePermissionWithDefault = {
    [permissionName: string]: { [permission: string]: boolean } & TypeOwnPermissionNames<boolean>;
} | null;

type UsePermissionReturn<PermissionName = string> = {
    [key in PermissionName as string]?: {
        disable: {
            view: boolean;
            create: boolean;
            update: boolean;
            delete: boolean;
        };
        permission: {
            view: boolean;
            create: boolean;
            update: boolean;
            delete: boolean;
        };
    };
};

export { ComponentProps, PermissionProviderContextProps, TypeOwnPermissionNames, TypePermissionContext, TypePermissionWithDefault, UsePermissionReturn };
