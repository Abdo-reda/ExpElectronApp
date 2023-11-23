const {name} = require('./package.json')

module.exports = {
  appId: "example.electron",
  files: [
    `dist/${name}/**/*`,
    "electron/**/*",
    'src/**/*',
    "!**/.*",
    "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
    "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
    "!**/node_modules/*.d.ts",
    "!**/node_modules/.bin",
    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
    "!.editorconfig",
    "!**/._*",
    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
    "!**/{appveyor.yml,.travis.yml,circle.yml}",
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}"
  ],
  directories: {
    output: "dist/${platform}/${arch}"
  },
  linux: {
    target: [
      "AppImage",
      "deb"
    ]
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: [
          "x64",
          // "ia32"
        ],
      },
      {
        target: "msiWrapped",
      },
      // {
      //   target: "msi",
      // }
    ],
    icon: "electron/basic_cube_icon.ico",
  },
  mac: {
    target: [
      {
        target: "dmg",
      }
    ]
  },
  appImage: {

  },
  dmg: {
  },
  msi: {
    oneClick: false,
  },
  msiWrapped: {
    oneClick: false,
    perMachine: true,
    // wrappedInstallerArgs: '/S',
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
  },
  publish: [{
    provider: 'generic',
    url: 'https://3544-156-204-255-77.ngrok-free.app/',
    // channel: 'stable',
  }]
}

// "build": {
//   "publish": [
//     {
//       "provider": "generic",
//       "url": "http://127.0.0.1:8080/"
//     }
//   ],
//   "appId": "com.github.iffy.electronupdatergenericexample",
//   "mac": {
//     "category": "your.app.category.type",
//     "target": [
//       "zip",
//       "dmg"
//     ]
//   },
//   "nsis": {
//     "perMachine": true
//   }
// }