# parser.py
def getText(user_url, num):
    # user_url은 검색한 후 주소.
    # num은 가로로 몇번째인지 (첫번째면 1)
    # return 값은 list이므로 for문으로 꺼내주어야 함.
    import requests
    from bs4 import BeautifulSoup

    req = requests.get(user_url)
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')

    my_titles = soup.select(
        'tr > td:nth-child(' + str(num) + ') > pre'
    )

    res_text = []

    for title in my_titles:
        # Tag안의 텍스트
        res_text.append(title.text)
        # Tag의 속성을 가져오기(ex: href속성)
        # print(title.get('href'))

    return res_text


def getOneText(user_url, n, m):
    # user_url은 검색한 후 주소.
    # num은 가로로 몇번째인지 (첫번째면 1)
    # return 값은 list이므로 for문으로 꺼내주어야 함.
    import requests
    from bs4 import BeautifulSoup

    req = requests.get(user_url)
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')

    my_titles = soup.select(
        'tr:nth-child(' + n + ') > td:nth-child(' + m + ') > pre '
        # 'tr > td:nth-child(' + str(n) + ') > pre'
    )

    res_text = []

    for title in my_titles:
        # Tag안의 텍스트
        res_text.append(title.text)
        # Tag의 속성을 가져오기(ex: href속성)
        # print(title.get('href'))

    return res_text
