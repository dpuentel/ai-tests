# GitHub discussion comments

## Curl request

```bash
curl 'https://api.github.com/graphql' \
-H 'Accept-Encoding: gzip, deflate, br' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Connection: keep-alive' \
-H 'Origin: devfest-workshop' \
-H 'Authorization: bearer your_github_token' \
--data-binary '{"query":"query {\n  repository(owner: \"dpuentel\", name: \"ai-tests\") {\n    discussion(number: 1) {\n      answer {\n        body\n      }\n      comments(first:10) {\n        nodes {\n          id,\n          body\n        }\n      }\n    }\n  }\n}\n","variables":{}}' \
--compressed
```

## Response

```json
{
  "data": {
    "repository": {
      "discussion": {
        "answer": null,
        "comments": {
          "nodes": [
            {
              "id": "DC_kwDOKtEQAc4AdanB",
              "body": "A good library that will be better when the gpu can be used."
            },
            {
              "id": "DC_kwDOKtEQAc4Adarp",
              "body": "Should have more pre-trained models"
            }
          ]
        }
      }
    }
  }
}
```

## JavaScript fetch request

```js
const query = `query {
  repository(owner: "dpuentel", name: "ai-tests") {
    discussion(number: 1) {
      answer {
        body
      }
      comments(first:10) {
        nodes {
          body
        }
      }
    }
  }
}`

const variables = {}

const options = {
  method: 'POST',
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Connection: 'keep-alive',
    Origin: 'devfest-workshop',
    Authorization:
      'bearer your_github_token'
  },
  body: JSON.stringify({ query, variables })
}

const response = await fetch('https://api.github.com/graphql', options)
const comments = res.json()
console.log({comments})
```
