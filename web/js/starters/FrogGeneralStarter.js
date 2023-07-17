class FrogGeneralStarter {
  static launchGeneral(options, displayName) {
    FrogBackendCommunicator.logBrowserConsole(
      "[S]",
      "Trying to start",
      displayName,
      options.version.number
    );
    launcher.launch(options);
    launcher.on("debug", (e) => {
      FrogErrorsParser.parse(e);
      FrogBackendCommunicator.logBrowserConsoleOnly(e);
    });
    launcher.on("close", (e) => {
      FrogStartManager.parseStartStatus("mclc-close-evt");
      FrogErrorsParser.parse("", e);
    });
    launcher.on("data", (e) => {
      FrogBackendCommunicator.logBrowserConsoleOnly(e);
      FrogStartManager.parseStartStatus(e);
      FrogErrorsParser.parse(e);
    });
    launcher.on("arguments", (e) => {
      anyDownloading = false;
      FrogStartManager.parseStartStatus("mclc-start-evt");
    });
    launcher.on("download-status", function (e) {
      FrogDownloadManager.handleDownloadStatus(e);
    });
    launcher.on("progress", function (e) {
      FrogDownloadManager.handleProgressStatus(e);
    });
  }
}
