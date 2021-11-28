import re


def substitute_line(text: str):
    lines = text.split('\n')
    cnt = 0
    for i in range(len(lines)):
        lines[i] = lines[i].replace('__LINE__', str(cnt))
        res = re.search(r'#line\s+(\d+)', lines[i])
        if res:
            cnt = int(res.group(1))
        cnt += 1
    return '\n'.join(lines)
