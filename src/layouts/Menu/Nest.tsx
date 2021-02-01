import { defineComponent } from 'vue';
import { ElSubmenu, ElMenuItem } from 'element-plus';
import { MenuType } from '@/store/modules/menu';
import Nest from './Nest';

export interface PropsType {
  list: Array<MenuType>;
}

export default defineComponent({
  // 组件名称需与标签名对应
  name: 'Nest',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any) {
    return () => (
      <>
        {props.list.map((menu: MenuType, index: number) => {
          return (
            menu.children.length > 0 && (
              <ElSubmenu
                index={menu.path}
                vSlots={{
                  title: (
                    <>
                      <i class={menu.iconClass} />
                      <span>{menu.menuName}</span>
                    </>
                  )
                }}
              >
                {menu.children.map((menuChild, childIndex) => (
                  <>
                    {menuChild.children.length === 0 ? (
                      <ElMenuItem index={menuChild.path}>
                        <i class={menuChild.iconClass} />
                        {menuChild.menuName}
                      </ElMenuItem>
                    ) : (
                      <Nest list={menuChild.children} />
                    )}
                  </>
                ))}
              </ElSubmenu>
            )
          );
        })}
      </>
    );
  }
});
