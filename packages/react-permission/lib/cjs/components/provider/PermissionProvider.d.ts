/// <reference types="react" />
import { PermissionProviderContextProps, TypePermissionContext } from "../../types";
export declare const PermissionContext: import("react").Context<TypePermissionContext>;
declare const PermissionProvider: ({ config, children }: PermissionProviderContextProps) => JSX.Element;
export default PermissionProvider;
