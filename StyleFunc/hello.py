import requests
from bs4 import BeautifulSoup

# 문자열을 받아와 영어 단어로 분리, 웹사전으로 부터 단어의 뜻을 가져와 key:단어, value:듯으로 구성된 사전을 만드시오.
def make_dictionary(document):
    document = document.replace(",", "") 
    document = document.replace(".", "") 
    list = document.split(" ") 

    dic = {}
    for word in list:
        #res = requests.get('http://10.180.2.80/dict.html?query=' + word)
        res = requests.get('http://114.71.103.80/dict.html?query='+word)
        soup = BeautifulSoup(res.content, 'html.parser')

        dic[word] = str(soup)[str(soup).find('', 432)+4: str(soup).find('<', 453)]

    return dic


data = "first, solve the problem. then, write the code."
print(make_dictionary(data))
