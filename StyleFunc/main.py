import tokenize
import preference as pf
from crawling import getText, getOneText

a = getText('http://114.71.103.80/new_db.php?q=select+*+from+code_submission+c%2C+%28select+id%2C+max%28regtime%29+a+from+code_submission+where+id+%3D+201911044++group+by+p_no%29+d+where+c.id+%3D+d.id+and+d.a+%3D+c.regtime+',  '4')


num = 0
for title in a:
    num += 1
    with open('hello.py', 'wb+') as fw:
        fw.write(title.encode('utf-8'))

    with open('hello.py', 'rb') as fr:
        tokens = tokenize.tokenize(fr.readline)
        # tokens = tokenize.generate_tokens(f.readline)
        # pf.check_token(tokens)
        try:
            print(pf.C_codingstyle_Preference(tokens), num)
        except:    # 예외가 발생했을 때 실행됨
            print('코드상의 에러가 발생.')

# with open('hello.py', 'rb') as f:
#     tokens = tokenize.tokenize(f.readline)

# with open('hello.py', 'rb') as f:
#     tokens = tokenize.tokenize(f.readline)
#     for tok in tokens:
#         print(tokenize.tok_name[tok.type],
#               tokenize.tok_name[tok.exact_type], repr(tok.string))


# import tokenize
# import preference as pf
# from crawling import getText, getOneText


# with open('hello.py', 'rb') as f:
#     tokens = tokenize.tokenize(f.readline)
#     print(pf.C_codingstyle_Preference(tokens))
