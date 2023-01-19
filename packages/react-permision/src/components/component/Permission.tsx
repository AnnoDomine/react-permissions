import { useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PermissionContext } from "../provider/PermissionProvider";

type Props = {
    permissions?: { permissionName: string | string[] }[];
    noPermissionsNeeded?: boolean;
    children: JSX.Element | ReactNode;
};

const Permission = ({
    permissions = undefined,
    noPermissionsNeeded = false,
    children,
}: Props): JSX.Element | ReactNode => {
    const permissionContext = useContext(PermissionContext);

    if (permissionContext === undefined)
        throw Error("PermissionProvider not declared. Did you wrapp your app inside the Provider?");

    if (permissions === undefined && !noPermissionsNeeded)
        throw Error(
            "You did not set the 'noPermissionsNeeded' prop in the 'Permission'-component or forgot to declare the needed permissions."
        );

    if (!permissionContext.config.no_permissions_needed && noPermissionsNeeded)
        throw Error("You did not set the 'no_permissions_needed' value to true inside your config.");

    const [givenPermissions, setGivenPermissions] = useState(permissionContext.config.current.permissions);

    useEffect(
        () => setGivenPermissions(permissionContext.config.current.permissions),
        [permissionContext.config.current]
    );

    if (givenPermissions === null && !permissionContext.config.no_permissions_needed && permissions !== undefined)
        throw Error("No current permission injected in the config.");

    const [havePermission, setHavePermission] = useState<boolean>(
        permissions === undefined && permissionContext.config.no_permissions_needed && noPermissionsNeeded
    );

    function isTypeOf<T>(check: unknown): check is T {
        if (check as T) {
            return true;
        }
        return false;
    }

    const permissionViewName = permissionContext.config.own_permission_view_name ?? "view";

    const setChildrenPermissionWithArray = (permissionNames: string[]) => {
        permissionNames.forEach((name) => {
            givenPermissions &&
                Object.keys(givenPermissions).includes(name) &&
                !givenPermissions[name][permissionViewName] &&
                setHavePermission(false);
        });
    };

    const setChildrenPermission = (name: string) => {
        givenPermissions &&
            Object.keys(givenPermissions).includes(name) &&
            !givenPermissions[name][permissionViewName] &&
            setHavePermission(false);
    };

    useEffect(() => {
        if (permissions !== undefined && !noPermissionsNeeded) {
            permissions.forEach((permission) => {
                if (isTypeOf<string[]>(permission.permissionName))
                    setChildrenPermissionWithArray(permission.permissionName);
                else setChildrenPermission(permission.permissionName);
            });
        }
    }, [givenPermissions, permissions, children]);

    if (permissionContext.config.no_permissions_needed && noPermissionsNeeded) return children;

    if (!havePermission) return permissionContext.config.fallback_component;

    return children;
};

export default Permission;
