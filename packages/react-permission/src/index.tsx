import { ReactNode } from "react";

export interface IPermission {
    children: JSX.Element | ReactNode;
}

const Hello = ({ children }: IPermission) => children;

export default Hello;
