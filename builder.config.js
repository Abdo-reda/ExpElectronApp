module.exports = {
  appId: "luftborm.platform.overseer",
  files: [
    "dist/luftborn-platform-ui/**/*",
    "electron/**/*",
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
      // {
      //   target: "nsis",
      //   arch: [
      //     "x64",
      //     // "ia32"
      //   ],
      // },
      {
        target: "msi",
      }
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
  }
}
