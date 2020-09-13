import tokenize


def Quote_Preference(tokens):
    # 문자열에서 “, ‘ 선호도
    # parameter : tokenize된 값
    # return: Array(3) => 0: "" 의 개수, 1: '' 의 개수, 2: 총 개수
    result = [0, 0, 0]
    for tok in tokens:
        if(tokenize.tok_name[tok.exact_type] == "STRING"):
            result[2] += 1
            if tok.string[0] == '"':
                result[0] += 1
            else:
                result[1] += 1
    return result


def InequalitySign_Preference(tokens):
    # 부등호 선호도(<,>,<=,>=)
    # parameter : tokenize된 값
    # return: Array(3) => 0: "" 의 개수, 1: '' 의 개수, 2: 총 개수
    Less = ["<", "<="]
    Greater = [">", ">="]
    result = [0, 0, 0]
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "OP"):
            if (tok.string in Less):
                result[0] += 1
            elif(tok.string in Greater):
                result[1] += 1
    result[2] = result[0]+result[1]

    return result


def Loop_Preference(tokens):
    # for, while 선호도  Caliskan-Islam et al, (2015) 임진수(2012)
    # parameter : tokenize된 값
    # return: Array(3) => 0: for 의 개수, 1: while 의 개수, 2: 총 개수
    result = [0, 0, 0]
    for tok in tokens:
        if(tokenize.tok_name[tok.exact_type] == tokenize.tok_name[tok.type] == "NAME"):
            if tok.string == 'for':
                result[0] += 1
            elif tok.string == 'while':
                result[1] += 1

    result[2] = result[0]+result[1]
    return result


def String_Preference(tokens):
    # 문자열 방식 구분 +,  %-formatting, str.format(), f-string
    # parameter : tokenize된 값
    # return: Array(5) => +,  %-formatting, str.format(), f-string, print 나온 총 개수
    isprint = False
    bracket = 0
    subresult = [False, False, False, False, True]
    result = [0, 0, 0, 0, 0]
    for tok in tokens:
        #         NAME NAME 'print'
        # OP LPAR '('

        if(isprint == False):
            if(tokenize.tok_name[tok.exact_type] == tokenize.tok_name[tok.type] == "NAME" and tok.string == "print"):
                isprint = True

        else:
            if(tokenize.tok_name[tok.exact_type] == "LPAR" and tok.string == '('):
                bracket += 1
                continue

            elif(tokenize.tok_name[tok.exact_type] == "RPAR" and tok.string == ')'):
                bracket -= 1
                if(bracket == 0):
                    isprint = False
                    for i in range(5):
                        if(subresult[i]):
                            result[i] += 1
                    subresult = [False, False, False, False, True]
                continue

            if(bracket > 0):
                if(tokenize.tok_name[tok.exact_type] == "OP" and tok.string == '+'):
                    subresult[0] = True
                elif(tokenize.tok_name[tok.exact_type] == "OP" and tok.string == '%'):
                    subresult[1] = True
                elif(tokenize.tok_name[tok.exact_type] == "NAME" and tok.string == 'format'):
                    subresult[2] = True
                elif(tokenize.tok_name[tok.exact_type] == "STRING" and tok.string[0] == 'f'):
                    subresult[3] = True

    return result


def TrinomialOP_Preference(tokens):
    # 삼항 연산자 선호도. if else	Caliskan-Islam et al, (2015) (c++을 기준으로 함.)
    # parameter : tokenize된 값
    # return: 삼항연산자 사용한 횟수
    result = 0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NAME" and tok.string == "if"):
            result += 1
            if(":" in tok.line):
                result -= 1

    return result


# is, == 선호도 pep8(boolean시 작성X>is>None 순으로 권장)


# true, false 대신에 0,1 로 구분 C코딩 스타일
