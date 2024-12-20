const FOLDER_ID = PropertiesService.getScriptProperties().getProperty('FOLDER_ID'); // グラフ画像を一時保存するフォルダのID

function sendGraph() {
  let range = getSheet().getRange(1, 1, getLastData(), 3); // グラフに使用するデータ範囲を取得
  const graph = getSheet().newChart()
    .setChartType(Charts.ChartType.LINE) // チャートの種類を設定
    .setOption('title', '本日のリビング温度・湿度の遷移')
    .addRange(range) // 使用するデータの範囲を設定
    .setNumHeaders(1) // ヘッダー行を指定
    .setPosition(1, 11, 0, 0) // チャートの位置を設定
    .build();

  // グラフをPNG形式で取得し，ファイル名を設定
  const date = NOW.getMonth() + '/' + NOW.getDate();
  const image = graph.getBlob().getAs("image/png").setName("today's chart（" + date + "）.png"); 

  // 指定したフォルダ内に画像ファイルを作成
  const file = DriveApp.getFolderById(FOLDER_ID).createFile(image); 

  // ファイルを公開設定（リンクを知っている人は閲覧可能）に変更
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Slackにメッセージを送信
  sendMessage('', createBlock12(file.getId()), BOT_TOKEN);

  // ファイルを削除
  file.setTrashed(true);

  // スプレッドシートを空にする
  range  = getSheet().getRange(2, 1, getLastData() - 1, 9); // データ範囲を取得
  range.clear();
}
