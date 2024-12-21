const CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID');

/** 特定のメッセージにリアクションを付けるメソッド */
function sendReaction (ts, reactionName) {
  const url = 'https://slack.com/api/reactions.add';

  const payload = {
    'channel': CHANNEL_ID,
    'name': reactionName,
    'timestamp':ts
  }

  const headers = {
    'Authorization': 'Bearer ' + BOT_TOKEN
  }

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers': headers,
    'payload' : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

/** (特定のスレッドに)メッセージをブロックで送信するメソッド */
function sendMessage (ts, blocks, token) {
  const url = 'https://slack.com/api/chat.postMessage';

  const payload = {
    'channel': CHANNEL_ID,
    'blocks' : blocks,
    'thread_ts': ts
  };

  const headers = {
    'Authorization': 'Bearer ' + token
  }

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers': headers,
    'payload' : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

/** ボタン押下後の画面に遷移させるメソッド */
function sendMessage2 (blocks, url) {
  const payload = {
    'blocks' : blocks
  };

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

/** エラー発生時にエラー内容をアラートするメソッド */
function alart (message) {
  const url = 'https://slack.com/api/chat.postMessage';

  const payload = {
    'channel': CHANNEL_ID,
    'text' : message
  };

  const headers = {
    'Authorization': 'Bearer ' + BOT_TOKEN
  }

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers': headers,
    'payload' : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

/** リモコンを送信するメソッド */
function sendRemocon (n, url) {
  const data = getApplianceData(); //appliancesの取得

  switch (n) {
    case 0: // 証明＠寝室のリモコン
      let last_button0 = data[0].light.state.last_button;

      if (last_button0 === 'on') {
        last_button0 = '全灯'
      } else if (last_button0 === 'off') {
        last_button0 = '消灯';
      } else if (last_button0 === 'night') {
        last_button0 = '保安灯';
      }
      
      sendMessage2(createBlock11(last_button0), url);
      break;
    case 1: // 証明＠リビングのリモコン
      let last_button1 = data[1].light.state.last_button;

      if (last_button1 === 'on') {
        last_button1 = '点灯'
      } else if (last_button1 === 'off') {
        last_button1 = '消灯';
      } else if (last_button1 === 'night') {
        last_button1 = '常夜灯';
      }
      
      sendMessage2(createBlock10(last_button1), url);
      break;
    case 2: // エアコン＠リビングのリモコン
      const button = data[2].settings.button;
      let mode = data[2].settings.mode;
      const temp = data[2].settings.temp;

      if (button === 'power-off') {
        sendMessage2(createBlock6('停止中', ''), url);

      } else if (button === '') {
        if (mode === 'auto') {
          mode = 'AI快適自動運転中 : ±';
        } else if (mode === 'cool') {
          mode = '冷房稼働中 : ';
        } else if (mode === 'warm') {
          mode = '暖房稼働中 : ';
        }
        sendMessage2(createBlock6(mode, temp + '℃'), url);
      }
        
      break;
    default:
      console.log('リモコンを送信できませんでした');
  }
}