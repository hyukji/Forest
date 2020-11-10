def find_max(t, l, r):
    """Retuan the max number in t[l:r-1]"""
    rtn=t[0]
    for i in range(l,r+1):
        if rtn < t[i]:
            rtn = t[i]
    return rtn
        

if __name__ == '__main__':
    t = [1, 2]
    print(find_max(t, 0, len(t) - 1))
    t = [36, 43, 70, 76, 32, 7, 8, 21, 69, 78]
    print(find_max(t, 0, len(t) - 1))
