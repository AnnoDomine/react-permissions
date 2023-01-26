export type UsePermissionReturn<PermissionName = string> = {
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
