const { version } = require('./package.json');
const fs  = require('node:fs');
const path = require("path");
const express = require('express');
const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');

const pathToReleases = path.join(__dirname, 'out', 'releases');

module.exports = {
  buildIdentifier: process.env.NODE_ENV,
  packagerConfig: {
    // name: 'blah',
    name: fromBuildIdentifier({ development: `basic-app-development`, production: `basic-app` }),
    executableName:  fromBuildIdentifier({ development: `basic-app-development`, production: `basic-app` }),
    asar: true,
    prune: true,
  },
  ignore: [
    "\.(angular|vscode|gitignore|git)",
    "out",
    "out/releases",
    "out/backup",
    "backup",
    "releases",
    "dist/out-desktop-build",
    "dist/out-electron",
    "dist/out-tsc",
    "dist/releases",
    "dist",
    "node_modules/.bin",
    "node_modules/electron-prebuilt",
    "node_modules/electron-prebuilt-compile",
  ],
  hooks: {
    preMake: async () => {
        // const releasesFile = path.join(pathToReleases, "RELEASES");
        // const data = await fs.promises.readFile(releasesFile);
        // try {
        //     // try to read file
        //     await fs.promises.readFile(releasesFile);
        // } catch (error) {
        //     await fs.promises.mkdir(webSetupPath);
        //     // create empty file, because it wasn't found
        //     await fs.promises.writeFile(releasesFile, "");
        // }

        //server the file ... no way ...
        const app = new express();
        app.use(express.static(pathToReleases));
        server = app.listen(4001);
    },
    postMake: async () => {
        server.close();
        server = null;
        // const outPath = path.resolve("./out/make/squirrel.windows/x64");
        
        // // move the files back to releases folder
        // await Promise.all((await fs.promises.readdir(outPath)).map(file => fs.promises.rename(path.join(outPath, file), path.join(webSetupPath, file))));
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // version: version,
        // exe: fromBuildIdentifier({ development: `basic-app-development-${version}`, production: `basic-app-${version}` }),
        noDelta: false,
        noMsi: true,
        // remoteReleases: "http://127.0.0.1:4001",
      }
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        // exe: fromBuildIdentifier({ development: `basic-app-development-${version}`, production: `basic-app-${version}` }),
        // appUserModelId: 'basic.app.com',
        manufacturer: 'Me',
        icon: 'electron/basic_cube_icon.ico',
        shortcutFolderName: 'BasicApp',
        features: {
          autoLaunch: true,
          autoUpdate: true,
        },
        ui: {
          chooseDirectory: true,
        },
        beforeCreate: async (msiCreator) => {
          msiCreator.updaterTemplate = getTemplate('myUpdateFeature', true);
        }
      }
    },
  ],
  publishers: [
    {
      name: 'custom-publisher',
      config: {
        secret: 'this is a secret'
      }
    },
    // {
    //   name: '@electron-forge/publisher-electron-release-server',
    //   config: {
    //     baseUrl: 'https://update.server.com',
    //     username: 'admin',
    //     password: 'tempPassword' // string
    //   }
    // }
  ],
};


const getTemplate = (name, trimTrailingNewLine) => {
  const content = fs.readFileSync(path.join(__dirname, `temp/${name}.xml`), 'utf-8');
  if (trimTrailingNewLine) {
    return content.replace(/[\r\n]+$/g, '');
  } else {
    return content;
  }
};
