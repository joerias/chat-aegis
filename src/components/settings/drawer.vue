<script setup>
defineOptions({
	name: "Drawer",
});
import { ref, computed } from "vue";
import SliderBar from "@/components/slider-bar/index.vue";
import { useSettingsStore } from "@/store/modules/settings";
import { ElMessage } from "element-plus";

const settingsStore = useSettingsStore();

const modelsVal = ref(settingsStore.modelVersion);
const modelsOpts = ref(settingsStore.modelList.map((v) => v.name));
const handleModels = (val) => {
	settingsStore.setVal({ key: "modelVersion", val });
};

const sliderCreateVal = ref(0.1);
const sliderMultiVal = ref(0.1);
const sliderGeneVal = ref(1000);

const drawerVisible = ref(true);
const drawerSize = computed(() => {
	if (window.innerWidth > 750) return "500px";
	return "100%";
});
</script>

<template>
	<el-drawer v-model="drawerVisible" title="设置" direction="rtl" :size="drawerSize" class="drawer-wrapper">
		<el-auto-resizer>
			<template #default="{ height }">
				<el-scrollbar ref="scrollContainer" :height="height">
					<el-form label-position="top">
						<el-form-item label="选择模型">
							<el-select
								style="width: 100%"
								placeholder="请选择模型"
								filterable
								@change="handleModels"
								v-model="modelsVal"
							>
								<el-option v-for="(o, i) in modelsOpts" :key="i" :value="o" />
							</el-select>
						</el-form-item>
					</el-form>
					<el-form label-position="top">
						<el-form-item label="创造性程度">
							<SliderBar v-model="sliderCreateVal" :max="1" :step="0.1" storeName="createVal" />
						</el-form-item>
					</el-form>
					<el-form label-position="top">
						<el-form-item label="多样性程度">
							<SliderBar v-model="sliderMultiVal" :max="1" :step="0.1" storeName="multiVal" />
						</el-form-item>
					</el-form>
					<el-form label-position="top">
						<el-form-item label="生成长度">
							<SliderBar v-model="sliderGeneVal" :max="2000" storeName="geneVal" />
						</el-form-item>
					</el-form>
				</el-scrollbar>
			</template>
		</el-auto-resizer>
	</el-drawer>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
@/store/modules/settings@/store/modules/settings
