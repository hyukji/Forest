import sys

print(len(sys.argv))
for arg in sys.argv:
    print('arg value = ', arg)

if len(sys.argv) != 2:
    print('sys.argv is not 2, but', len(sys.argv))
    sys.exit(2)

f = open('script.py', 'w')
f.write(sys.argv[1])
f.close()

# import os
# print(os.getwd())

# for data in sys.argv:
#     f.write(data)

import script

# /usr/src/config -> config.py, files made by user
# /usr/src/script.py (running file)
