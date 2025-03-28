const {
  app,
  Menu,
  shell,
  ipcMain,
  BrowserWindow,
  globalShortcut,
} = require("electron");

// Local imports
const { loadFile } = require("./helpers/menuFunctions/Load.js");
const {
  saveFile,
  registerSaveHandler,
} = require("./helpers/menuFunctions/Save.js");

// Register IPC handlers
registerSaveHandler();

// Global shortcuts
app.on("ready", () => {
  globalShortcut.register("CommandOrControl+S", saveFile);
  globalShortcut.register("CommandOrControl+O", loadFile);
});

// Editor reply logging
ipcMain.on("editor-reply", (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
});

// Menu template (same as before)
const template = [
  {
    label: "File",
    submenu: [
        {
            label: "Open",
            accelerator: "CommandOrControl+O",
            click() {
            const window = BrowserWindow.getFocusedWindow();
            if (window) {
                loadFile();
            }
            },
        },
        {
            label: "Save",
            accelerator: "CommandOrControl+S",
            click() {
            const window = BrowserWindow.getFocusedWindow();
            if (window) {
                saveFile();
            }
            },
        },
        { type: "separator" },
        { role: "quit" },
    ]
  },
  {
    label: "Format",
    submenu: [
      {
        label: "Toggle Bold",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("editor-event", "toggle-bold");
        },
      },
      {
        label: "Toggle Italic",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("editor-event", "toggle-italic");
        },
      },
      {
        label: "Toggle Strikethrough",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("editor-event", "toggle-strikethrough");
        },
      },
    ],
  },
//   {
//     role: "help",
//     submenu: [
      
//     ],
//   },
];

if (process.platform === "darwin") {
  template.unshift({
    label: "Editor",
    submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
  });
}

if (process.env.DEBUG) {
  template.push({
    label: "Dev Tools",
    submenu: [
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "reload", accelerator: "Alt+R" },
      { type: "separator" },
      {
        label: "Electron Docs",
        click: async () => {
          await shell.openExternal("https://electronjs.org/docs");
        },
      },
      {
        label: 'Supported Role Values',
        click: async () => {
            await shell.openExternal('https://electronjs.org/docs/api/menu-item#roles');
        }
    },
    {
        label: 'Supported Accelerator Values',
        click: async () => {
            await shell.openExternal('https://electronjs.org/docs/api/accelerator');
        }
    },
    {
        label: 'Platform Process',
        click: async () => {
            await shell.openExternal('https://nodejs.org/api/process.html#process_process_platform');
        }
    },
    {
        label: 'Keyboard Short Cuts',
        click: async () => {
            await shell.openExternal('https://github.com/sparksuite/simplemde-markdown-editor#keyboard-shortcuts');
        }
    },
    {
        label: 'Tool Bar Icons',
        click: async () => {
            await shell.openExternal('https://github.com/sparksuite/simplemde-markdown-editor#toolbar-icons');
        }
    },
    {
        label: 'Dialog Module',
        click: async () => {
            await shell.openExternal('https://electronjs.org/docs/api/dialog');
        }
    },
      {
        label: "Drag & Drop Handling",
        click: async () => {
            await shell.openExternal(
                "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"
            );
        }
      },
      {
        label: "About Editor Component",
        click: async () => {
          await shell.openExternal("https://simplemde.com/");
        },
      }
    ],
  });
}

const menu = Menu.buildFromTemplate(template);
module.exports = menu;
