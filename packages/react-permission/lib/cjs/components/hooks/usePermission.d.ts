import { UsePermissionReturn } from "../../types";
declare function usePermission<Permissions>(needed_permissions: Permissions[]): UsePermissionReturn<Permissions>;
export default usePermission;
