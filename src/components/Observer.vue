<template>
    <div class="target" ref="target"></div>
</template>

  <style scoped>
.target {
    width: 100%;
    height: 10px;
    background: transparent;
    /* background: red; */
}
</style>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default {
    props: {
        handleIntersect: Function,
        rootSelector: String
    },
    setup(props) {
        const { handleIntersect, rootSelector } = props;

        let observer = null
        const target = ref(null)

        onMounted(() => {
            const options = {
                root: document.querySelector(rootSelector),
                rootMargin: "0px"
            }

            // 构建观察器
            observer = new IntersectionObserver(([entry]) => {

                // 目标元素与根元素相交
                if (entry && entry.isIntersecting) {
                    handleIntersect()
                }
            }, options)

            // 观察目标元素
            observer.observe(target.value)
        })

        // 组件销毁前停止监听
        onBeforeUnmount(() => {
            observer.disconnect()
        })

        return {
            target
        }
    }
}
</script>