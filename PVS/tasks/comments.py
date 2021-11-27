import re


def delete_c_comments(text: str):
    while text.find('/*') != -1:
        start = text.find('/*')
        end = text.find('*/')
        text = text[:start] + text[end + 2:]
    while text.find('//') != -1:
        start = text.find('//')
        end = re.search('\n', text[start+2:]).span()[1]
        text = text[:start] + text[start + end + 1:]
    return text

