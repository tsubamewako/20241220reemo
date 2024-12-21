const REMO_TOKEN = PropertiesService.getScriptProperties().getProperty('REMO_TOKEN');

/** RemoからGET（1/devices）でRemoの本体データを取得するメソッド */
function getNatureRemoData() {
  const url = 'https://api.nature.global/1/devices';

  const headers = {
    'Content-Type' : 'application/json;',
    'Authorization': 'Bearer ' + REMO_TOKEN,
  };
 
  const options = {
    'method' : 'get',
    'headers' : headers,
  };

  //console.log('NatureRemoData: ' + UrlFetchApp.fetch(url, options));  // ログ出力
  return JSON.parse(UrlFetchApp.fetch(url, options));
}

/** RemoからGET（1/appliance）でRemoに登録済みの機器データを取得するメソッド */
function getApplianceData() {
  const url = 'https://api.nature.global/1/appliances';

  const headers = {
    'Content-Type' : 'application/json;',
    'Authorization': 'Bearer ' + REMO_TOKEN,
  };
 
  const options = {
    'method' : 'get',
    'headers' : headers,
  };

  //console.log('ApplianceData: ' + UrlFetchApp.fetch(url, options));  // ログ出力
  return JSON.parse(UrlFetchApp.fetch(url, options));
}

/** RemoからPOST（1/appliance/{applianceid}/light）で照明を操作するメソッド*/
function doLight(n, cmd) { // n = (1: リビング，0: 寝室)
  const data = getApplianceData();
  const url = 'https://api.nature.global/1/appliances/' + data[n].id + '/light';
  const payload = {
    'button' : cmd // 起動（'on'）or 停止（'off'）or 常夜灯/保安灯（'night'） 
  };
  const headers = {
    'Authorization': 'Bearer ' + REMO_TOKEN,
  };
  const options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : payload,
  };

  UrlFetchApp.fetch(url, options);
}

/** RemoからPOST（1/appliance/{applianceid}/aircon_settings）でエアコンを操作するメソッド */
function doAircon(n, cmd, mode, temp) { // n = (2: リビング)
  const data = getApplianceData();
  const url = 'https://api.nature.global/1/appliances/' + data[n].id + '/aircon_settings';

  const payload = {
    'button' : cmd, // 起動（''）or 停止（'power-off'）
    'operation_mode': mode, // AI自動（'auto'）or 冷房（'cool'）or 暖房（'warm'）
    'temperature' : temp // 温度
  };
  const headers = {
    'Authorization': 'Bearer ' + REMO_TOKEN
  };
  const options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : payload
  };

  UrlFetchApp.fetch(url, options);
}