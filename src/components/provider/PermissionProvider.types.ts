export interface TypePermissionContext {
    config: {
        current: { permissions: TypePermissionWithDefault | null };
        no_permissions_needed: boolean;
        fallback_component?: JSX.Element;
        own_permission_name?: TypeOwnPermissionNames;
    };
}
export type PermissionProviderContextProps = TypePermissionContext & {
    children: JSX.Element;
};
export interface TypeOwnPermissionNames<PermissionType = string> {
    view: PermissionType;
    create: PermissionType;
    update: PermissionType;
    delete: PermissionType;
}
export type TypePermissionWithDefault = Record<
    string,
    Record<string, boolean> & TypeOwnPermissionNames<boolean>
> | null;
