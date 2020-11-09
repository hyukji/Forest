import tokenize


def check_token(tokens):
    for tok in tokens:
        print(tokenize.tok_name[tok.type],
              tokenize.tok_name[tok.exact_type], repr(tok.string))


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
                # print(tok.string)
            elif tok.string[0] == "'" and tok.string[0] != tok.string[1]:
                result[1] += 1
                # print(tok.string)
            else:
                result[2] -= 1

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
                # print(tok.string)
            elif(tok.string in Greater):
                result[1] += 1
                # print(tok.string)

    result[2] = result[0]+result[1]

    return result


def TrinomialOP_Preference(tokens):
    # 삼항 연산자 선호도. if else	Caliskan-Islam et al, (2015) (c++을 기준으로 함.)
    # parameter : tokenize된 값
    # return: 삼항연산자 사용한 횟수
    result = [0]
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NAME" and tok.string == "if"):
            result[0] += 1
            if(":" in tok.line):
                result[0] -= 1

    return result


def C_codingstyle_Preference(tokens):
    # ()여부 if,elif 와 while => C코딩 스타일
    # parameter : tokenize된 값
    # return: Array( Array(2) *2 ) => [if,elif ()개수 , 총개수], [while ()개수 , 총개수]

    result = [0, 0, 0, 0]
    conditionalOp = ["if", "elif"]
    isconditional = 0
    for tok in tokens:
        if(isconditional == 1):
            if(tokenize.tok_name[tok.exact_type] == "LPAR" and tok.string == '('):
                result[0] += 1
            isconditional = 0
        elif(isconditional == 2):
            if(tokenize.tok_name[tok.exact_type] == "LPAR" and tok.string == '('):
                result[2] += 1
            isconditional = 0
        else:
            if(tokenize.tok_name[tok.exact_type] == "NAME" and tok.string in conditionalOp):
                isconditional = 1
                result[1] += 1
            elif(tokenize.tok_name[tok.exact_type] == "NAME" and tok.string == "while"):
                isconditional = 2
                result[3] += 1

    return result




# /////////////////////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////////////////////
def Loop_Preference(tokens):
    # for, while 선호도  Caliskan-Islam et al, (2015) 임진수(2012)
    # parameter : tokenize된 값
    # return: Array(3) => 0: for 의 개수, 1: while 의 개수, 2: 총 개수
    result = [0, 0, 0]
    for tok in tokens:
        if(tokenize.tok_name[tok.exact_type] == tokenize.tok_name[tok.type] == "NAME"):
            if tok.string == 'for':
                result[0] += 1
                # print(tok.string)
            elif tok.string == 'while':
                result[1] += 1
                # print(tok.string)

    result[2] = result[0]+result[1]
    return result


def String_Preference(tokens):
    # 문자열 방식 구분 +,  %-formatting, str.format(), f-string
    # parameter : tokenize된 값
    # return: Array(5) => +,  %-formatting, str.format(), f-string, print 나온 총 개수

    # 문제점: string으로 이루어진 두개의 변수합은 구분 못한다.

    isquote = False
    isquoteOp = False

    quote = ["'", '"']
    quoteOp = ["PLUSEQUAL", "STAR", "PLUS"]
    subresult = [False, False, False, False, True]
    result = [0, 0, 0, 0, 0]

    for tok in tokens:
        if tokenize.tok_name[tok.exact_type] == "STRING":
            isquote = True

            # STRING 전에 OP가 나왔을 때
            if isquoteOp:
                # print(tok.string)
                subresult[0] = True

            # STRING의 처음에 f 형식 사용했으 ㄹ때
            if(tok.string[0] == 'f' and tok.string[1] in quote):
                # print(tok.string)
                subresult[3] = True

        # 직전이 STRING이 일때
        elif isquote == True:
            # STRING이후에 바로 연산자가 나왔을때
            if tokenize.tok_name[tok.exact_type] in quoteOp:
                # print(tok.string)
                subresult[0] = True
                isquoteOp = True
            else:
                isquoteOp = False

            # STRING이후에 .FORMAT나왔을 때
            if tokenize.tok_name[tok.exact_type] == "DOT":
                continue
            if(tokenize.tok_name[tok.exact_type] == "NAME" and tok.string == 'format'):
                # print(tok.string)
                subresult[2] = True

            # STRING이후에 PERCENT %나왔을 때
            if(tokenize.tok_name[tok.exact_type] == "PERCENT" and tok.string == '%'):
                # print(tok.string)
                subresult[1] = True
            isquote = False

        # 직전이 STRING이 아닐때
        else:
            if tokenize.tok_name[tok.exact_type] in quoteOp:
                isquoteOp = True
            else:
                isquoteOp = False

        if tokenize.tok_name[tok.exact_type] == "NEWLINE" and tok.string == '\r\n':
            for i in range(4):
                if(subresult[i]):
                    result[i] += 1
            subresult = [False, False, False, False]

    for i in range(4):
        result[4] += result[i]

    return result
