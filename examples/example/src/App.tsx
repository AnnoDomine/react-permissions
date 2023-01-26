import { PermissionProvider, Permission } from "@derhackt/react-permissions";
import ButtonTest from "./ButtonTest";
import type { TypePermissionContext } from "@derhackt/react-permissions/dist/esm/types/components/provider/PermissionProvider.types";

function App() {
    const config: TypePermissionContext["config"] = {
        current: {
            permissions: {
                test: {
                    view: true,
                    create: true,
                    delete: true,
                    update: true,
                },
                restrict: {
                    view: false,
                    create: false,
                    delete: false,
                    update: false,
                },
            },
        },
        no_permissions_needed: true,
        fallback_component: <p>You don't have view permission</p>,
    };

    return (
        <PermissionProvider config={config}>
            <div>
                <Permission noPermissionsNeeded>
                    <p>no permission needed</p>
                </Permission>
                <Permission permissions={["test"]}>
                    <p>only 'test' have view permission</p>
                </Permission>
                <Permission permissions={["restrict"]}>
                    <p>only 'restrict' have view permission</p>
                </Permission>
                <Permission permissions={["restrict", "test"]}>
                    <p>'test' and 'restrict' have view permission</p>
                </Permission>
                <ButtonTest />
            </div>
        </PermissionProvider>
    );
}

export default App;
