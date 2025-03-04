# Full Course on Angular 18

This repository contains the project built from the course crafted by SimpleTech. Here is [the course's link](https://www.youtube.com/watch?v=U71TQN68QGU).

## Install NodeJS

For Windows, use Scoop:

```powershell
scoop install main/nodejs-lts
```

Install the LTS version to avoid "_Warning: The current version of Node (23.9.0) is not supported by Angular._" messages from Angular on the next step.

## Install Angular

```bash
npm install -g @angular/cli
ng version
# Should output the latest Angular version
```

**IMPORTANT:** At the time of writing this, Angular is at v19 while the course in taught in Angular 17 and 18.

## Extensions VSCode

- https://marketplace.visualstudio.com/items?itemName=1tontech.angular-material
- https://marketplace.visualstudio.com/items?itemName=alexiv.vscode-angular2-files
- https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
- https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
- https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig
- https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
- https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
- https://marketplace.visualstudio.com/items?itemName=gruntfuggly.todo-tree
- https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- https://marketplace.visualstudio.com/items?itemName=infinity1207.angular2-switcher
- https://marketplace.visualstudio.com/items?itemName=john-crowson.angular-file-changer
- https://marketplace.visualstudio.com/items?itemName=loiane.angular-extension-pack
- https://marketplace.visualstudio.com/items?itemName=obenjiro.arrr
- https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file
- https://marketplace.visualstudio.com/items?itemName=pucelle.vscode-css-navigation
- https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype
- https://marketplace.visualstudio.com/items?itemName=rctay.karma-problem-matcher
- https://marketplace.visualstudio.com/items?itemName=segerdekort.angular-cli
- https://marketplace.visualstudio.com/items?itemName=simontest.simontest
- https://marketplace.visualstudio.com/items?itemName=steoates.autoimport
- https://marketplace.visualstudio.com/items?itemName=stringham.move-ts
- https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser
- https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

## Create a project

```bash
ng new project-name
```

See [my notes about the discountinued `assets` folder under `src`](playing-cards/public/assets/README.md).

## Create a new component

```bash
# short form of ng generate component components/playing-card
ng g c components/playing-card
```

The above creates a new subfolder `components/playing-card` under `app`. The scaffolded component is defined with the `.css`, `.html`, `ts` and `spec.ts` files.

To skip the test file generation, simply the flag `--skip-tests` on the above command.


