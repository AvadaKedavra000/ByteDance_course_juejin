<template>
    <div class="list-box">
        <!-- <ul v-if="dataReady" class="list"> -->

        <!-- <ul  class="list">
            <li class="item" v-for="(item,index) in data" :key="item.article_id" @click="clickArticle(item)">
                <div class="article-box">
                    <div class="article-top">
                        <div class="article-author">{{ item.author_user_info.user_name }}</div>
                        <span class="separator">|</span>
                        <div class="article-time">{{ time(index) }}</div>
                    </div>
                    <div class="article-title">
                        <p>{{ item.article_info.title }}</p>
                    </div>
                    <div class="article-content">
                        <div class="article-content-left">
                            <div class="article-brief">
                                <p>{{ item.article_info.brief_content }}</p>
                            </div>
                        </div>
                        <div class="article-content-right">
                            <img
                                :src="item.article_info.cover_image"
                                :alt="item.article_info.title"
                            />
                        </div>
                    </div>
                    <div class="article-footer">
                        <div class="article-footer-left">
                            <div class="iconbox">
                                <i class="iconfont icon-browse"></i>
                                <div class="icontext">{{ item.article_info.view_count }}</div>
                            </div>
                            <div class="iconbox">
                                <i class="iconfont icon-good"></i>
                                <div class="icontext">{{ item.article_info.digg_count }}</div>
                            </div>
                            <div class="iconbox">
                                <i class="iconfont icon-comments"></i>
                                <div class="icontext">评论</div>
                            </div>
                        </div>
                        <div class="article-footer-right">
                            <div class="tag">{{ item.category_info.first_category_name }}</div>
                            <div class="tag">{{ item.category_info.second_category_name }}</div>
                        </div>
                    </div>
                </div>
                <div class="item-separator"></div>
            </li>
        </ul>-->

        <ListItem :data="data" class="ListItem" />

        <Observer :handle-intersect="getData" root-selector=".list-box" />
    </div>
</template>
  

<script setup>
// console.log('List setup啦')
import { ref, toRefs, onMounted, onUnmounted, reactive, computed, watch, nextTick } from 'vue'
import { getArticles } from '../fake-api/index.js'
import { useRouter } from 'vue-router'
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

// .list-box::-webkit-scrollbar {
//     display: none;
// }
.list-box {
    height: $ListHeight;
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