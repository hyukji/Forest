from anytree import Node, RenderTree, PreOrderIter


def check_structure(tokens):
        root = Node('root', index = [0, len(tokens) - 1], pos = -1)
        keyword = ['if', 'elif', 'else', 'while', 'for', 'def', 'class'] #keywords demanding indent
        stack = [root]
        cur_pos = 0
        
        def parenting(stack, index):
            node = stack.pop()
            node.index[1] = index
            node.parent = stack[-1]
        
        for (i, tok) in enumerate(tokens):
            if tokenize.tok_name[tok.type] == "NAME" and tok.string in keyword:
                node = Node(tok.string, index = [i, -1], pos = cur_pos)
                stack.append(node)
            elif tokenize.tok_name[tok.type] == "INDENT":
                cur_pos += 1
            elif tokenize.tok_name[tok.type] == 'DEDENT':
                cur_pos -= 1
                if stack[-1].pos == cur_pos:
                    parenting(stack, i)
                else:
                    pass
#                     print(stack[-1].pos, cur_pos)
#                     print('else case, not printed')

                # ex) if True: print(30)
            elif tokenize.tok_name[tok.exact_type] == 'COLON' and \
                tokens[i+1].type != 4: #means NEWLINE
                if stack[-1].pos == cur_pos:
                    parenting(stack, i)
                
                # [i for i in range(3)] @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@this case must be added
                # 30 if True else -30
                
        return root
    
def nested(tokens, keyword):
    root = check_structure(tokens)
    count = [] # 중복된 횟수 (ex. 2 2 3 4)
    for i, leaf in enumerate(root.leaves):
        count.append(0)
        for node in leaf.iter_path_reverse():
            if node.name == keyword:
                count[i] += 1
    print(count)
    nested_only = [val for val in count if val not in (0, 1)]
    nested2 = nested_only.count(2)
    res = [nested2, len(nested_only) - nested2]
    res.append(res[0] + res[1])
    return res # 2개 중복 개수, 3개 이상 중복 개수, 총합
                
def func_Number(tokens):
    result = 0
    for tok in tokens:
        if tokenize.tok_name[tok.type] == 'NAME' and tok.string == 'def':
            result += 1
    return result

def funcParam_Number(tokens):
    tokens, tokens_copy = tee(tokens)
    result = [ 0 for i in range(func_Number(tokens_copy))]
#     def_line = ""
    
#     def generator():
#         yield def_line
#     gen = generator()
        
#     def getLine():
#         return next(gen)

    checkOn = False
    func_index = -1
    for tok in tokens:
        if tokenize.tok_name[tok.type] == 'NAME' and tok.string == 'def':
            checkOn = True
            func_index += 1
        elif tokenize.tok_name[tok.exact_type] == 'COLON':
            checkOn = False
        elif checkOn and tokenize.tok_name[tok.type] == "NAME":
            result[func_index] += 1
            
    for (i, v) in enumerate(result):
        result[i] -= 1 # subtract for removing function_name count
        
#             def_line = tok.line
#             def_tokens = tokenize.generate_tokens(getLine)
#             print(tok)
#             for piece in def_tokens:
#                 print(piece)
#                 if checkOn and tokenize.tok_name[piece.type] == "NAME":
#                     result[func_index] += 1
#                 elif tokenize.tok_name[piece.exact_type] == "LPAR":
#                     checkOn = True
#                 elif tokenize.tok_name[piece.exact_type] == "RPAR":
#                     checkOn = False
#                     break
    return result

def func_Return(tokens):
    num_def = 0
    num_return = 0
    result = [0, 0, 0] # return / return None / 함수 개수
    for tok in tokens:
        if tokenize.tok_name[tok.type] == 'NAME' and tok.string == 'def':
            num_def += 1 # not used
        elif tokenize.tok_name[tok.type] == 'NAME' and tok.string == 'return':
            num_return += 1
            index = tok.line.find('return')
            line = tok.line[:index] + tok.line[index + 6:]
            if 'None' in line:
                result[1] += 1
            elif line.isspace():
                result[0] += 1
    result[2] = num_def
    return result

def func_Length(tokens):
    root = check_structure(tokens)
    result = []
    for node in PreOrderIter(root):
        if node.name == 'def':
            result.append(suji.Total_Line(tokens[node.index[0]:node.index[1]]))
    return sum(result) / len(result)

def tree_height(tokens):
    root = check_structure(tokens)
    return root.height

            
def nested_if(tokens):
    return nested(tokens, 'if')

def nested_for(tokens):
    return nested(tokens, 'for')
