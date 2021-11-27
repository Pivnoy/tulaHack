import PVS.tasks.grph as gr
import PVS.tasks.comments as cm
import PVS.tasks.incld as inc
import PVS.tasks.werr as w

# param - source codes of libc and libc++

global data

with open('val.c', 'r') as f:
    # data = f.read().strip().replace('\n', ' ').split(' ')
    data = f.read().strip()


print(data)
dt = w.errors(data)
dt = gr.tr_transform_impl(cm.delete_c_comments(dt))
dt = inc.use_include(dt)
dt = w.warnings(dt)
print(dt)


# with open('gg.c', 'w') as fn:
#     fn.write(dt)
