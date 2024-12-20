/** 人感チェック */
function checkMO() {
  // 直近7行の人感の有無（'0'or'1'）を3取得
  const v  = getSheet().getRange(getLastData(), 8).getValue();   // 最新の値
  const v1 = getSheet().getRange(getLastData() - 1, 8).getValue(); // 5分前の値
  const v2 = getSheet().getRange(getLastData() - 2, 8).getValue(); // 10分前の値
  const v3 = getSheet().getRange(getLastData() - 3, 8).getValue(); // 15分前の値
  const v4 = getSheet().getRange(getLastData() - 4, 8).getValue(); // 20分前の値
  const v5 = getSheet().getRange(getLastData() - 5, 8).getValue(); // 25分前の値
  const v6 = getSheet().getRange(getLastData() - 6, 8).getValue(); // 30分前の値

  // '0'が7回連続して記録されていれば（人感の最終検知から30分以上経過していれば）
  if(v == v1 == v2 == v3 == v4 == v5 == v6 == 0) {
    // 直近7行の中に１つでもフラグがあったら
    let flag = '';
    for (let i = getLastData(); i > getLastData() - 7; i--) {
      flag = getSheet().getRange(i, 6).getValue(); // フラグを取得 (i行目の16列)
      if (flag === true) { return; }
    }

    sendMessage('', createBlock0(), BOT_TOKEN);
    setData(true, getLastData(), 6); // 処理済みフラグを設定
  }
}

/** 温度チェック */
function checkTE() {
  const val_te = getSheet().getRange(getLastData(), 2).getValue();

  if(val_te > 30){ // 温度が30より大きいならば
    //doAircon(2, '', 'cool', '');
    sendMessage('', createBlock5(), BOT_TOKEN);
  
  } else if (val_te < 18) { // 温度が18より小さいならば
    //doAircon(2, '', 'warm', '');
    sendMessage('', createBlock14(), BOT_TOKEN);
  }
}

/** 照度チェック */
function checkIL() {
  const mo0 = getSheet().getRange(getLastData() - 1, 8).getValue();
  const mo1 = getSheet().getRange(getLastData(), 8).getValue();
  const val_il = getSheet().getRange(getLastData(), 4).getValue();

  // 人感を検知したとき，照度が10以下ならば
  if(mo0 == 0 && mo1 == 1 && val_il <= 10) { 
    //doLight(1, 'on');
  }
}