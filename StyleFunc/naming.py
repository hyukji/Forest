import tokenize
import keyword

def naming_class(tokens):
    # 클래스에서 명명법
    # parameter : tokenize된 값
    # return: Array(5) => 0: Pascal, 1: Camel 2: Snake 3: 그 외 4: 합계
    result = [0, 0, 0, 0, 0, 0, 0]
    i=0
    for tok in tokens:
        if(tok.string == 'class'):
            result[6] += 1
            i=1
        elif(i==1):
            n=len(tok.string)
            if (tok.string.find("_")!=-1):
                if(tok.string[0].isupper()==True):
                    result[0]+=1
                elif(tok.string.islower()==False):
                    result[1]+=1
                else:
                    result[4]+=1
            else:
                if(tok.string[0].isupper()==True):
                    result[2]+=1
                elif(tok.string.islower()==False):
                    result[3]+=1
                else:
                    result[5]+=1
            i=0
    return result

def naming_function(tokens):
    # 함수에서 명명법
    # parameter : tokenize된 값
    # return: Array(5) => 0: Pascal&Snake, 1: Camel&Snake 2: Pascal&noSnake 3: Camel&noSnake 4: only Snake 5: etc 6: 합계
    result = [0, 0, 0, 0, 0, 0, 0]
    i=0
    for tok in tokens:
        if(tok.string == 'def'):
            result[6] += 1
            i=1
        elif(i==1):
            n=len(tok.string)
            if (tok.string.find("_")!=-1):
                if(tok.string[0].isupper()==True):
                    result[0]+=1
                elif(tok.string.islower()==False):
                    result[1]+=1
                else:
                    result[4]+=1
            else:
                if(tok.string[0].isupper()==True):
                    result[2]+=1
                elif(tok.string.islower()==False):
                    result[3]+=1
                else:
                    result[5]+=1
            i=0
    return result

def naming_variances(tokens):
    result = [0, 0, 0, 0, 0, 0, 0]
    i=0
    variances=find_variance(tokens)
    for variance in variances[2]:
        if (variance.find("_")!=-1):
            if(variance[0].isupper()==True):
                result[0]+=1
            elif(variance.islower()==False):
                result[1]+=1
            else:
                result[4]+=1
        else:
            if(variance[0].isupper()==True):
                result[2]+=1
            elif(variance.islower()==False):
                result[3]+=1
            else:
                result[5]+=1
    return result

def numbering(tokens):
    #a1, a2, a3 방식의 네이밍 여부
    #parameter: tokenize된 값
    #return: Number(이름의 끝이 숫자인 것의 개수)
    num=0
    variances=find_variance(tokens)
    total_v=len(variances[2])
    for variance in variances[2]:
        l=len(variance)
        if variance[l-1].isdigit()==True:
            num+=1
    return (num, total_v)
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

def find_variance(tokens):
    classes=[]
    functions=[]
    variances=[]
    all=[]
    switch_c=0
    switch_f=0
    for tok in tokens:
        if(tokenize.tok_name[tok.exact_type] == "NAME"):
            if(tok.string == 'class'):
                switch_c=1
            elif(switch_c==1):
                if(tok.string not in all):
                    all.append(tok.string)
                    classes.append(tok.string)
                    switch_c=0
            if(tok.string == 'def'):
                switch_f=1
            elif(switch_f == 1):
                if(tok.string not in all):
                    all.append(tok.string)
                    functions.append(tok.string)
                    switch_f=0
            if(keyword.iskeyword(tok.string)==True):
                pass
            else:
                if(tok.string not in all):
                    all.append(tok.string)
                    variances.append(tok.string)
    return (classes, functions, variances, all)

def num_naming_function(problems):
    # 클래스에서 명명법
    #parameter: problems
    # return: Array(5) => 0: Pascal% 1: Camel% 2: Snake% 3: etc% 4: 최다 네이밍
    proportion = [0, 0, 0, 0, 0, 0, 0]
    proportion2 = [0, 0, 0, 0, 0, 0]
    results=[]
    num=0
    for title in problems:
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            tokens = tokenize.tokenize(fr.readline)
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            try:
                results.append(naming.naming_function(tokens))
            except:    # 예외가 발생했을 때 실행됨
                pass
        num+=1
    for result in results:
#         print(result)
        for i in range(7):
            proportion[i]+=result[i]
    for i in range(6):
        proportion2[i]=proportion[i]
    return (proportion, proportion2.index(max(proportion2)))

def num_naming_class(problems):
    # 클래스에서 명명법
    #parameter: problems
    # return: Array(5) => 0: Pascal% 1: Camel% 2: Snake% 3: etc% 4: 최다 네이밍
    proportion = [0, 0, 0, 0, 0, 0, 0]
    proportion2 = [0, 0, 0, 0, 0, 0]
    results=[]
    num=0
    for title in problems:
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            tokens = tokenize.tokenize(fr.readline)
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            try:
                results.append(naming.naming_class(tokens))
            except:    # 예외가 발생했을 때 실행됨
                pass
        num+=1
    for result in results:
#         print(result)
        for i in range(7):
            proportion[i]+=result[i]
    for i in range(6):
        proportion2[i]=proportion[i]
    return (proportion, proportion2.index(max(proportion2)))

def num_naming_variances(problems):
    # 클래스에서 명명법
    #parameter: problems
    # return: Array(5) => 0: Pascal% 1: Camel% 2: Snake% 3: etc% 4: 최다 네이밍
    proportion = [0, 0, 0, 0, 0, 0, 0]
    proportion2 = [0, 0, 0, 0, 0, 0]
    results=[]
    num=0
    for title in problems:
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            tokens = tokenize.tokenize(fr.readline)
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            try:
                results.append(naming.naming_variances(tokens))
            except:    # 예외가 발생했을 때 실행됨
                pass
        num+=1
    for result in results:
#         print(result)
        for i in range(7):
            proportion[i]+=result[i]
    for i in range(6):
        proportion2[i]=proportion[i]
    return (proportion, proportion2.index(max(proportion2)))

def num_numbering(problems):
    #a1, a2, a3 방식의 네이밍 여부
    #parameter: tokenize된 값
    #return: Number(이름의 끝이 숫자인 것의 개수)
    num=0
    total_v=0
    for title in problems:
        with open('hello.py', 'wb+') as fw:
            fw.write(title.encode('utf-8'))

        with open('hello.py', 'rb') as fr:
            tokens = tokenize.tokenize(fr.readline)
            # tokens = tokenize.generate_tokens(f.readline)
            # pf.check_token(tokens)
            try:
                (n, t) =naming.numbering(tokens)
                num+=n
                total_v+=t
            except:    # 예외가 발생했을 때 실행됨
                pass
    if(total_v==0):
        return 0
    else:
        return (round(num/total_v*100,1))
