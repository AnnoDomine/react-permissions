<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center">

[![GitHub contributors](https://badgen.net/github/contributors/AnnoDomine/react-permissions)](https://github.com/AnnoDomine/react-permissions/contributors)
[![GitHub forks](https://badgen.net/github/forks/AnnoDomine/react-permissions)](https://github.com/AnnoDomine/react-permissions/fork)
[![GitHub stars](https://badgen.net/github/stars/AnnoDomine/react-permissions)](https://github.com/AnnoDomine/react-permissions/stargazers)
[![GitHub watchers](https://badgen.net/github/watchers/AnnoDomine/react-permissions)](https://github.com/AnnoDomine/react-permissions/watchers)
[![GitHub issues](https://badgen.net/github/issues/AnnoDomine/react-permissions/)](https://github.com/AnnoDomine/react-permissions/issues)

[![GitHub release](https://img.shields.io/github/release/AnnoDomine/react-permissions.svg)](https://GitHub.com/AnnoDomine/react-permissions/releases/)
[![Npm package yearly downloads](https://badgen.net/npm/dy/@derhackt/react-permissions)](https://npmjs.com/package/@derhackt/react-permissions)
![Types included](https://badgen.net/npm/types/tslib)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

</div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AnnoDomine/react-permissions">
    <img src="images/logo_900_x_831.png" alt="Logo" width="450" height="415.5">
  </a>

<h3 align="center">react-permisions</h3>

  <p align="center">
    Full configurable permission system for react web applications
    <br />
    <a href="https://github.com/AnnoDomine/react-permissions/examples">View Demo</a>
    ·
    <a href="https://github.com/AnnoDomine/react-permissions/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnnoDomine/react-permissions/issues">Request Feature</a>
  </p>
</div>



- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
    - [Thanks to all lovely contributers](#thanks-to-all-lovely-contributers)
- [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project 

Here comes an awsm desciption of this package

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- [![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/) VisualStudioCode
- [![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000000)](https://www.javascript.com/) JavaScript
- [![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/) TypeScript
- [![ReactJS](https://img.shields.io/badge/--000000?logo=react&logoColor=61DBFB)](https://www.typescriptlang.org/) ReactJS
- [![ReactJS](https://img.shields.io/badge/--FFFFFF?logo=npm&logoColor=CC3534)](https://www.npmjs.com/) NPM
- [![ReactJS](https://img.shields.io/badge/--341BAB?logo=eslint&logoColor=FBFBFF)](https://eslint.org/) ESLint

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The package can be downloaded via npm and yarn.
After download and added to your project you have access to all compnents, hooks and types.



### Prerequisites

Download and add the package via npm or yarn to your project.



### Installation

1. Install NPM packages

[![NPM](https://nodei.co/npm/@derhackt/react-permissions.png?mini=true)](https://nodei.co/npm/@derhackt/react-permissions/)

* npm
```sh
npm install @derhackt/react-permissions@latest
```
* yarn
```sh
npm add @derhackt/react-permissions@latest
```
2. Wrapp your project into the PermissionProvider
```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { PermissionProvider } from "@derhackt/react-permissions";
import { permissionConfig } from "./permissionconfig"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <PermissionProvider config={permissionConfig}>
            <App />
        </PermissionProvider>
    </React.StrictMode>
);
```
3. Add your config-file (example: permissionConfig.ts)
```typescript
import type { TypePermissionContext } from "@derhackt/react-permissions/dist/esm/types/components/provider/PermissionProvider.types";

export const config: TypePermissionContext["config"] = {
    current: {
        permissions: {
            admin: {
                view: true,
                create: true,
                delete: true,
                update: true,
            },
            user: {
                view: true,
                create: false,
                delete: false,
                update: false,
            },
            // You can even include restriction which have no permissions as a default permission.
            // The handlers set not given permissions to false by default without to declare it.
            guest: {
                view: false,
                create: false,
                delete: false,
                update: false,
            }
        },
    },
    no_permissions_needed: true,
    // ...other optional settings
};
```
Optional:
* You can import types from the `@derhackt/react-permissions/dist/esm/types` folder.
* You can add more settings to your config:
   
`fallback_component` component to fallback when view permission is restricted. `Type: JSX.Element`

Example:
```typescript
    fallback_component: <div>You don´t have permissions to view this page</div>
```
*If you use react-router-dom you can add the navigation component from there to redirect*

`own_permission_name` Object to change the default naming of the permissions. `Type: Record<string, string>`

Example:
```typescript
    own_permission_name: {
        view: "i_can_see";
        create: "i_can_add";
        update: "i_can_change";
        delete: "i_can_remove";
    }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Permission component

The permission component can be used to restrict view permissions.
It will automatic render the fallback component from the config if the view permission is restricted.

To use the component with the noPermissionsNeeded property the setting `no_permissions_needed` in the config have to set to `true`

Example:
```typescript
import { Permission } from "@derhackt/react-permissions";

// ...

<Permission noPermissionsNeeded>
    <p>no permission needed. even 'guest' can see this text.</p>
</Permission>
<Permission permissions={["admin"]}>
    <p>only 'test' have view permission</p>
</Permission>
<Permission permissions={["user"]}>
    <p>only 'restrict' have view permission</p>
</Permission>
<Permission permissions={["admin", "user"]}>
    <p>'test' and 'restrict' have view permission</p>
</Permission>
```

* usePermission hook

The hook can be used to restrict serveral handlings and functions. It also return a `disable` state for easy embbing into `disabled`-props of components like `<button>`

Example: [usePermission-hook example](https://github.com/AnnoDomine/react-permissions/blob/main/examples/example/src/ButtonTest.tsx)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Adding provider
- [x] Adding component
- [x] Adding hook
- [x] Adding types
- [ ] Adding more usefull components
- [ ] Adding logged in restriction
- [ ] Adding native support for react-redux
- [ ] Adding native support for react-router-dom
- [ ] Adding native support for component-libraries like MUI
- [ ] Getting inspired by the community

See the [open issues](https://github.com/AnnoDomine/react-permissions/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



#### Thanks to all lovely contributers

<a href = "https://github.com/AnnoDomine/react-permissions/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=AnnoDomine/react-permissions"/>
</a>

*Made with [contributors-img](https://contrib.rocks).*

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


*ReactJS and ReactJS-logo are under Creative Common Attribution 4.0 International license* [ReactJS-License](https://github.com/reactjs/reactjs.org/blob/main/LICENSE-DOCS.md)

*Logo modified by [AnnoDomine](https://github.com/AnnoDomine)*

<p align="right">(<a href="#readme-top">back to top</a>)</p>