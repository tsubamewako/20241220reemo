const BOT_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_TOKEN');
const USER_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_USER_TOKEN');

/** スラックからのリクエストを受け取るメソッド */
function doPost(e) {
  // SlackからのHTTP POSTリクエストのデータを取得
  let params;
  if (e.postData.type === 'application/json') {
    // データがJSON形式の場合
    params = JSON.parse(e.postData.contents);
    //console.log('eventLog: ' + e.postData.contents);  // ログ出力

  } else if (e.postData.type === 'application/x-www-form-urlencoded') {
    // データがURLエンコード形式の場合
    params = JSON.parse(e.parameter.payload);
    //console.log('buttonLog: ' + e.parameter.payload); // ログ出力
    
  } else {
    throw new Error('Unsupported content type');
  }

  if (params.type === 'url_verification') {
    return ContentService.createTextOutput(params.challenge);
  }

  // ユーザがボタンを押した場合
  if (params.type === 'block_actions') {
    buttonEvent(params);
    
  // ユーザがメッセージを送信した場合
  } else if (params.type === 'event_callback') {
    if (params.event.type === 'message' && params.event.bot_id === undefined) {
      handleEvent(params.event);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ 'challenge': params.challenge }));
}

/** ユーザからのメッセージを受け取った際の処理を行うメソッド */
function handleEvent(event) {
  switch (event.text) {
    case 'リモコン':
      sendMessage(event.ts, createBlock8(), BOT_TOKEN);
      break;
    case 'エアコンつけといてー':
      const data = getApplianceData(); //appliancesの取得
      const button = data[2].settings.button;
      let mode = data[2].settings.mode;
      const temp = data[2].settings.temp;

        if (mode === 'auto') {
          mode = 'AI快適自動';
        } else if (mode === 'cool') {
          mode = '冷房';
        } else if (mode === 'warm') {
          mode = '暖房';
        }

      if (button === 'power-off') {
        sendReaction(event.ts, '+1');
        //doAircon(2, '', '', '');
        sendMessage(event.ts, createBlock13(mode, temp), BOT_TOKEN);

      } else if (button === '') {
        sendReaction(event.ts, 'eyes');
        sendMessage(event.ts, createBlock15(mode, temp), BOT_TOKEN);
      } 

      break;
    default:
      sendReaction(event.ts, 'question');
  }
}

/** ユーザがボタンを押した際の処理を行うメソッド */
function buttonEvent(params) {

  const ts = params.message.ts;
  const url = params.response_url;
  const action = params.actions[0];

  switch (action.action_id) {
    case '外出中':
      sendMessage2(createBlock7(), url);
      sendMessage(ts, createBlock1(), USER_TOKEN); // '[外出中]を選択しました'

      setData(0, getLastData(), 9);
      setData(0, getLastData(), 8); // 人感更新の有無を上書き
      //doLight(0, 'off'); // 寝室の照明オフ
      //doLight(1, 'off'); // リビングの照明オフ
      //doAircon(2, 'power-off', '', ''); // リビングのエアコンオフ

      sendMessage(ts, createBlock3(), BOT_TOKEN);
      break;
    case '在宅中':
      sendMessage2(createBlock9(), url);
      sendMessage(ts, createBlock2(), USER_TOKEN); // '[在宅中]を選択しました'

      setData(1, getLastData(), 9);
      setData(1, getLastData(), 8); // 人感更新の有無を上書き

      sendMessage(ts, createBlock4(), BOT_TOKEN);
      break;
    case '照明＠寝室':
      sendRemocon(0, url);
      break;
    case '照明＠リビング':
      sendRemocon(1, url);
      break;
    case 'エアコン＠リビング':
      sendRemocon(2, url);
      break;
    case '点灯':
      doLight(1, 'on')
      break;
    case '消灯＠リビング':
      doLight(1, 'off')
      break;
    case '常夜灯':
      doLight(1, 'night')
      break;
    case '全灯':
      doLight(0, 'on')
      break;
    case '消灯＠寝室':
      doLight(0, 'off')
      break;
    case '保安灯':
      doLight(0, 'night')
      break;
    case '更新[0]':
      sendRemocon(0, url);
      break;
    case '更新[1]':
      sendRemocon(1, url);
      break;
    case '更新[2]':
      sendRemocon(2, url);
      break;
    case 'AI快適自動':
      doAircon(2, '', 'auto', '');
      break;
    case '停止':
      doAircon(2, 'power-off', '', '');
      break;
    case '冷房':
      doAircon(2, '', 'cool', action.selected_option.value); // プルダウンから温度を受け取る
      break;
    case '暖房':
      doAircon(2, '', 'warm', action.selected_option.value);
      break;
    case 'リモコン選択に戻る':
      sendMessage2(createBlock8(), url);
      break;
    default:
      console.log('操作が指定されていません');
  }
}