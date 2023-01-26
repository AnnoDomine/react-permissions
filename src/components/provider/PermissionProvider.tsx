import React, { createContext, useMemo } from "react";
import {
    PermissionProviderContextProps,
    TypePermissionContext,
} from "./PermissionProvider.types";

export const PermissionContext = createContext<TypePermissionContext>({
    config: {
        current: {
            permissions: null,
        },
        no_permissions_needed: false,
        fallback_component: <React.Fragment>No Permission</React.Fragment>,
        own_permission_name: undefined,
    },
});

const PermissionProvider = ({
    config,
    children,
}: PermissionProviderContextProps): JSX.Element => {
    const permissionValue = useMemo(() => {
        return {
            config: {
                current: {
                    permissions: config.current.permissions,
                },
                no_permissions_needed: config.no_permissions_needed,
                fallback_component: config.fallback_component,
                own_permission_name: config.own_permission_name,
            },
        };
    }, [config.current]);

    return (
        <PermissionContext.Provider value={permissionValue}>
            {children}
        </PermissionContext.Provider>
    );
};

PermissionContext.displayName = "PermissionProvider";

export default PermissionProvider;
