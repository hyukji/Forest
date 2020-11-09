import tokenize
import preference as pf
from crawling import getText, getOneText

import pandas as pd


def One_preference_total(problems):
    subresult = []
    num = 0
    for title in problems:
        num += 1
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            tokens = tokenize.tokenize(fr.readline)
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            try:
                res = pf.Quote_Preference(tokens)
            except:    # 예외가 발생했을 때 실행됨
                # print('코드상의 에러가 발생.')
                res = []
                continue

            if subresult == []:
                # print(subresult)
                subresult = res
            else:
                length = len(res)
                for i in range(length):
                    subresult[i] += res[i]

    if subresult != [] and subresult[len(subresult) - 1] != 0:
        for j in range(len(subresult) - 1):
            float_result = subresult[j] / \
                subresult[len(subresult) - 1]
            subresult[j] = round(float_result, 2)
    else:
        return []

    return subresult


def preference_total(problems):
    subresult = [[], [], [], [], [], []]
    preference_func = [pf.Quote_Preference, pf.InequalitySign_Preference, pf.Loop_Preference,
                       pf.String_Preference, pf.TrinomialOP_Preference, pf.C_codingstyle_Preference]

    num = 0
    for title in problems:
        res = [[], [], [], [], [], []]
        num += 1
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            try:
                tokens = list(tokenize.tokenize(fr.readline))
                # print(len(tokens))
            except:    # 예외가 발생했을 때 실행됨
                # print('token상의 에러가 발생.')
                continue
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            for i in range(6):
                try:
                    res[i] = preference_func[i](tokens)
                    # print(res[i])
                except:    # 예외가 발생했을 때 실행됨
                    # print('코드상의 에러가 발생.')
                    res[i] = []
                    continue

                if num == 1 or subresult[i] == []:
                    # print(subresult)
                    subresult[i] = res[i]
                else:
                    # print(subresult, res[i], i, num)
                    length = len(res[i])
                    for j in range(length):
                        subresult[i][j] += res[i][j]
    # print(subresult)

    for i in range(4):
        if subresult[i] == [] or subresult[i][len(subresult[i]) - 1] == 0:
            continue
        else:
            for j in range(len(subresult[i]) - 1):
                float_result = subresult[i][j] / \
                    subresult[i][len(subresult[i]) - 1]
                subresult[i][j] = round(float_result, 2)

    # float_result = subresult[5][0] / subresult[5][1]
    # subresult[5][0] = round(float_result, 2)

    return subresult


# 전체 코드 받는 거
users = getText(
    'http://114.71.103.80/new_db.php?q=select+*+from+users+limit+200', '1')

total_res = []
num = 0
for user in users:
    select_res = []
    num += 1
    problems = getText('http://114.71.103.80/new_db.php?q=select+*+from+code_submission+c%2C+%28select+id%2C+max%28regtime%29+a+from+code_submission+where+id+%3D+' +
                       user+'++group+by+p_no%29+d+where+c.id+%3D+d.id+and+d.a+%3D+c.regtime+', '4')

    res = preference_total(problems)

    quote_res = res[0]
    if(quote_res != [] and quote_res[len(quote_res) - 1] > 200):
        for i in range(6):
            select_res.append(res[i][0])

        select_res[5] = round(res[5][0] / res[5][1], 2)
        select_res.insert(0, user)

        total_res.append(select_res)

    print(select_res, num)

# print(total_res)
dataframe = pd.DataFrame(total_res)
dataframe.to_csv("prefer_result.csv")


# 한개 받는거
# users = getText(
#     'http://114.71.103.80/new_db.php?q=select+*+from+users+limit+200', '1')

# total_res = []
# for user in users:
#     problems = getText('http://114.71.103.80/new_db.php?q=select+*+from+code_submission+c%2C+%28select+id%2C+max%28regtime%29+a+from+code_submission+where+id+%3D+' +
#                        user+'++group+by+p_no%29+d+where+c.id+%3D+d.id+and+d.a+%3D+c.regtime+', '4')

#     res = One_preference_total(problems)

#     if(res != [] and res[len(res) - 1] > 200):
#         res.insert(0, user)
#         total_res.append(res)
# #     total_res.append(res)

# print(total_res)

# x1 = []
# x2 = []
# for i in range(len(total_res)):
#     x1.append(total_res[i][0])
#     x2.append(total_res[i][1])

# # print(x1, x2)
# dataframe = pd.DataFrame(x2, x1, columns=['quote_percent'])


# print(dataframe)

# dataframe.to_csv("prefer_result.csv")
