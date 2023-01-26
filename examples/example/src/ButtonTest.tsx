import { useState } from "react";
import { usePermission } from "@derhackt/react-permissions";

type Props = {};

type TRestrictNames = "test" | "restrict" | "unavaible";

const ButtonTest = (props: Props) => {
    const permissions = usePermission<TRestrictNames>([
        "test",
        "restrict",
        "unavaible",
    ]);

    const [test, setTest] = useState<string>("Click on a button");

    const { test: adminPerm, restrict: restictPerm } = permissions;

    const handleAdminClick = (
        perm: "view" | "create" | "update" | "delete",
        button: TRestrictNames
    ) => {
        console.log(perm, button, button);
        if (permissions[button]?.permission[perm]) {
            setTest(`Clicked on ${perm} with permission as ${button}`);
            return;
        }
        setTest(`Clicked on ${perm} without permission as ${button}`);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleAdminClick("view", "test")}>
                    perm view
                </button>
                <button onClick={() => handleAdminClick("create", "test")}>
                    perm create
                </button>
                <button onClick={() => handleAdminClick("update", "test")}>
                    perm update
                </button>
                <button onClick={() => handleAdminClick("delete", "test")}>
                    perm delete
                </button>
            </div>
            <div>
                <button onClick={() => handleAdminClick("view", "restrict")}>
                    no perm view
                </button>
                <button onClick={() => handleAdminClick("create", "restrict")}>
                    no perm create
                </button>
                <button onClick={() => handleAdminClick("update", "restrict")}>
                    no perm update
                </button>
                <button onClick={() => handleAdminClick("delete", "restrict")}>
                    no perm delete
                </button>
            </div>
            <div>
                <button disabled={adminPerm?.disable.view ?? true}>
                    no disabled perm view
                </button>
                <button disabled={adminPerm?.disable.create ?? true}>
                    no disabled perm create
                </button>
                <button disabled={adminPerm?.disable.update ?? true}>
                    no disabled perm update
                </button>
                <button disabled={adminPerm?.disable.delete ?? true}>
                    no disabled perm delete
                </button>
            </div>
            <div>
                <button disabled={restictPerm?.disable.view ?? true}>
                    disabled no perm view
                </button>
                <button disabled={restictPerm?.disable.create ?? true}>
                    disabled no perm create
                </button>
                <button disabled={restictPerm?.disable.update ?? true}>
                    disabled no perm update
                </button>
                <button disabled={restictPerm?.disable.delete ?? true}>
                    disabled no perm delete
                </button>
            </div>
            {test}
        </div>
    );
};

export default ButtonTest;
