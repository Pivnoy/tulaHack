import re
from os import listdir
from os.path import isfile, join

lib_path = '/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/'


def get_header_content(filename: str):
    print(filename)
    with open(filename, 'r') as fl:
        data = fl.read()
    return data


def use_include(text: str):
    std_lib = [f for f in listdir(lib_path) if isfile(join(lib_path, f))]
    filenames = []
    content = []
    includes = re.findall(r'#include\s*.\w*\.h.', text)
    for lx in includes:
        name = re.findall(r'\w*\.h', lx)
        filenames.append(name[0])
    for fn in filenames:
        if fn in std_lib:
            content.append(use_include(get_header_content(lib_path + fn)))
        else:
            content.append(use_include(get_header_content(fn)))
    for inc in range(0, len(includes)):
        text = text.replace(includes[inc], content[inc])
    return text
