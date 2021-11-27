from sys import platform


import tasks.grph as gr
import tasks.comments as cm
import tasks.incld as inc
import tasks.werr as w

operating_system = ''
language_lib_c_path = ''
language_lib_cpp_path = ''


def platform_parameters():
    global operating_system
    global language_lib_c_path
    if platform == "linux" or platform == "linux2":
        operating_system = 'Linux'
        language_lib_c_path = '/usr/include/'
    elif platform == "darwin":
        operating_system = 'OS X'
    elif platform == "win32":
        operating_system = 'Windows'



# print(get_standart_lib_files('/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include'))
#
# platform_parameters()
# print(operating_system)
#
# # param - source codes of libc and libc++
#
global data

with open('val.c', 'r') as f:
    # data = f.read().strip().replace('\n', ' ').split(' ')
    data = f.read().strip()

print(data)
dt = cm.delete_c_comments(data)
dt = gr.tr_transform_impl(dt)
dt = inc.use_include(dt)
dt = w.warnings(dt)
print(dt)

with open('gg.c', 'w') as fn:
    fn.write(dt)
