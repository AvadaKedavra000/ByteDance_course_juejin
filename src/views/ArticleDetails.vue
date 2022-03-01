<template>
    <div class="page">
        <div class="header">
            <div class="author-info">
                <div class="author-info-left">
                    <div class="author-avatar">
                        <img :src="avatar" alt="头像" />
                    </div>
                    <div class="author-user">
                        <div class="author-name-and-lv">
                            <div class="name">{{ name }}</div>
                            <div class="lv">Lv{{ level }}</div>
                        </div>
                        <div class="author-time-and-viewCount">
                            <div class="time">{{ createTime }}</div>
                            <div class="viewCount">阅读 {{ viewCount }}</div>
                        </div>
                    </div>
                </div>
                <div class="author-info-right">
                    <button class="concern">关注</button>
                </div>
            </div>
            <div class="img-box">
                <img :src="cover_img" alt />
            </div>
        </div>

        <div class="content" v-html="article_content"></div>

        <div class="comment">
            <ul class="comment-list">
                <div v-for="first in comment" :key="first.comment_id" class="comment-item">
                    <CommentItem
                        :avatar_large="first.user_info.avatar_large"
                        :user_name="first.user_info.user_name"
                        :level="first.user_info.level"
                        :description="first.user_info.job_title"
                        :ctime="first.comment_info.ctime"
                        :comment_content="first.comment_info.comment_content"
                        :digg_count="first.comment_info.digg_count"
                        :reply_count="0"
                    />

                    <div v-if="first.comment_info.reply_count > 0" class="sub-comment-list">
                        <div
                            class="sub-comment-list-item"
                            v-for="second in first.reply_infos"
                            :key="second.reply_id"
                        >
                            <CommentItem
                                :avatar_large="second.user_info.avatar_large"
                                :user_name="second.user_info.user_name"
                                :level="second.user_info.level"
                                :description="second.user_info.job_title"
                                :ctime="second.reply_info.ctime"
                                :comment_content="second.reply_info.reply_content"
                                :digg_count="second.reply_info.digg_count"
                                :reply_count="0"
                            />
                        </div>
                    </div>
                </div>

                <!-- <li 
                v-for="item in comment" 
                :key="item.comment_id"
                class="comment-item">
                    <div class="comment-avater">
                        <div class="comment-img-box">
                            <img
                                :src="item.user_info.avatar_large"
                                alt
                            />
                        </div>
                    </div>
                    <div class="comment-threads">
                        <div class="comment-header">
                            <div class="name">{{item.user_info.user_name}}</div>
                            <span class="divide">|</span>
                            <div class="time">1天前</div>
                        </div>
                        <div
                            class="comment-content"
                        >{{item.comment_info.comment_content}}
                        </div>
                        <div class="comment-action-box">
                            <div class="dig-item">
                                <i class="iconfont icon-good"></i>
                                <span v-if="item.comment_info.digg_count===0">点赞</span>
                                <span v-else>{{item.comment_info.digg_count}}</span>
                            </div>
                            <div class="com-item">
                                <i class="iconfont icon-comments"></i>
                                <span v-if="item.comment_info.reply_count===0">评论</span>
                                <span v-else>{{item.comment_info.reply_count}}</span>
                            </div>
                        </div>
                        <div 
                        v-if="item.comment_info.reply_count > 0 " 
                        class="sub-comment-list">
                            <CommentItem 
                            v-for="second in item.reply_infos"
                            :key="second.reply_id"
                            :avatar_large="second.user_info.avatar_large"
                            :user_name="second.user_info.user_name"
                            :level="second.user_info.level"
                            :description="second.user_info.job_title"
                            :ctime="second.reply_info.ctime"
                            :comment_content="second.reply_info.reply_content"
                            :digg_count="second.reply_info.digg_count"
                            :reply_count="0"
                            />
                        </div>
                    </div>
                </li>-->
            </ul>
            <Observer :handle-intersect="getData1" root-selector=".comment-item" />
        </div>
    </div>
</template>





<script setup>
import { computed, ref, reactive } from 'vue'
import { getArticleById, getCommentsByArticleId } from '../fake-api/index.js'
import { useRoute } from 'vue-router'
import Observer from '../components/Observer.vue'
import CommentItem from '../components/CommentItem.vue'

// let articleReady=ref(false);



const route = useRoute();
const article_id = route.params.article_id;
//文章内容数据
let article_content = ref("");
let cover_img = ref("");
let avatar = ref("");
let name = ref("");
let viewCount = ref(0);
let ctime = ref(0);
let createTime = ref("");
let level = ref(0);

// let dataReady = ref(false);

//取文章内容
getArticleById(article_id).then((res) => {

    const article = res.data.article;

    article_content.value = article.article_content;
    cover_img.value = article.article_info.cover_image;//文章首图
    avatar.value = article.author_user_info.avatar_large;//作者头像
    name.value = article.author_user_info.user_name;//作者姓名
    viewCount.value = article.article_info.view_count;//浏览数
    ctime.value = article.article_info.ctime;//秒级时间戳
    level.value = article.author_user_info.level;//等级


    //从时间戳获取'XXXX年XX月XX日'
    const time = (stamp) => {
        const date = new Date(stamp);
        const Y = date.getFullYear() + '年';
        const M = (date.getMonth() + 1 <= 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '月';
        const D = (date.getDate() <= 9 ? ('0' + date.getDate()) : date.getDate()) + '日';
        return Y + M + D;
    }
    createTime.value = time(ctime.value * 1000);

    //根据用户等级渲染标签颜色
    const levelColor = (lv, className) => {
        //默认值#599dff
        const els = document.getElementsByClassName(className);
        const el = els[0];
        let bgColor = "#599dff";
        switch (lv) {
            case 1: bgColor = "#8cdbf4";
                break;
            case 2: bgColor = "#6eceff";
                break;
            case 3: bgColor = "#599dff";
                break;
            case 4: bgColor = "#34d19b";
                break;
            case 5: bgColor = "#ffa000";
                break;
            case 6: bgColor = "#f36262";
                break;
        }
        el.style.backgroundColor = bgColor;
    }
    levelColor(level.value, "lv");



    // dataReady.value = true;
})







//取文章评论

//文章评论数据
let comment = ref([]);
//是否还有更多评论
let has_more = ref(true);

let offset = 0;
let limit = 10;
//初始获取文章评论
getCommentsByArticleId(article_id, offset, limit).then(a => {
    // console.log('评论内容',a.data.comments);
    has_more.value = a.has_more;
    comment.value = a.data.comments;
    // console.log('后来', comment.value);
});

//无限滚动:评论列表触底时触发的回调
const getData1 = () => {
    if (!has_more.value) {
        return;
    }
    offset += 10;
    getCommentsByArticleId(article_id, offset, limit).then(a => {
        has_more.value = a.has_more;
        const newComment = a.data.comments;
        comment.value = [...comment.value, ...newComment];
    });

}

</script>



<style lang="scss">
@import "../common/style/handle.scss";
code {
    @include background_color("ArticleDetails_content_background_color");
    @include font_color("ArticleDetails_content_color");
}
</style>

<style lang="scss" scoped>
@import "../common/style/handle.scss";
@import "../common/style/mixin";
// .page::-webkit-scrollbar {
//     display: none;
// }
$avatarSize: 32px;
$nameColor: #1d2129;
$contenColor: #4e5969;
$timeAndActionColor: #86909c;

.page {
    @include background_color("ArticleDetails_page_background_color");
    @include font_color("ArticleDetails_page_font_color");
    height: $ArticleDetailsHeight;
    overflow-y: scroll;
    // overflow-x: hidden;
    box-sizing: border-box;
    padding: 0 20px;
    .name {
        @include font_color("ArticleDetails_name_color");
    }
}

.header {
    .author-info {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        .author-info-left {
            // width: 70%;
            display: flex;
            justify-self: start;
            align-items: center;
            .author-avatar {
                width: $avatarSize;
                height: $avatarSize;
                border-radius: $avatarSize * 0.5;
                overflow: hidden;
                margin-right: 10px;
                img {
                    width: $avatarSize;
                    height: $avatarSize;
                    font-size: 13px;
                }
            }
            .author-user {
                flex-grow: 1;
                .author-name-and-lv {
                    display: flex;
                    align-items: center;

                    .lv {
                        margin-left: 10px;
                        background-color: #599dff;
                        color: #fff;
                        padding: 0 5px;
                        border-radius: 5px;
                        font-size: 13px;
                    }
                }
                .author-time-and-viewCount {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    color: #767a80;
                    font-size: 14px;
                    .time {
                        margin-right: 10px;
                    }
                }
            }
        }
        .author-info-right {
            width: 53px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .concern {
                width: 53px;
                height: 26px;
                color: #6cbd45;
                background-color: #fff;
                padding: 1px 6px;
                border: solid 1.5px #6cbd45;
                border-radius: 20px;
                // border: 1px #87CEFA;
            }
        }
    }
    .img-box {
        width: 100%;
        img {
            width: 100%;
        }
    }
}
.content {
    text-align: left;

    // color:#333;
    // :deep(li){
    //     text-align: left;
    //     color:red;
    // }
    // :deep(code){
    //     text-align: left;
    //     color:pink;
    // }
}
.comment {
    ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    .comment-list {
        .comment-item {
            display: flex;
            flex-direction: column;

            .comment-avater {
                width: $avatarSize;
                height: 100%;
                .comment-img-box {
                    width: $avatarSize;
                    height: $avatarSize;
                    border-radius: $avatarSize * 0.5;
                    overflow: hidden;
                    img {
                        width: $avatarSize;
                        height: $avatarSize;
                    }
                }
            }
            .comment-threads {
                flex-grow: 1;
                margin-left: 16px;
                .comment-header {
                    display: flex;
                    height: 17.6px;
                    font-size: 14px;
                    .divide {
                        margin: 0 12px;
                        color: $timeAndActionColor;
                    }
                    .time {
                        color: $timeAndActionColor;
                    }
                }
                .comment-content {
                    text-align: left;
                    font-size: 14px;
                    margin-top: 8px;
                }
                .comment-action-box {
                    display: flex;
                    height: 20px;
                    margin-top: 8px;
                    font-size: 14px;
                    color: $timeAndActionColor;
                    .iconfont {
                        font-size: 18px;
                    }
                    .dig-item {
                        margin-right: 17px;
                    }
                }
            }
            .sub-comment-list {
                @include background_color(
                    "ArticleDetails_sub_comment_list_background_color"
                );
                box-sizing: border-box;
                margin-bottom: 15px;
                margin-left: 48px;
                padding: 0 12px;
                //background-color: #f7f8fa;

                .sub-comment-list-item:not(:last-child) {
                    border-bottom: solid 1px rgb(229, 230, 235);
                }
            }
        }
        .comment-item:not(:last-child) {
            border-bottom: solid 1px rgb(229, 230, 235);
        }
    }
}
</style>