import re
from os import listdir
from os.path import isfile, join

lib_path = ''
lib_spec = ''
lib_bits = ''

std_lib = []
std_lib_spec = []
std_lib_bits = []


def get_header_content(filename: str):
    with open(filename, 'r') as fl:
        data = fl.read()
    return data


used = []

glob_used = []


def include_std_lib_files(text: str, path: str):
    global lib_spec
    global lib_path
    global lib_bits
    global std_lib
    global std_lib_spec
    global std_lib_bits
    lib_path = path + '/include/'
    lib_spec = path + '/lib/gcc/x86_64-linux-gnu/8/include/'
    lib_bits = path + '/include/x86_64-linux-gnu/bits/'
    std_lib = [f for f in listdir(lib_path) if isfile(join(lib_path, f))]
    std_lib_spec = [f for f in listdir(lib_spec) if isfile(join(lib_spec, f))]
    std_lib_bits = [f for f in listdir(lib_bits) if isfile(join(lib_bits, f))]
    lib_files = re.findall(r'#include\s*<\w*\.h>', text)
    for i in lib_files:
        name = re.findall(r'\w*\.h', i)
        print(lib_path)
        if name[0] in std_lib:
            text = text.replace(i, get_header_content(lib_path + name[0]))
        if name[0] in std_lib_spec:
            text = text.replace(i, get_header_content(lib_spec + name[0]))
    return text


def include_main(text: str):
    text = include_main_step(text)
    while re.search(r'#include\s*"\w*\.h"', text):
        text = include_main_step(text)
    return text


def include_main_step(text: str):
    pr = re.findall(r'#pragma\s*once', text)
    if len(pr) > 0:
        for i in pr:
            text = text.replace(i, '')
    return include_main_step_impl(text)


def include_main_step_impl(text: str):
    for val in range(0, len(used)):
        text = text.replace(used[val], '')
    includes = re.findall(r'#include\s*"\w*\.h"', text)
    if len(includes) > 0:
        name = re.findall(r'\w*\.h', includes[0])
        if name is not used:
            text = text.replace(includes[0], get_header_content(name[0]), 1)
            used.append(includes[0])
        text = text.replace(includes[0], '')
    return text
