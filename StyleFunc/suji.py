import tokenize


def Spared_Line(tokens):
    #빈줄 개수
    num = 0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NL"):
            num += 1
    return num


def Total_Line(tokens):
    #빈줄을 제외한 코드줄 개수
    num=0
    for tok in tokens:
        if(tokenize.tok_name[tok.type] == "NEWLINE"):
            num += 1
    return num

def OperatorBlank_Preference(tokens):
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
