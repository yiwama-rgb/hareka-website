---
title: "HubSpot APIをClaude Codeで叩く方法【初心者向け手順書】"
description: "エンジニアでなくてもHubSpot APIをClaude Codeで操作できます。APIキーの取得からデータ取得の実行まで、実体験をもとに解説します。"
pubDate: 2026-04-13
category: "AI × 営業"
---

「APIって聞いたことはあるけど、エンジニアじゃないし自分には無縁だと思っていた」——私も最初はそうでした。でも実際にClaude Codeを使ってHubSpot APIを叩いてみたら、思っていたより全然難しくありませんでした。今回は、その手順を正直に、細かいところまで書きます。

**結論：APIキーを取得してClaude Codeに渡すだけで、日本語の指示でHubSpotのデータを操作できます。** プログラミング経験がなくても動きます。ただし、最初の設定でいくつかつまずきポイントがあります。

## 準備するもの

- HubSpotのアカウント（無料でもOK）
- Claude Code（Anthropicのサービス。月20ドル前後のProプランが必要）
- ターミナル（MacならデフォルトでインストールされているTerminal.appでOK）

これだけです。特別なソフトウェアの追加インストールは基本的に不要です。

## ステップ1：HubSpot APIキーの取得

API（外部からHubSpotを操作するための鍵）を取得します。

1. HubSpotにログイン
2. 右上のアカウントアイコン → **「統合」** → **「プライベートアプリ」**
3. 「プライベートアプリを作成」をクリック
4. アプリ名（例：「Claude Code連携」）を入力
5. 「スコープ」タブで、使いたい権限を選択

### スコープの選び方

スコープとは「このAPIキーに何を許可するか」の設定です。最初は以下の読み取り系だけ選ぶのが安全です：

- `crm.objects.contacts.read`（コンタクト読み取り）
- `crm.objects.deals.read`（商談読み取り）
- `crm.objects.companies.read`（会社読み取り）

データを更新・作成したい場合は後から`.write`権限も追加できます。

6. 「アプリを作成」→ トークン（英数字の長い文字列）が表示される
7. **このトークンをコピーしておく（一度しか表示されません）**

## ステップ2：Claude Codeの起動と環境変数の設定

ターミナルを開いてClaude Codeを起動します。

```bash
claude
```

次に、APIキーを環境変数として設定します。環境変数とは「プログラムが参照できる設定値」のことです。

Claude Codeのチャット画面で以下のように伝えます：

```
HubSpotのAPIキーは "pat-na2-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" です。
このキーを使って、HubSpotのコンタクト一覧を10件取得するPythonスクリプトを作成して実行してください。
```

Claude Codeが自動でスクリプトを生成し、実行します。

## ステップ3：実際のコード例

参考までに、Claude Codeが生成するコードの例を示します（実際には自分でコードを書く必要はありません）：

```python
import requests

HUBSPOT_TOKEN = "your-token-here"

url = "https://api.hubapi.com/crm/v3/objects/contacts"
headers = {
    "Authorization": f"Bearer {HUBSPOT_TOKEN}",
    "Content-Type": "application/json"
}
params = {
    "limit": 10,
    "properties": ["firstname", "lastname", "email", "lifecyclestage"]
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

for contact in data.get("results", []):
    props = contact.get("properties", {})
    print(f"{props.get('firstname')} {props.get('lastname')} - {props.get('email')}")
```

このコードを理解する必要はありません。「HubSpotのコンタクトを10件取ってきて」と日本語で伝えれば、Claude Codeがこれを書いて実行してくれます。

## よくつまずくポイント

### APIキーのスコープ不足

「401 Unauthorized」というエラーが出る場合、APIキーに必要なスコープが設定されていない可能性があります。HubSpotでAPIキーのスコープを確認・追加してください。

### レート制限エラー

「429 Too Many Requests」が出たら、APIのリクエスト頻度が高すぎます。Claude Codeに「少し間隔を開けながら実行して」と伝えれば修正してくれます。

### 日本語の文字化け

データに日本語が含まれる場合、出力が文字化けすることがあります。「UTF-8で出力して」と一言添えると解決します。

## 限界・注意点

**APIキーは絶対に外部に漏らさないでください。** GitHubなどにコードを公開する際、APIキーをコードに直書きしたままpushしてしまう事故が実際に起きています。環境変数（`.env`ファイル）に分けて管理することを強く推奨します。

**HubSpotのAPIバージョンは更新されます。** 古い記事に書いてあるエンドポイント（APIのURL）が使えなくなっていることがあります。2024年以降はv3系を使うのが基本です。

**大量データの取得は時間がかかります。** コンタクトが数千件ある場合、全件取得には数分かかることがあります。

## まとめ

HubSpot APIをClaude Codeで叩くことは、エンジニアでなくても十分できます。最初の設定に20〜30分かかりますが、一度動いてしまえばあとは日本語で指示するだけです。「毎週同じデータを手動で集計している」という方には、間違いなく時間の節約になります。

## 次回予告

次回はHubSpotをMCP（Model Context Protocol）で連携する方法を解説します。MCPを使うと、APIキーの設定やコード実行なしにClaude Codeから直接HubSpotを操作できるようになります。
