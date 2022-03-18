<template>
    <div class="list-box">
        <ListItem :data="data" class="list-item" />
        <Observer :handle-intersect="getData" root-selector=".list-box" />
    </div>
</template>
  

<script setup>
console.log('List setup啦')
import { ref, computed, watch, onActivated, onDeactivated } from 'vue'
import { getArticles } from '../fake-api/index.js'
import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import Observer from './Observer.vue'
import ListItem from './ListItem.vue'

const store = useStore();
const router = useRouter();

let has_more = ref(true);//是否还有更多文章
let data = ref([]);

// let dataReady = ref(false);//数据准备好了就传递给子组件<ListItem/>

//初始获取文章数据
getArticles(store.state.categoryId, store.state.sortBy, store.state.offset, store.state.limit).then(a => {
    // console.log('@@@@@@@@@@@@@@初始获取文章数据');
    has_more.value = a.has_more;

    data.value = a.data.articles;

    // dataReady.value = true;

    // console.log('List初始数据渲染好啦', data.value);
});

//无限滚动:文章列表触底时触发的回调
const getData = () => {
    console.log("触底了")
    if (!has_more.value) {
        console.log("没有更多数据了!")
        return;
    }
    store.commit("updateOffset");
    getArticles(store.state.categoryId, store.state.sortBy, store.state.offset, store.state.limit).then(a => {
        has_more.value = a.has_more;
        const newData = a.data.articles;
        data.value = [...data.value, ...newData];
        store.commit("updateOffset");
    });

}


//用computed和watch间接监听store.state,以及时刷新页面
const sortBy = computed({
    get: () => store.state.sortBy
});
const categoryId = computed({
    get: () => store.state.categoryId
});
watch([sortBy, categoryId], ([count1, prevCount1], [count2, prevCount2]) => {
    // console.log('路由参数改变啦');
    store.commit("resetOffset");
    getArticles(store.state.categoryId, store.state.sortBy, store.state.offset, store.state.limit).then(a => {
        data.value = a.data.articles;
        // console.log('刷新数据', a.data.articles);
    });
})



//关于滚动条的逻辑，当从内容列表页面进入详情页面时，我们希望缓存当前的滚动位置
let scrollTopSaved = 0

//被 keep-alive 缓存的组件激活时调用,(选择筛选项目时不触发,从其他路由进入....时触发)
onActivated(() => {
    console.log('List.vue activated!')
    const ListBoxDom = document.querySelector(".list-box");
    ListBoxDom.scrollTop = scrollTopSaved
    console.log(scrollTopSaved)
})

//当前位置的组件将要离开时触发(选择筛选项目时不触发,其他路由触发)
//此时要记录当前的滚动位置
onBeforeRouteLeave((to, from) => {
    console.log('onBeforeRouteLeave')
    const ListBoxDom = document.querySelector(".list-box");
    scrollTopSaved = ListBoxDom.scrollTop
    console.log(scrollTopSaved)
})

//当前位置即将更新时触发,(选择筛选项目时触发,其他路由不触发)
//此时要使得滚动条回到顶部
onBeforeRouteUpdate((to, from) => {
    console.log('List.vue onBeforeRouteUpdate')
    //滚动条回到顶部
    document.querySelector(".list-box").scrollTop = 0;

});
</script>

<style lang="scss" scoped>
@import "../common/style/mixin";

$topFontSize: 14px;
$topAuthorColor: #4e5969;
$topTimeColor: #86909c;

$iconSize: 16px;
$iconTextSize: 13px;
$iconTextColor: #86909c;

$tagFontSize: 13px;
$tagTextColor: #4e5969;

$titleFontSize: 18px;
$titleTextColor: #1d2129;

$briefFontSize: 14px;
$briefTextColor: #4e5969;

.list-box {
    //height: $ListHeight;
    height: calc(100% - 200px);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
}

.list {
    padding: 0px;
    margin: 0px;
}
p {
    padding: 0px;
    margin: 0px;
}
.separator {
    margin: 0 8px;
    color: #e5e6eb;
}

.item {
    box-sizing: border-box;
    padding: 12px 20px 0;
    background: #fff;

    .article-top {
        display: flex;
        align-items: center;
        font-size: $topFontSize;
        .article-author {
            color: $topAuthorColor;
        }
        .article-time {
            color: $topTimeColor;
        }
    }
    .article-title {
        color: $titleTextColor;
        font-weight: 600;
        font-size: $titleFontSize;
        text-align: left;
        margin: 8px 0;
        p {
            display: inline-block;
            text-align: left;
        }
    }
    .article-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .article-content-left {
            height: 88px;
            width: 0; //解决有时候简介内容把右边图片撑到右边脱离父元素的问题
            flex-grow: 1; //解决有时候简介内容把右边图片撑到右边脱离父元素的问题
            .article-brief {
                font-size: $briefFontSize;
                color: $briefTextColor;
                text-align: left;
                overflow: hidden; //文本溢出限定的宽度就隐藏内容
                text-overflow: ellipsis; //多行文本的情况下，用省略号“…”隐藏溢出范围的文本
                display: -webkit-box; //对象作为弹性伸缩盒子模型
                -webkit-line-clamp: 4; //多行在这里修改数字即可
                -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
            }
        }
        .article-content-right {
            width: 120px;
            height: 88px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            overflow: hidden;
            img {
                height: 88px;
            }
        }
    }
    .article-footer {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        .article-footer-left {
            display: flex;
            .iconbox {
                display: flex;
                margin-right: 8px;
                i {
                    font-size: $iconSize;
                }
                .icontext {
                    font-size: $iconTextSize;
                    line-height: $iconSize;
                    margin-left: 2px;
                    color: $iconTextColor;
                }
            }
        }
        .article-footer-right {
            display: flex;
            align-items: center;
            .tag {
                font-size: $tagFontSize;
                color: $tagTextColor;
                background-color: #fafafa;
                margin-left: 3px;
                padding: 0 3px;
            }
        }
    }
}
.item-separator {
    width: 100%;
    height: 1px;
    background-color: rgb(229, 230, 235);
}
</style>