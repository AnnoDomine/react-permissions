import { createContext, useMemo } from "react";
import type { ReactNode } from "react";

type Props = TypePermissionContext & {
    children: JSX.Element | ReactNode;
};

type TypePermissionWithView = {
    [permissionName: string]: { [permission: string]: boolean } & { view: boolean };
} | null;

type TypePermissionContext = {
    config: {
        current: { permissions: TypePermissionWithView | null };
        fallback_component?: JSX.Element | ReactNode;
        no_permissions_needed: boolean;
        own_permission_view_name?: string;
    };
};

export const PermissionContext = createContext<TypePermissionContext>({
    config: {
        current: {
            permissions: null,
        },
        no_permissions_needed: false,
        fallback_component: <></>,
    },
});

const PermissionProvider = ({ config, children }: Props) => {
    const permission_value = useMemo(() => {
        return {
            config: {
                current: {
                    permissions: config.current.permissions,
                },
                no_permissions_needed: config.no_permissions_needed,
                fallback_component: config.fallback_component,
            },
        };
    }, [config.current]);

    return <PermissionContext.Provider value={permission_value}>{children}</PermissionContext.Provider>;
};

PermissionContext.displayName = "PermissionProvider";

export default PermissionProvider;
