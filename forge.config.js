module.exports = {
  packagerConfig: {
    // name: 'blah',
    executableName: 'basic-app',
    name: 'blah',
    asar: true,
    prune: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        // background: './assets/dmg-background.png',
        // format: 'ULFO'
      }
    },
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {},
    // },
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        appUserModelId: 'basic.app.com',
        manufacturer: 'Me',
        version: '1.0.0',
        icon: 'electron/basic_cube_icon.ico',
        shortcutFolderName: 'BasicApp',
        name: 'Basic App',
        features: {
          autoLaunch: true,
          autoUpdate: true,
        },
        ui: {
          chooseDirectory: true,
        },
        beforeCreate: async (msiCreator) => {
          msiCreator.wixTemplate = getTemplate('myWix', false);
          msiCreator.updaterTemplate = getTemplate('myUpdateFeature', true);
          console.info('msiCreator config', msiCreator);
        }
      }
    },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin'],
    // },
    {
      name: '@electron-forge/maker-deb',
      options: {
        // maintainer: 'Joe Bloggs',
        // homepage: 'https://example.com'
        name: 'blah',
        productName: 'blah'
      }
    },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],
  // plugins: [
  //   {
  //     name: '@electron-forge/plugin-auto-unpack-natives',
  //     config: {},
  //   },
  // ],
};


const getTemplate = (name, trimTrailingNewLine) => {
  const content = fs.readFileSync(path.join(__dirname, `temp/${name}.xml`), 'utf-8');
  if (trimTrailingNewLine) {
    return content.replace(/[\r\n]+$/g, '');
  } else {
    return content;
  }
};
