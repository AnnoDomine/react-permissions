import React from "react";

export interface IPermission {
    name: string;
}

const Hello: React.FC<IPermission> = ({ name }) => <div></div>;

export default Hello;
