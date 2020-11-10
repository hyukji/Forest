


def run():
#     a = [i for i in range(3)]
#     30 if True else -30
    if True: print('print')

import timeit
import random


def selection_sort(t):
    pass


def merge_sort(t, l=None, r=None):
    if l==None: l = 0
    if r==None: r = len(t)-1
    pass


def quick_sort(t, l=None, r=None):
    if l==None: l = 0
    if r==None: r = len(t)-1
    pass

def timeit_sort(func, n, data='random', repetition=100):
    # generate n random numbers
    t = list(range(n))
    duration = 0
    for i in range(repetition):
        if data == 'random':
            t1 = t.copy()
            random.shuffle(t)
        elif data == 'reverse':
            t1 = t[::-1]
        else:
            t1 = t.copy()
        duration += timeit.timeit('func(t1)', globals=locals(), number=1)
    return duration

if __name__ == '__main__':
    # 1) Understand how sorting algorithms work in detail
    n = 10

    t = list(range(n))
    random.shuffle(t)  # make a random list
    print('* Selection Sort')
    t1 = t.copy()
    selection_sort(t1)
    print('* Merge Sort')
    t2 = t.copy()
    merge_sort(t2, 0, len(t2) - 1)
    print('* Quick Sort')
    t3 = t.copy()
    quick_sort(t3, 0, len(t3) - 1)

    # 2) Set up test cases for sorting algorithms
    t = []
    selection_sort(t)
    t = [1]
    selection_sort(t)
    t = [1, 2]
    selection_sort(t)
    t = [1, 1]
    selection_sort(t)
    t = [2, 1]
    selection_sort(t)
    t = [1, 2, 3]
    selection_sort(t)
    t = [1, 3, 2]
    selection_sort(t)
    t = [1, 2, 3, 4]
    selection_sort(t)
    t = [4, 3, 2, 1]
    selection_sort(t)
    t = [2, 4, 1, 3]
    selection_sort(t)

    # 3) Measure execution time of sorting algoritms with varying n
    problem_sizes = [1, 10, 20, 50, 100]
    rep = 100
    data = 'random'
    print('Selection sort...')
    for n in problem_sizes:
        print(f'{n:5d}:', timeit_sort(selection_sort, n, data, rep))

    print('Merge sort...')
    for n in problem_sizes:
        print(f'{n:5d}:', timeit_sort(merge_sort, n, data, rep))

    print('Quick sort...')
    for n in problem_sizes:
        print(f'{n:5d}:', timeit_sort(quick_sort, n, data, rep))
