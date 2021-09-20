<template>
    <ListItem v-if="data.length" :data="data" class="ListItem" />
    <div class="tips" v-else>
      <span>历史记录为空,快去【掘金】吧~</span>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import ListItem from '../components/ListItem.vue'

const store=useStore();
const data=store.state.history;

</script>
<script>
export default {
  name: 'History'
}
</script>

<style>
  .ListItem{
    height:83vh;
    overflow-y:scroll;
  }
</style>