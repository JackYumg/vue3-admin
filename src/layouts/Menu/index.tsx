import { defineComponent, computed } from 'vue';
import { ElMenu } from 'element-plus';
import { useStore } from 'vuex';
import { key } from '@/store';
import Nest from './Nest';

export default defineComponent({
  // 组件需要申明props，setup方法中才能正确接收到props
  props: {},
  setup(props) {
    const { state } = useStore(key);

    const aside = computed(() => state.setting.aside === 'close');
    const defaultActive = computed(() => state.setting.activeMenu);

    return () => (
      <ElMenu
        style="height: 100%"
        collapse={aside.value}
        router
        defaultActive={defaultActive.value}
        background-color="#1d1e23"
        text-color="#eee"
        collapseTransition={false}
      >
        <Nest list={state.menu.menuList} />
      </ElMenu>
    );
  },
  components: { Nest }
});
