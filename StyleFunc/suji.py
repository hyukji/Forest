import tokenize


def Spared_Line(tokens):
    #빈줄 개수
    num = 0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NL"):
            num += 1
    return num


def Total_Line(tokens):
    #빈줄과 주석을 제외한 코드줄 개수
    num=0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NEWLINE"):
            num += 1
    return num

def Annotation(tokens):
    #"#"주석의 개수
    num=0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "COMMENT"):
            num += 1
    return num

def OperatorBlank_Preference(tokens):
    #이 함수 무시해주세요
    #연산자 다음 공백의 유무
    #return: Array(3) => 0: 공백없음, 1: 공백있음, 2: 총 개수
    result = [0, 0, 0]
    i=(0,0)
    for tok in tokens:
        if (tokenize.tok_name[tok.type]=="OP"):
            i=tok.end
        elif (i!=(0,0)):
            if (i==tok.start):
                result[0]+=1
            else:
                result[1]+=1
            i=(0,0)
    result[2]=result[0]+result[1]
    return result

def OpenParOpBl(tokens):
    #여는 괄호 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    open_parenthesis = ["(", "{", "["]
    close_parenthesis = [")", "}", "]"]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in open_parenthesis):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def CloseParOpBl(tokens):
    #닫는 괄호 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    open_parenthesis = ["(", "{", "["]
    close_parenthesis = [")", "}", "]"]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in close_parenthesis):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def EquOpBl(tokens):
    #등호연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    calculation = ["="]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in calculation):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def MajOpBl(tokens):
    #주요계산연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    calculation = ["+", "-"]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in calculation):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def CalOpBl(tokens):
    #계산연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    calculation = ["*", "/", "//", "%"]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in calculation):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def ComOpBl(tokens):
    #비교연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    calculation = ["==", "!=", "<", ">", "<=", ">="]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in calculation):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def AssOpBl(tokens):
    #할당연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    calculation = ["+=", "-=", "*=", "/=", "//=", "%="]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in calculation):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

def OpBl(tokens):
    #연산자 앞뒤의 공백
    #0: 공백없음, 1:이전만 공백, 2:이후만 공백, 3:앞뒤 공백. 4:총 개수
    result= [0, 0, 0, 0, 0]
    etc = [",", ":"]
    n=0
    i=(0,0)
    a=[0,0]
    for tok in tokens:
        if (i!=(0,0)):
            if (i==tok.start):
                a[1]=0
                i = (0,0)
            else:
                a[1]=1
                i=(0,0)
        if (a==[1,0]):
            result[1]+=1
        if (a==[0,1]):
            result[2]+=1
        if (a==[1,1]):
            result[3]+=1
        a=[0,0]
        if (tokenize.tok_name[tok.type]=="OP"):
            if (tok.string not in etc):
                continue
            n+=1
            i=tok.end
            if (tok.start == pre_token):
                a[0]=0
            if (tok.start != pre_token):
                a[0]=1
        pre_token = tok.end
    result[4]=n
    result[0]=n-result[1]-result[2]-result[3]
    return result

#with open('bye.py', 'rb') as f:
    #tokens = tokenize.tokenize(f.readline)
    #print(CalculationOperatorBlank(tokens))
