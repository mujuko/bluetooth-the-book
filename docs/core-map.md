# 付録D Core 仕様との対応表

第V部（Classic 編）と、[Bluetooth Core Specification v7.0](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/index-en.html) の対応をまとめました。骨組みにしたのは Vol 1 Part A の [Architecture 編](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/architecture%2C-change-history%2C-and-conventions/architecture--arch-.html)（ARCH）です。

**扱い**の見方は次のとおりです。

- ◎：本書でも説明した
- ○：要点を説明した（細部は仕様書へ）
- △：触れるだけにとどめた
- LE：LE 編で扱った

## Architecture 編との対応

| ARCH の節 | 内容 | 本書 | 扱い |
|---|---|---|---|
| §1 | 全体の説明、BR と LE、コントローラの形 | 第19章 | ◎ |
| §1.1 | BR/EDR の動作の概要 | 第19, 20章 | ◎ |
| §1.2 | LE の動作の概要 | LE 編 | LE |
| §1.4 | 用語 | 第19章、付録B | △ |
| §2 | コアシステムのアーキテクチャ | 第19章 | ○ |
| §2.1.1 | ホストの各ブロック | 第19, 27章 | ○ |
| §2.1.2 | コントローラの各ブロック | 第26章 | ◎ |
| §3.1 | データの種類と運び道、信頼性 | 第23, 24章 | ◎ |
| §3.2.1 | BR/EDR のパケットの構造 | 第21, 23章 | ◎ |
| §3.3.1 | BR/EDR の物理チャネル | 第20, 22, 23, 25, 30章 | ◎ |
| §3.4.1 | BR/EDR の物理リンク | 第23, 26章 | ◎ |
| §3.5.1〜3 | キャスト、スケジューリング、データの分類 | 第23章 | ◎ |
| §3.5.4.1 | ACL | 第24章 | ◎ |
| §3.5.4.2〜3 | SCO、eSCO | 第25章 | ◎ |
| §3.5.4.4 | APB | 第24章 | ○ |
| §3.5.4.8 | CPB | 第25章 | ○ |
| §3.5.5.1 | BR/EDR の論理リンク | 第23章 | ◎ |
| §3.6 | L2CAP チャネル | 第27章 | ◎ |
| §3.8.1 | BR/EDR の電力制御 | 第26章 | ○ |
| §4.1.1 | BR/EDR のトポロジ | 第20章 | ◎ |
| §4.2.1.1〜2 | Inquiry、Page | 第22章 | ◎ |
| §4.2.1.3 | 接続モード | 第23, 26章 | ◎ |
| §4.2.1.4〜5 | Hold、Sniff | 第26章 | ◎ |
| §4.2.1.7 | 役割の交代 | 第26章 | ◎ |
| §4.2.1.8 | EDR | 第21章 | ◎ |
| §4.2.1.9 | CPB モード | 第25章 | ○ |
| §5.1 | セキュリティの全体像 | 第29章 | ◎ |
| §5.2 | Secure Simple Pairing | 第29章 | ◎ |
| §5.3 | Secure Connections Only モード | 第29章 | ○ |
| §5.4 | LE のセキュリティ | 第16章 | LE |
| §5.6 | BR/EDR と LE の間の鍵の変換 | 第29章 | ○ |
| §6.1〜6.3 | プロファイル、GAP、階層 | 第28章 | ◎ |
| §6.4〜6.5 | GATT とその階層 | 第13, 14章 | LE |
| §7 | 共存の全体像 | 第30章 | ◎ |
| §7.2 | AFH | 第30章 | ◎ |
| §7.3 | Wi-Fi との共存 | 第30章 | ○ |
| §7.4〜7.7 | MWS との共存、時計の調整、SAM | 第30章 | ○ |
| §3.2.2, 3.3.2, 3.5.4.6〜 | LE の各部分 | 第4〜9章 | LE |
| §8, §9 | 方向探知、Channel Sounding | 第10章 | LE |

## Architecture 編以外から補った内容

Architecture 編には具体的な数字があまり載っていないので、次の編を読んで確認し、補いました。

| 編 | 補った内容 | 章 |
|---|---|---|
| [BB](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/br-edr-controller/baseband--bb--specification.html) §1, §2 | 時計、アドレス、スロット、ホッピングの速さ | 20 |
| BB §6 | パケットの形式、種類、速さの表 | 21, 25 |
| BB §7.6 | ARQ、再送のフィルタ、フラッシュ | 24 |
| BB §8.3, §8.4 | Inquiry、Page の手順と数字 | 22 |
| BB §8.6〜8.8 | ポーリング、SCO、eSCO、Sniff、Hold | 20, 25, 26 |
| BB §9 | 音声の符号化 | 25 |
| [RF](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/br-edr-controller/radiophysicallayer-rf--specification.html) | チャネルの周波数、変調、受信感度 | 21 |
| [LMP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/br-edr-controller/link-manager-protocol-lmp--specification.html) | PDU の名前、鍵の長さの制約 | 26, 29 |
| [SEC](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/br-edr-controller/security-sec--specification.html) | 世代ごとのアルゴリズム、SSP の段階 | 29 |
| [L2CAP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/host/logicallinkcontrol-andadaptationprotocol-l2cap--specification.html) | CID、PSM の規則、手順、モード、MTU | 27 |
| [SDP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/host/service-discovery-protocol--sdp--specification.html) | PDU、属性の説明 | 27 |
| [GAP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/host/genericaccess-profile-gap--specification.html) | モード、タイマー、セキュリティレベル、EIR | 22, 29 |
| [HCI](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/host-controller-interface/host-controller-interface--hci--functional-specification.html) | コマンドの名前、既定値、範囲 | 22, 24, 26, 29, 30 |
| [変更履歴](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/architecture%2C-change-history%2C-and-conventions/core-specification-change-history.html) | 機能が加わった版、削除された機能 | 19, 26 |
| [Assigned Numbers](https://www.bluetooth.com/specifications/assigned-numbers/) | UUID と PSM の値 | 27, 28 |

## プロファイルの仕様書との照合

プロファイルなどは Core 仕様の外にあります。第25、28、31章の記述に関わる部分を、次の版と照合しました（2026年11月）。各仕様書の全体を読み通したわけではありません。

| 仕様書 | 確かめた内容 | 章 |
|---|---|---|
| [RFCOMM v1.2](https://www.bluetooth.com/specifications/specs/rfcomm-1-2/) | TS 07.10 との関係、サーバチャネル 1〜30、最大 60 接続、RS-232 の再現 | 28 |
| [SPP v1.2](https://www.bluetooth.com/specifications/specs/serial-port-profile-1-2/) | 用途、SDP の記述の形式 | 27, 28 |
| [HSP v1.2](https://www.bluetooth.com/specifications/specs/headset-profile-1-2/) | SPP と GAP への依存、SCO と CVSD | 28 |
| [HFP v1.10](https://www.bluetooth.com/specifications/specs/hands-free-profile-1-10/) | RFCOMM と GAP への依存、AG と HF、AT コマンド、コーデック、eSCO の設定 | 25, 28, 31 |
| [A2DP v1.4.1](https://www.bluetooth.com/specifications/specs/advanced-audio-distribution-profile/) | SBC の必須、任意のコーデック、推奨の設定、SBC のヘッダ、GAVDP への依存 | 28, 31 |
| [GAVDP v1.3](https://www.bluetooth.com/specifications/specs/generic-a-v-distribution-profile-1-3/) | ストリームを開く手順、GAP への依存 | 28 |
| [AVDTP v1.3](https://www.bluetooth.com/specifications/specs/a-v-distribution-transport-protocol-1-3/) | RTP との関係、チャネルの開き方、12 バイトのヘッダ | 28, 31 |
| [AVRCP v1.6.3](https://www.bluetooth.com/specifications/specs/a-v-remote-control-profile1-6-3/) | CT と TG、AV/C、絶対音量、SDP の記述 | 28 |
| [AVCTP v1.4](https://www.bluetooth.com/specifications/specs/a-v-control-transport-protocol-1-4/) | L2CAP の使い方 | 28 |
| [HID v1.1.2](https://www.bluetooth.com/specifications/specs/human-interface-device-profile1-1-2ed2/) | 2本のチャネル、USB の HID との関係、Sniff の勧め | 28 |
| [GOEP v2.1.1](https://www.bluetooth.com/specifications/specs/generic-object-exchange-profile-2-1-1/) | OBEX over L2CAP、古い版との互換 | 28 |
| [OPP v1.2.1](https://www.bluetooth.com/specifications/specs/object-push-profile-1-2-1/)、[PBAP v1.2.3](https://www.bluetooth.com/specifications/specs/phone-book-access-profile-1-2-3/)、[MAP v1.4.3](https://www.bluetooth.com/specifications/specs/message-access-profile/) | 依存関係、OBEX の土台 | 28 |
| [VDP v1.1](https://www.bluetooth.com/specifications/specs/video-distribution-profile-1-1/) | GAVDP への依存 | 28 |
| [3DSP v1.0.3](https://www.bluetooth.com/specifications/specs/3d-synchronization-profile-1-0-3/) | 3D 眼鏡の同期の用途 | 25 |

次の値は、仕様書に直接は書かれておらず、仕様書の値から本書が計算したものです。

| 内容 | 計算のもとになる値 | 章 |
|---|---|---|
| HFP の T2 で 60 バイトを 12 スロットごとに送る | 片方向 8000 バイト/秒、7.5 ms のフレーム、2-EV3 の最大 60 バイト | 25, 31 |
| SBC の 5 フレームで 612 バイトになる | 推奨の 119 バイト、各ヘッダの長さ。まとめるフレームの個数は本書の例 | 31 |
| 音楽が電波の時間の 15% や 26% を使う | 上の値とパケットの種類 | 28, 31 |

## 照合していない内容

次の内容は仕様書と照合していません。正確な情報は原典を確かめてください。

| 内容 | 章 |
|---|---|
| KNOB、BIAS の攻撃の説明（報道と研究者の発表に基づく） | 29 |
| 古い呼び名、出力の等級（Class 1, 2） | 19, 21 |
| Wi-Fi のチャネル幅に基づく AFH の計算 | 30 |
| AT コマンドの歴史、音声の品質の説明 | 25, 28 |
| 製品の典型的な動き（通話で A2DP を止めるなど）、用途ごとの使い分けの提案（31.4 節） | 28, 31 |
| 第31章の総まとめ、確認問題、たとえ話、生物系と SE 向けの説明、図 | 全体 |

Classic 編の内容は、実機で確かめたものではありません。HCI のログなどで実際の動作を観察すると、順番や細部は機器によって異なるはずです。

## 仕様書を読んでいて気づいた点

執筆の際に次の点に気づきました（2026年11月に確認）。誤りと断定するものではなく、本書の読み違いの可能性もあります。

| 場所 | 記述 | 本書の見方 |
|---|---|---|
| ARCH §1 | BR の速さを 721.2 kb/s と紹介 | BB §6.7 の表では DH5 の片方向の最大は 723.2 kb/s で、計算でも再現できる。本書は BB の値を使った |
| ARCH §3.1.1 | ATT の固定チャネルは ACL-U または LE-U | L2CAP §2.1 の ACL-U の CID の表には `0x0004` がない。Assigned Numbers には ATT の PSM `0x001F` がある。本書は Classic の上の ATT を PSM で開くものとして書いた |
| ARCH §3.3.1 | 仕様は1台の機器が同時に1つの物理チャネルしか使えないと仮定 | 同じ節で、高度な機器は複数を同時に使えるかもしれないとも述べる。本書は基本の仮定で説明した |
| RF | 出力の等級（Power Class）の表がない | 古い版にはあった。本書は従来の呼び方として第21章で紹介するにとどめた |
| GOEP v2.1.1 §1.2 | OPP は GOEP と GAP に依存すると例示 | OPP v1.2.1 §1.2 は、古い版との互換のために SPP にも依存すると書く。図28-1 は OPP の記述に合わせた |

## 本書について

本書は Bluetooth SIG とは関係のない非公式の教材です。Core 仕様の文章や図は転載せず、話の順番、文章、図は書き下ろしました。Bluetooth® の名称とロゴは Bluetooth SIG, Inc. の登録商標です。

誤りを見つけたら、[GitHub の Issue](https://github.com/mujuko/bluetooth-the-book/issues) で教えてください。
