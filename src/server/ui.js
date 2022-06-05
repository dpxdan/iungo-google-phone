export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Iungo')
    .addItem('Click to Call', 'openDialogBootstrap')
    .addItem('Ramal', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialogBootstrap = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
    .setWidth(320)
    .setHeight(480);
  SpreadsheetApp.getUi().showModalDialog(html, 'Click to Call');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};
