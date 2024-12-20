const SS_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const NOW = new Date();

/**
 * 要トリガー（５分毎に実行）
 */
function main() {
  const data = getNatureRemoData(); // Remo本体のデータ取得

  const arg = { // Remo＠リビングのデータのみ
    te:data[0].newest_events.te.val, // 温度
    hu:data[0].newest_events.hu.val, // 湿度
    il:data[0].newest_events.il.val, // 照度
    mo_last:data[0].newest_events.mo.created_at // 人感更新時刻
  }
    
  addremoData(arg, getLastData() + 1); // データ記載済最終行 + 1行目 に最新データを書きこむ

  const hour = NOW.getHours();
  if (21 <= hour || hour < 6) {
   return; // 21:00から6:00の間であればretuen

  } else {
    const room = getSheet().getRange(getLastData(), 9).getValue();
    const data = getApplianceData(); //appliancesの取得
    const power0 = data[0].light.state.power; // 証明＠寝室の電源
    const power1 = data[1].light.state.power; // 証明＠リビングの電源
    const button = data[2].settings.button;   // エアコン＠リビングの電源

    // 前行のroomに'0'が入ってない，かつ家電のいずれかが稼働しているなら
    if(room !== 0 && (power0 === 'on' || power1 === 'on' || button === '')) {  
      checkMO();
    }
    if(button === 'power-off') { // エアコンが停止しているなら
      checkTE();
    }
    checkIL();
  }
}

/** スプレッドシート内データ記載済最終行番号を取得するメソッド */
function getLastData() {
  // シート全体の値を2次元配列として格納し，そのデータ数（行数）を取得
  return getSheet().getDataRange().getValues().length;
}

/** スプレッドシート（シート名：'log'）を取得するメソッド */
function getSheet() { 
  return SpreadsheetApp.openById(SS_ID).getSheetByName('log');
}

/** スプレッドシートにデータを書き込むメソッド */
function setData(data, row, column) { // 引数（データ，行，列）
  getSheet().getRange(row, column).setValue(data);
}

/**（5分ごとに）スプレッドシートにデータを追加していくメソッド */
function addremoData(data, row) {
  const hour = NOW.getHours().toString().padStart(2, '0'); // 2ケタに指定
  const minute = NOW.getMinutes().toString().padStart(2, '0')
  const time = hour + ':' + minute;

  //対象シートに最新データ（最終行）を追加
  setData(time, row, 1);          // A列： 時間追加
  setData(data.te, row, 2);       // B列： 温度追加
  setData(data.hu, row, 3);       // C列： 湿度追加
  setData(data.il, row, 4);       // D列： 照度追加
  setData(data.mo_last, row, 7);  // G列： 人感更新時刻追加

  // 前行の人感更新時刻を取得
  const previous_mo_last = getSheet().getRange(row - 1, 7).getValue()

  if(row >= 2 && previous_mo_last != data.mo_last){ // 人感更新時刻が前行と異なる（人感センサ更新ある）とき，H列に「1」を記入
    setData(1, row, 8);
  } else {                                          // 人感更新時刻が前行と同じ（人感センサ更新ない）とき，H列に「0」を記入
    setData(0, row, 8);
  }

  const room = getSheet().getRange(row - 1, 9).getValue(); 
  const val_mo =  getSheet().getRange(row, 8).getValue();
  if( room !== '' && room == 0 && val_mo == 0) { // 前行のroomが'0'，かつ人感が'0'であれば
    setData(0, row, 9);
  }
}