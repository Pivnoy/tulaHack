import re
import os


def use_include(text: str):
    filenames = []
    content = []
    includes = re.findall(r'#include\s*.\w*\.h.', text)
    for lx in includes:
        name = re.findall(r'\w*\.h', lx)
        filenames.append(name[0])
    for fn in filenames:
        content.append(use_include(get_header_content(fn)))
    for inc in range(0, len(includes)):
        text = text.replace(includes[inc], content[inc])
    return text


def get_header_content(filename: str):
    with open(filename, 'r') as fl:
        data = fl.read()
    return data
