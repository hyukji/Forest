import tokenize

def naming_class(tokens):
    # 클래스에서 명명법
    # parameter : tokenize된 값
    # return: Array(5) => 0: Pascal, 1: Camel 2: Snake 3: 그 외 4: 합계
    result = [0, 0, 0, 0, 0]
    i=0
    for tok in tokens:
        if(tok.string == 'class'):
            result[4] += 1
            i=1
        elif(i==1):
            n=len(tok.string)
            if (tok.string.find("_")!=-1):
                result[2]+=1
            elif(tok.string[0].isupper()==True):
                result[0]+=1
            elif(tok.string.islower()==False):
                result[1]+=1
            else:
                result[3]+=1
            i=0
    return result

def naming_function(tokens):
    # 함수에서 명명법
    # parameter : tokenize된 값
    # return: Array(5) => 0: Pascal, 1: Camel 2: Snake 3: 그 외 4: 합계
    result = [0, 0, 0, 0, 0]
    i=0
    for tok in tokens:
        if(tok.string == 'def'):
            result[4] += 1
            i=1
        elif(i==1):
            n=len(tok.string)
            if (tok.string.find("_")!=-1):
                result[2]+=1
            elif(tok.string[0].isupper()==True):
                result[0]+=1
            elif(tok.string.islower()==False):
                result[1]+=1
            else:
                result[3]+=1
            i=0
    return result

def numbering(tokens):
    #a1, a2, a3 방식의 네이밍 여부
    #parameter: tokenize된 값
    #return: Number(이름의 끝이 숫자인 것의 개수)
    i=0
    num=0
    for tok in tokens:
        if(tok.string == 'class' or tok.string == 'def'):
            i=1
        elif(i==1):
            n=len(tok.string)
            if tok.string[n-1].isdigit()==True:
                num+=1
            i=0
    return num
'''
def local_naming(tokens):
    #local 변수의 시작 '_' 여부
    #parameter: tokenize된 값
    #return: Array(2) => 0: '_'가 붙은 local 변수 개수 1: 전체 local 변수 개수
    result = [0, 0]
    in_class=False
    i=0
    for tok in tokens:
        if(tok.string == 'class'):
            in_class=True
        if(in_class==True):
            if (tokenize.tok_name[tok.exact_type] == "INDENT"):
                num_i+=1
            if (tokenize.tok_name[tok.exact_type] == "DEDENT"):
                num_d+=1
            if (tokenize.tok_name[tok.exact_type] == "NAME"):
                if (tok.string != "def"):
                    result[1]+=1
                    if (tok.string[0] == "_"):
                        result[0]+=1
            if (num_i==num_d):
                in_class=False

    return result
'''
