import re


# ([\s\S]*)

def warnings(text: str):
    warn = re.findall(r'#warning\s*.(.*).', text)
    for i in warn:
        print("\033[35m {}".format('#warning: ') + "\033[33m {}".format('Warning ' + i))
    text = text.replace('#warning', '')
    for i in warn:
        text = text.replace("\"" + i + "\"", '')
    return text


def errors(text: str):
    errs = re.findall(r'#error\s*.(.*).', text)
    if len(errs) > 0:
        print("\033[31m {}".format('#error: ') + "\033[34m {}".format('error ' + errs[0]))
        exit(-1)
