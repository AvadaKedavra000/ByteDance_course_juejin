<template>
    <div>
        <div class="comment-item">
            <div class="comment-avater">
                <div class="comment-img-box">
                    <img :src="avatar_large" alt />
                </div>
            </div>
            <div class="comment-threads">
                <div class="comment-header">
                    <div class="name">{{ user_name }}</div>
                    <div
                        class="lv"
                        :style="{ 'background-color': levelColor(props.level) }"
                    >Lv{{ level }}</div>
                    <span class="divide" v-if="description.length > 0">|</span>
                    <div class="description" v-if="description.length > 0">{{ description }}</div>
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
                    <div class="time">{{ createTime }}</div>
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

//数据
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
    description: {
        type: String,
        default: ""
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


//计算由时间戳计算当时距今的时间,格式为 X天前 X月前 等等
const time = (stamp) => {
    const ms = (new Date()).getTime()-stamp;
    const s = Math.floor(ms / 1000);
    const min = Math.floor(ms / (1000 * 60));
    const hour = Math.floor(ms / (1000 * 60 * 60));
    const day = Math.floor(ms / (1000 * 60 * 60 * 24));
    const month = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
    const year = Math.floor(ms / (1000 * 60 * 60 * 24 * 30 * 12));
    //判断，返回
    if (year > 0) {
        return `${year}年前`
    }
    if (month > 0) {
            return `${month}月前`
    }
    if (day > 0) {
        return `${day}天前`
    }
    if (hour > 0) {
        return `${hour}小时前`
    }
    if (min >= 0) {
        return `${min}分钟前`
    }
}
let createTime = ref("");    //评论创建时间
createTime.value = time(props.ctime * 1000);


//根据用户等级渲染标签颜色
const levelColor = (lv) => {
    //默认值#599dff
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
        case 7: bgColor = "#f36262";
            break;
    }
    return bgColor;
}

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
    padding: 12px 0;
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
            align-items: center;
            height: 17.6px;
            font-size: 14px;
            // //不换行
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            .name {
                color: $nameColor;
            }
            .lv {
                margin: 0 5px;
                background-color: #599dff;
                color: #fff;
                padding: 0 5px;
                border-radius: 5px;
                font-size: 11px;
            }
            .divide {
                margin: 0 12px;
                color: $timeAndActionColor;
            }
            .description {
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            .com-item {
                margin-right: 17px;
            }
        }
    }
}
</style>