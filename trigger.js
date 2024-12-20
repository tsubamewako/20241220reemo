/**
 * 要トリガー（５分毎に実行）
 */
function doTrigger() {
  try {
    main(); // この関数で Error が発生したら catch する

  } catch (error) {
    const message = 'エラーが発生しました\nエラー内容: ' + error.stack;
    alart(message); // Slackに通知
    throw new Error(message); // これをしておくことで実行ログにエラーとして記録される
  }
}

/**
 * 要トリガー（21:00に実行）
 */
function doTrigger2() {
  try {
    sendGraph(); // この関数で Error が発生したら catch する

  } catch (e) {
    const message = 'エラーが発生しました\nエラー内容: ' + error.stack;
    alart(message); // Slackに通知
    throw new Error(message); // これをしておくことで実行ログにエラーとして記録される
  }
}
