from sys import platform
import argparse

import tasks.grph as gr
import tasks.comments as cm
import tasks.incld as inc
import tasks.werr as w
import tasks.line as lines

operating_system = ''
language_lib_c_path = ''


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


parser = argparse.ArgumentParser()
parser.add_argument("--f")
parser.add_argument("--libc", default='/usr')
args = parser.parse_args()
filename = args.f
libc_path = args.libc

with open(filename, 'r') as file:
    file_inside = file.read().strip()

print(file_inside)

dt = lines.substitute_line(file_inside)
dt = cm.delete_c_comments(dt)
dt = gr.tr_transform_impl(dt)
dt = inc.include_std_lib_files(dt, libc_path)
dt = w.warnings(dt)
print(dt)

with open('output.c', 'w') as output_file:
    output_file.write(dt)
