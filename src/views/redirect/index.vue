<!--
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-17 16:15:40
 * @FilePath: /backstage-manage/src/views/redirect/index.vue
-->

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { params, query } = route;
const { path } = params;

router.replace({ path: '/' + path, query });
</script>
