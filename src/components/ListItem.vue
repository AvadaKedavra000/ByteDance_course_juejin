<!--debug!!!!!!!!!!!!!!!!!!!!!!!-->
<template>
    <ul class="list">
        <li
            class="item"
            v-for="(item, index) in data"
            :key="item.article_id"
            @click="clickArticle(item)"
        >
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
                        <img :src="item.article_info.cover_image" :alt="item.article_info.title" />
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
    </ul>
</template>

<script setup>
import { unref, ref, isRef, watchEffect, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
const router = useRouter();
const store = useStore();

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

//计算每篇文章距今的时间
const time = (index) => {
    const item = props.data[index];
    //item.article_info.ctime为秒级时间戳
    //计算
    const ms = (new Date()).getTime() - Number(item.article_info.ctime) * 1000;
    const s = Math.floor(ms / 1000);
    const min = Math.floor(ms / (1000 * 60));
    const hour = Math.floor(ms / (1000 * 60 * 60));
    const day = Math.floor(ms / (1000 * 60 * 60 * 24));
    const month = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
    const year = Math.floor(ms / (1000 * 60 * 60 * 24 * 30 * 12));
    //判断，返回
    if (year > 0) {
        if (year > 1) {
            return `${year} years ago`
        }
        else {
            return `1 year ago`
        }
    }
    if (month > 0) {
        if (month > 1) {
            return `${month} months ago`
        }
        else {
            return `1 month ago`
        }
    }
    if (day > 0) {
        if (day > 1) {
            return `${day} days ago`
        }
        else {
            return `1 day ago`
        }
    }
    if (hour > 0) {
        if (hour > 1) {
            return `${hour} hours ago`
        }
        else {
            return `1 day ago`
        }
    }
    if (min >= 0) {
        if (min > 1) {
            return `${min} minutes ago`
        }
        else {
            return `1 minute ago`
        }
    }
}

//上传历史记录
const updateHistory = (token, userName, article_id) => {
    axios.post('https://qcgsjt.api.cloudendpoint.cn/addHistoryRecord', {
        token: token,
        userName: userName,
        article_id: article_id
    }).then((res) => {
        //请求成功的回调函数
        console.log(res)
        if (res.data.code === 401) {        //失败
            console.log("认证失效-上传历史记录失败")
        }
        else if (res.data.code === 200) {//成功
            console.log("上传历史记录成功")
        }
    }).catch((err) => {
        //请求失败的回调函数
        console.log(err)
        alert("请求失败!")

    })
}

//点击文章时
const clickArticle = (item) => {
    //路由跳转，展示其详细信息
    router.push({
        name: 'ArticleDetails',
        params: {
            article_id: item.article_id
        }
    })

    //游客状态下，历史记录保存在session中，key为history,value形如"{article_id:[id1,id2,id3]}"
    if (!store.state.be_logged_in) {
        const historySessionItem = sessionStorage.getItem('history')

        const historyObj = historySessionItem ? JSON.parse(historySessionItem) : { article_id: [] }

        const articleIdArr = historyObj.article_id

        // console.log(item);
        const theIndex = articleIdArr.indexOf(item.article_id);

        if (theIndex >= 0) {//若是找到了，则先删除
            articleIdArr.splice(theIndex, 1);
        }
        articleIdArr.unshift(item.article_id);//否则在数组开始处添加

        //最后存到sessionStorage中
        sessionStorage.setItem('history', JSON.stringify(historyObj))

    }
    else {//登陆状态下，历史记录上传至服务器
        updateHistory(sessionStorage.getItem('token'), sessionStorage.getItem('userName'), item.article_id)
    }


}

</script>


<style lang="scss" scoped>
@import "../common/style/mixin";
@import "../common/style/handle.scss";

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
// .list-box {
//     height: $ListHeight;
//     overflow-y: scroll;
//     overflow-x: hidden;
//     box-sizing: border-box;
// }

.list {
    padding: 0px;
    margin: 0px;
    @include background_color("ListItem_background_color");
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
        @include font_color("ListItem_article_title_color");
        //color: $titleTextColor;
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
                @include font_color("ListItem_article_brief_color");
                font-size: $briefFontSize;
                //color: $briefTextColor;
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
                @include background_color("ListItem_tag_background_color");
                @include font_color("ListItem_tag_color");
                font-size: $tagFontSize;
                //color: $tagTextColor;
                //background-color: #fafafa;
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