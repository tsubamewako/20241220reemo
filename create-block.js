// 在宅確認メッセージ
function createBlock0() {
  const blocks = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":white_check_mark: *在宅確認* "
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "リビングの人感が検知されなくなりました！ 外出中であれば,  *全ての登録家電を停止* させます"
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "外出たでー :car: :dash:",
						"emoji": true
					},
					"action_id": "外出中"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "まだ家おるで :house: :couch_and_lamp:",
						"emoji": true
					},
					"action_id": "在宅中"
				}
			]
		}
	]

  return blocks;
}

// 「外出を確認」画面
function createBlock7() {
  const blocks = [
    {
			'type': 'divider'
		},
		{
			'type': 'section',
			'text': {
				'type': 'mrkdwn',
				'text': ':ballot_box_with_check: *外出を確認* '
			}
		},
  ]

  return blocks;
}

// 「在宅を確認」画面
function createBlock9() {
  const blocks = [
    {
			'type': 'divider'
		},
		{
			'type': 'section',
			'text': {
				'type': 'mrkdwn',
				'text': ':ballot_box_with_check: *在宅を確認* '
			}
		},
  ]

  return blocks;
}

// 「外出たでー」を選択しました
function createBlock1() {
  const blocks = [
    {
			'type': 'context',
			'elements': [
				{
					'type': 'mrkdwn',
					'text': '「 *`外出たでー`* 」を選択しました'
				}
			]
		}
  ]

  return blocks;
}

// 「まだ家おるで」を選択しました
function createBlock2() {
  const blocks = [
    {
			'type': 'context',
			'elements': [
				{
					'type': 'mrkdwn',
					'text': '「 *`まだ家おるで`* 」を選択しました'
				}
			]
		}
  ]

  return blocks;
}

// 全ての登録家電を停止させました
function createBlock3() {
  const blocks = [
    {
			'type': 'divider'
		},
		{
			'type': 'section',
			'text': {
				'type': 'mrkdwn',
				'text': '室内の無人が確認できたので， 全ての登録家電を停止させました :+1:'
			}
		}
  ]

  return blocks;
}

// 停止せず，引き続き稼働します
function createBlock4() {
  const blocks = [
    {
			'type': 'divider'
		},
		{
			'type': 'section',
			'text': {
				'type': 'mrkdwn',
				'text': 'かしこまりました！ 停止せず，引き続き稼働します :ok_hand:'
			}
		}
  ]

  return blocks;
}

// 室温温度 > 30 で冷房を稼働するメッセージ
function createBlock5() {
  const blocks = [
    {
			'type': 'divider'
		},
    {
			'type': 'context',
			'elements': [
				{
					'type': 'mrkdwn',
					'text': ':pushpin:  `エアコン稼働通知`  リビングの気温が30℃を上回ったため,  *冷房* を起動させました！'
				}
			]
		}
  ]

  return blocks;
}

// 室温温度 < 18 で暖房を稼働するメッセージ
function createBlock14() {
  const blocks = [
    {
			'type': 'divider'
		},
    {
			'type': 'context',
			'elements': [
				{
					'type': 'mrkdwn',
					'text': ':pushpin:  `エアコン稼働通知`  リビングの気温が18℃を下回ったため,  *暖房* を起動させました！'
				}
			]
		}
  ]

  return blocks;
}

// 使用するリモコンを選択してください
function createBlock8() {
  const blocks = [
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "plain_text",
					"text": "使用するリモコンを選択してください：",
					"emoji": true
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "エアコン :cyclone:  ____  リビング",
						"emoji": true
					},
					"action_id": "エアコン＠リビング"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "照明 :bulb:  ________  リビング",
						"emoji": true
					},
					"action_id": "照明＠リビング"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "照明 :bulb:  ____________  寝室",
						"emoji": true
					},
					"action_id": "照明＠寝室"
				}
			]
		}
	]

  return blocks;
}

// 照明(寝室)のリモコン
function createBlock11(last_button) {
  const blocks = [
		{
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': '照明 ＠寝室',
				'emoji': true
			}
		},
    {
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '現在の状態',
					'emoji': true
				}
			]
		},
		{
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': ':white_small_square:  ' + last_button + '  :white_small_square:',
				'emoji': true
			}
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '更新',
						'emoji': true
					},
					'action_id': '更新[0]'
				}
			]
		},
		{
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '操作を選択してください：',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '全灯',
						'emoji': true
					},
					'style': 'danger',
					'action_id': '全灯'
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '消灯',
						'emoji': true
					},
					'style': 'primary',
					'action_id': '消灯＠寝室'
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '保安灯',
						'emoji': true
					},
					'action_id': '保安灯'
				}
			]
		},
    {
			'type': 'divider'
		},
    {
			'type': 'divider'
		},
    {
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '\t',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': ':arrow_right_hook:  リモコン選択に戻る',
						'emoji': true
					},
					'action_id': 'リモコン選択に戻る'
				}
			]
		}
	]

  return blocks;
}

// 照明(リビング)のリモコン
function createBlock10(last_button) {
  const blocks = [
    {
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': '照明 ＠リビング',
				'emoji': true
			}
		},
    {
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '現在の状態',
					'emoji': true
				}
			]
		},
		{
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': ':white_small_square:  ' + last_button + '  :white_small_square:',
				'emoji': true
			}
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '更新',
						'emoji': true
					},
					'action_id': '更新[1]'
				}
			]
		},
		{
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '操作を選択してください：',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '点灯',
						'emoji': true
					},
					'style': 'danger',
					'action_id': '点灯'
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '消灯',
						'emoji': true
					},
					'style': 'primary',
					'action_id': '消灯＠リビング'
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '常夜灯',
						'emoji': true
					},
					'action_id': '常夜灯'
				}
			]
		},
    {
			'type': 'divider'
		},
    {
			'type': 'divider'
		},
    {
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '\t',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': ':arrow_right_hook:  リモコン選択に戻る',
						'emoji': true
					},
					'action_id': 'リモコン選択に戻る'
				}
			]
		}
	]

  return blocks;
}

// エアコン(リビング)のリモコン
function createBlock6(mode, temp) {
  const blocks = [
    {
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': 'エアコン ＠リビング',
				'emoji': true
			}
		},
    {
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '現在の状態',
					'emoji': true
				}
			]
		},
		{
			'type': 'header',
			'text': {
				'type': 'plain_text',
				'text': ':white_small_square:  ' + mode + temp + '  :white_small_square:',
				'emoji': true
			}
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '更新',
						'emoji': true
					},
					'action_id': '更新[2]'
				}
			]
		},
		{
			'type': 'divider'
		},
		{
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '操作を選択してください：',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': 'AI快適自動',
						'emoji': true
					},
					'style': 'danger',
					'action_id': 'AI快適自動'
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': '停止',
						'emoji': true
					},
					'style': 'primary',
					'action_id': '停止'
				},
			]
		},
		{
			'type': 'section',
			'text': {
				'type': 'plain_text',
				'text': '冷房',
				'emoji': true
			}
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'static_select',
					'placeholder': {
						'type': 'plain_text',
						'text': '温度を選択してください',
						'emoji': true
					},
					'options': [
            {
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '前回と同じ温度'
							},
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '28℃'
							},
							'value': '28'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '27℃'
							},
							'value': '27'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '26℃'
							},
							'value': '26'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '25℃'
							},
							'value': '25'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '24℃'
							},
							'value': '24'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '23℃'
							},
							'value': '23'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '22℃'
							},
							'value': '22'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '21℃'
							},
							'value': '21'
						}
					],
					'action_id': '冷房'
				}
			]
		},
		{
			'type': 'section',
			'text': {
				'type': 'plain_text',
				'text': '暖房',
				'emoji': true
			}
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'static_select',
					'placeholder': {
						'type': 'plain_text',
						'text': '温度を選択してください',
						'emoji': true
					},
					'options': [
            {
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '前回と同じ温度'
							},
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '21℃'
							},
							'value': '21'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '22℃'
							},
							'value': '22'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '23℃'
							},
							'value': '23'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '24℃'
							},
							'value': '24'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '25℃'
							},
							'value': '25'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '26℃'
							},
							'value': '26'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '27℃'
							},
							'value': '27'
						},
						{
							'text': {
								'type': 'plain_text',
								'emoji': true,
								'text': '28℃'
							},
							'value': '28'
						}
					],
					'action_id': '暖房'
				}
			]
		},
    {
			'type': 'divider'
		},
    {
			'type': 'divider'
		},
    {
			'type': 'context',
			'elements': [
				{
					'type': 'plain_text',
					'text': '\t',
					'emoji': true
				}
			]
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': ':arrow_right_hook:  リモコン選択に戻る',
						'emoji': true
					},
					'action_id': 'リモコン選択に戻る'
				}
			]
		}
  ]

  return blocks;
}

// エアコン起動メッセージ
function createBlock13(mode, temp) {
  const blocks = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": mode + "を" + temp + "℃で起動しました :smirk_cat:"
			}
		}
	]

  return blocks;
}

// エアコン稼働済みメッセージ
function createBlock15() {
  const blocks = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": mode + "が" + temp + "℃で稼働済みです :smiley_cat:"
			}
		}
	]

  return blocks;
}

// グラフを送信するメッセージ
function createBlock12(fileId) {
  const blocks = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":star_and_crescent: *おやすみモード（21:00 ～ 6:00）* "
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "今日も１日おつかれさまでした！\n明日の朝６時まで *人感センサを停止* します"
				}
			]
		},
		{
			"type": "image",
			"image_url": "https://drive.google.com/uc?id=" + fileId,
			"alt_text": "image"
		}
	]

  return blocks;
}