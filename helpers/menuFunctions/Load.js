const { BrowserWindow, dialog } = require('electron');
const fs = require('fs');

async function loadFile() {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    console.log('Opening file...');
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
      title: 'Open Markdown File',
      filters: [
        { name: 'MyFile', extensions: ['md'] },
        { name: 'Text files', extensions: ['txt'] }
      ],
      properties: ['openFile']
    });

    if (!canceled && filePaths.length > 0) {
      const content = fs.readFileSync(filePaths[0], 'utf-8');
      window.webContents.send('editor-event', 'load', content);
      console.log(`Loaded file: ${filePaths[0]}`);
    } else {
      console.log('Open canceled');
    }
  }
}

module.exports = {
  loadFile
};
