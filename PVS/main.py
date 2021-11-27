import PVS.tasks.grph as gr
import PVS.tasks.comments as cm
import PVS.tasks.incld as inc


# param - source codes of libc and libc++

global data

with open('val.c', 'r') as f:
    # data = f.read().strip().replace('\n', ' ').split(' ')
    data = f.read().strip()

print(data)
dt = gr.tr_transform_impl(cm.delete_c_comments(data))
dt = inc.use_include(dt)
print(dt)


with open('gg.c', 'w') as fn:
    fn.write(dt)
