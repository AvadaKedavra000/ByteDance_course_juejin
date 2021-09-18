<template>
    <div>
        <div class="comment-item" >
            <div class="comment-avater">
                <div class="comment-img-box">
                    <img :src="avatar_large" alt />
                </div>
            </div>
            <div class="comment-threads">
                <div class="comment-header">
                    <div class="name">{{ user_name }}</div>
                    <span class="divide">|</span>
                    <div class="description" v-if="description.length>0">{{description}}</div>
                    
                </div>
                <div class="comment-content">{{ comment_content }}</div>
                <div class="comment-action-box">
                    <div class="dig-item">
                        <i class="iconfont icon-good"></i>
                        <span v-if="digg_count === 0">点赞</span>
                        <span v-else>{{ digg_count }}</span>

                    </div>
                    <div class="com-item">
                        <i class="iconfont icon-comments"></i>
                        <span v-if="reply_count === 0">评论</span>
                        <span v-else>{{ reply_count }}</span>
                    </div>
                    <div class="time">1天前</div>
                </div>
            </div>
        </div>
    </div>
</template>





<script setup>
import { ref, defineProps } from 'vue'
import { getArticleById, getCommentsByArticleId } from '../fake-api/index.js'
import { useRoute } from 'vue-router'
import Observer from '../components/Observer.vue'


const props = defineProps({
    avatar_large: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        default:""
    },
    ctime: {
        type: Number,
        required: true
    },
    comment_content: {
        type: String,
        required: true
    },
    digg_count: {
        type: Number,
        required: true
    },
    reply_count: {
        type: Number,
        required: true
    }

});



</script>

<style lang="scss" scoped>
@import "../common/style/mixin";
// .page::-webkit-scrollbar {
//     display: none;
// }
$avatarSize: 32px;
$nameColor: #1d2129;
$contenColor: #4e5969;
$timeAndActionColor: #86909c;

.comment-item {
    display: flex;
    padding:12px 0;
    border-bottom: solid 1px rgb(229, 230, 235);
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
            flex-wrap:nowrap;
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
            .com-item{
                margin-right: 17px;
            }
        }
    }
}
</style>