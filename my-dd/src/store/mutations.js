import state from "./state";
const mutations = {
  //设置bookList值
  SET_BOOKLIST(state,payload) {
    state.bookList = payload;
  }
};
export default mutations;
