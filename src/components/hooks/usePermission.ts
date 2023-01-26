import { useContext, useEffect, useState } from "react";
import { PermissionContext } from "../provider/PermissionProvider";
import { UsePermissionReturn } from "./usePermission.types";

function usePermission<Permissions>(
    neededPermissions: Permissions[]
): UsePermissionReturn<Permissions> {
    const providerContext = useContext(PermissionContext);

    const givenPermissions = providerContext.config.current.permissions;

    const permissionViewName =
        providerContext.config.own_permission_name?.view ?? "view";

    const permissionCreateName =
        providerContext.config.own_permission_name?.create ?? "create";

    const permissionUpdateName =
        providerContext.config.own_permission_name?.update ?? "update";

    const permissionDeleteName =
        providerContext.config.own_permission_name?.delete ?? "delete";

    const initialPermissions = neededPermissions.reduce(
        (prev, curr) => ({
            ...prev,
            [curr as string]: {
                permission: {
                    [`${permissionViewName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? givenPermissions[curr as string][
                                  `${permissionViewName}`
                              ]
                            : false,
                    [`${permissionCreateName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? givenPermissions[curr as string][
                                  `${permissionCreateName}`
                              ]
                            : false,
                    [`${permissionUpdateName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? givenPermissions[curr as string][
                                  `${permissionUpdateName}`
                              ]
                            : false,
                    [`${permissionDeleteName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? givenPermissions[curr as string][
                                  `${permissionDeleteName}`
                              ]
                            : false,
                },
                disable: {
                    [`${permissionViewName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][
                                  `${permissionViewName}`
                              ]
                            : true,
                    [`${permissionCreateName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][
                                  `${permissionCreateName}`
                              ]
                            : true,
                    [`${permissionUpdateName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][
                                  `${permissionUpdateName}`
                              ]
                            : true,
                    [`${permissionDeleteName}`]:
                        givenPermissions != null &&
                        givenPermissions[curr as string]
                            ? !givenPermissions[curr as string][
                                  `${permissionDeleteName}`
                              ]
                            : true,
                },
            },
        }),
        {}
    );

    const permissionNames = [
        permissionViewName,
        permissionCreateName,
        permissionUpdateName,
        permissionDeleteName,
    ];

    const [returnPermission, setReturnPermission] =
        useState<UsePermissionReturn<Permissions>>(initialPermissions);

    const setChildrenPermissionWithArray = (
        permissionNeeded: Permissions[]
    ): void => {
        const permissionMap: typeof returnPermission = permissionNeeded.reduce(
            (prevName, currName) =>
                givenPermissions != null
                    ? Object.keys(givenPermissions).includes(currName as string)
                        ? permissionNames.reduce(
                              (prevPerm, currPerm) =>
                                  givenPermissions[currName as string][currPerm]
                                      ? {
                                            ...prevPerm,
                                            [currName as string]: {
                                                permission: {
                                                    ...prevPerm[
                                                        currName as string
                                                    ]?.permission,
                                                    [currName as string]: true,
                                                },
                                                disable: {
                                                    ...prevPerm[
                                                        currName as string
                                                    ]?.disable,
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

        setReturnPermission(permissionMap);
    };

    useEffect(() => {
        setChildrenPermissionWithArray(neededPermissions);
    }, []);

    return returnPermission;
}

export default usePermission;
