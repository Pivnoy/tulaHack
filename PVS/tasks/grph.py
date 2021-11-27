diGraph = {
    '<:': '[',
    ':>': ']',
    '<%': '{',
    '%>': '}',
    '%:': '#',
    '%:%:': '##',
    'and': '&&',
    'bitor': '|',
    'or': '||',
    'xor': '^',
    'compl': '~',
    'bitand': '&',
    'and_eq': '&=',
    'or_eq': '|=',
    'xor_eq': '^=',
    'not': '!',
    'not_eq': '!='
}

trGraph = {
    '??=': '#',
    '??/': '\\',
    '??(': '[',
    '??)': ']',
    '??!': '|',
    '??<': '{',
    '??>': '}',
    '??-': '~'
}

special = ['??', '^']


def gr_transformation(text: str):
    return di_transform_impl(tr_transform_impl(text))


def di_transform_impl(text: str):
    for key in diGraph:
        text = text.replace(str(key), diGraph.get(key))
    return text


def tr_transform_impl(text: str):
    for key in trGraph:
        text = text.replace(str(key), trGraph.get(key))
    return text.replace(special[0], special[1])
