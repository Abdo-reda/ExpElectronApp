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
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
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
