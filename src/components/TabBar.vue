<template>
    <div class="tab-bar" :class="{\'fixed\': fixed}">
        <div class="tab-bar__wrap flexbox flex-alignc" :style="{\'background\': bgcolor}">
            <div v-for="(item, index) in tabs" :key="index" class="navigator" :class="currentTabIndex == index ? \'on\' : \'\'" @click="switchTabs(index, item)">
                <div class="ico" :class="{\'dock\': item.dock}">
                    <i v-if="item.dock" class="dock-bg" :style="{\'background\': item.dockBg ? item.dockBg : activeColor}">i>
                    <i v-if="item.icon" class="iconfont" :class="item.icon" :style="{\'color\': (currentTabIndex == index && !item.dock ? activeColor : color), \'font-size\': item.iconSize}">i>
                    <img v-if="item.img" class="iconimg" :src="currentTabIndex == index && !item.dock ? item.activeImg : item.img" :style="{\'font-size\': item.iconSize}" />
                    <em v-if="item.badge" class="nuxt__badge">{{item.badge}}</em>
                    <em v-if="item.dot" class="nuxt__badge-dot"></em>
                    </div>
                <div class="txt" :style="{\'color\': (currentTabIndex == index ? activeColor: color)}">{{item.title}} </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from \'vue\'
import { useRouter, useRoute } from \'vue-router\'
    export default {
        props: {
            current: { type: [Number, String], default: 0 },
            // 背景色
            bgcolor: { type: String, default: \'#fff\' },
            // 颜色
            color: { type: String, default: \'#999\' },
            // 激活颜色
            activeColor: { type: String, default: \'#22d59c\' },
            // 是否固定
            fixed: { type: [Boolean, String], default: false },
            // tab选项
            tabs: {
                type: Array,
                default: () => null
            },
        },
        emits: {
            click: null
        },
        setup(props, context) {
            const currentTabIndex = ref(props.current)
            const router = useRouter()
            const route = useRoute()

            // 匹配当前路由页面
            const _curPath = route.path
            props.tabs.map((item, index) => {
                if(item.path == _curPath) {
                    currentTabIndex.value = index
                }
            })

            const switchTabs = (index, item) => {
                currentTabIndex.value = index
                context.emit(\'click\', index)
                if(item.path) {
                    router.push(item.path)
                }
            }
            return {
                currentTabIndex,
                switchTabs,
            }
        }
    }
</script>