import requests

jsonFile = open("DataProtocol.json", "r").read()
response = requests.post("http://127.0.0.1:5000/postData", json=jsonFile)

if not response.ok:
    print(f"Mistake in {response}")
    exit()

print(response.text)



