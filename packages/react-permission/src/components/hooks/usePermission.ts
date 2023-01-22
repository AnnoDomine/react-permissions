import { useContext, useEffect, useState } from "react";
import { UsePermissionReturn } from "../../types";
import { PermissionContext } from "../provider/PermissionProvider";

function usePermission<Permissions>(needed_permissions: Permissions[]): UsePermissionReturn<Permissions> {
    const provider_context = useContext(PermissionContext);

    const givenPermissions = provider_context.config.current.permissions;

    const permissionViewName = provider_context.config.own_permission_name?.view ?? "view";

    const permissionCreateName = provider_context.config.own_permission_name?.create ?? "create";

    const permissionUpdateName = provider_context.config.own_permission_name?.update ?? "update";

    const permissionDeleteName = provider_context.config.own_permission_name?.delete ?? "delete";

    const initialPermissions = needed_permissions.reduce(
        (prev, curr) => ({
            ...prev,
            [curr as string]: {
                permission: {
                    [`${permissionViewName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? givenPermissions[curr as string][`${permissionViewName}`]
                            : false,
                    [`${permissionCreateName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? givenPermissions[curr as string][`${permissionCreateName}`]
                            : false,
                    [`${permissionUpdateName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? givenPermissions[curr as string][`${permissionUpdateName}`]
                            : false,
                    [`${permissionDeleteName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? givenPermissions[curr as string][`${permissionDeleteName}`]
                            : false,
                },
                disable: {
                    [`${permissionViewName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][`${permissionViewName}`]
                            : true,
                    [`${permissionCreateName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][`${permissionCreateName}`]
                            : true,
                    [`${permissionUpdateName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][`${permissionUpdateName}`]
                            : true,
                    [`${permissionDeleteName}`]:
                        givenPermissions && givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][`${permissionDeleteName}`]
                            : true,
                },
            },
        }),
        {}
    );

    const permissionNames = [permissionViewName, permissionCreateName, permissionUpdateName, permissionDeleteName];

    const [returnPermission, setReturnPermission] = useState<UsePermissionReturn<Permissions>>(initialPermissions);

    const setChildrenPermissionWithArray = (permissionNeeded: Permissions[]) => {
        let permission_map: typeof returnPermission = permissionNeeded.reduce(
            (prevName, currName) =>
                givenPermissions
                    ? Object.keys(givenPermissions).includes(currName as string)
                        ? permissionNames.reduce(
                              (prevPerm, currPerm) =>
                                  givenPermissions[currName as string][currPerm]
                                      ? {
                                            ...prevPerm,
                                            [currName as string]: {
                                                permission: {
                                                    ...prevPerm[currName as string]?.permission,
                                                    [currName as string]: true,
                                                },
                                                disable: {
                                                    ...prevPerm[currName as string]?.disable,
                                                    [currName as string]: false,
                                                },
                                            },
                                        }
                                      : prevPerm,
                              returnPermission
                          )
                        : prevName
                    : prevName,
            returnPermission
        );

        setReturnPermission(permission_map);
    };

    useEffect(() => {
        setChildrenPermissionWithArray(needed_permissions);
    }, []);

    return returnPermission;
}

export default usePermission;
