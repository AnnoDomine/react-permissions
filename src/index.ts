/* eslint-disable @typescript-eslint/explicit-function-return-type */
export { default as PermissionProvider } from "./components/provider/PermissionProvider";
export { default as Permission } from "./components/component/Permission";
export { default as usePermission } from "./components/hooks/usePermission";

function sayHiTo(name: string) {
    return `Hi, ${name}`;
}

const message = sayHiTo("Bruno");

console.log(message);
