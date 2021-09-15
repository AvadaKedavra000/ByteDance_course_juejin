import { storeKey } from "vuex";

export default {
    changePrimaryNavTitle(state,title){
        state.primaryNavTitle=title;
    },
    changeSecondaryNavTitle(state,title){
        state.secondaryNavTitle=title;
    },
    changeTertiaryNavTitle(state,title){
        state.tertiaryNavTitle=title;
    },
    setSortBy(state,value){
        state.sortBy=value;
    },
    setCategoryId(state,value){
        state.categoryId=value;
    },
    updateOffset(state){
        state.offset+=state.limit;
    },
    resetOffset(state){
        state.offset=0;
    },
  }