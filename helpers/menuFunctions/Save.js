const { ipcMain, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

function registerSaveHandler() {
  ipcMain.on('save', async (event, content) => {
    const window = BrowserWindow.getFocusedWindow();
    const { canceled, filePath } = await dialog.showSaveDialog(window, {
      title: 'Save Markdown File',
      filters: [{ name: 'MyFile', extensions: ['md'] }]
    });

    if (!canceled && filePath) {
      fs.writeFileSync(filePath, content);
      console.log(`File saved at: ${filePath}`);
    } else {
      console.log('Save canceled');
    }
  });
}

// Function for global shortcut use
function saveFile() {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    console.log('Saving file...');
    window.webContents.send('editor-event', 'save');
  }
}

module.exports = {
  saveFile,
  registerSaveHandler
};
