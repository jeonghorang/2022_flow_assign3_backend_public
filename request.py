import requests

url = "http://192.249.18.179"
api = "/api/msg"

response = requests.get(url+api)

print(response.content)
