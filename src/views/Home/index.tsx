import { reactive, defineComponent } from 'vue';
import { ElButton } from 'element-plus';

export interface DataType {
  msg: string;
  time: number;
}

export default defineComponent({
  setup() {
    const data = reactive<DataType>({
      msg: '123',
      time: 123
    });

    const handleClick = () => {
      data.msg = Math.random() + '';
    };

    return () => (
      <>
        <div class="about">
          <el-row>
            <ElButton>默认按钮</ElButton>
            <ElButton type="primary">主要按钮</ElButton>
            <ElButton type="success">成功按钮</ElButton>
            <ElButton type="info">信息按钮</ElButton>
            <ElButton type="warning">警告按钮</ElButton>
            <ElButton type="danger">危险按钮</ElButton>
          </el-row>
        </div>
        {data.msg}
        <ElButton onClick="handleClick">点击</ElButton>
      </>
    );
  }
});
