<template>
    <div class="editor">
        <input type="text" class="title" id="title" v-model="title" @input="autosave">
        <div class="operate-bar">
            <section class="tag-container">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoqian"></use>
                </svg>
                <ul class="tags">
                    <li class="tag" v-for="(tag,index) in getTags" :key="index">
                        {{tag}}
                        <sup @click="deleteTag(index)"> x </sup>
                    </li>
                </ul>
                <input type="text" class="tag-input" id="tag-input"  @keydown.enter="addTag">
                <span class="tag-add" @click="addTag">+</span>
            </section>
            <section class="btn-container">
                <button id="delete" class="delete">删除文章</button>
                <button id="submit" class="not-del">发布文章</button>
            </section>
        </div>
        <p class="tips">标签查询页面只能批量更改标签 修改的文章内容会自动保存</p>
        <div class="content">
            <textarea></textarea>
        </div>
    </div>
</template>

<script>
// 引入debounce方法
import debounce from 'lodash.debounce'
// 引入编辑器
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'
import { mapState, mapGetters } from 'vuex'
export default {
    name:'Editor',
    data() {
        return {
            simplemde:'',//编辑器
        }
    },
    computed:{
        ...mapState(['id','content','isPublished']),
        ...mapGetters(['getTags']),
        // 因为这个title是数据双向绑定 因此 它可能会被改变 如果我们直接从mapState中读取它的话 那么如果改变title的话 又因为它没有setter的话 就会导致无法直接改变state中的title
        title:{
            get(){
                return this.$store.state.title
            },
            set(value){
                this.$store.commit('SET_TITLE',value)
            }
        }   
    },
    mounted() {
        this.simplemde = new SimpleMDE({
            placeholder:'talk to me,what are you say..',
            spellChecker:false,
            toolbarTips:false
        });
        // 将vuex里面的正在编辑的文章的相关信息输出到编辑器里面去
            this.simplemde.value(this.content)
            // 绑定编辑器的按键事件以及复制 粘贴的事件发生
            this.simplemde.codemirror.on('keyHandle',()=>this.autosave())
            this.simplemde.codemirror.on('inputRead',()=>this.autosave())
    },
    // 监控ID值的变化 如果一旦发生变化 就直接将内容变化
    watch:{
        id(newVal,oldVal){
            this.simplemde.value(this.content)
        }
    },
    methods:{
        // debounce去抖动函数(1000毫秒)避免发送请求过多
        autosave:debounce(function(){
            if (this.id) {
                this.$store.dispatch('saveArticle',{
                    id:this.id,
                    title:this.title,
                    tags:this.getTags.join(','),
                    content:this.simplemde.value(),
                    isPublished:this.isPublished
                })
            }
        },1000),
         // 删除标签
    deleteTag(index){
        this.getTags.splice(index,1)
        this.autosave()
    },
    // 添加标签
    addTag(){

    }
    },
   
}
</script>

<style type="text/scss" lang="scss" scoped>
    @import '../../assets/style/variable';
.title {
    margin-bottom: 0.3em;
    width: 100%;
    height: 2em;
    border: none;
    font-size: 2.4rem;
    color: $title;
    outline: none;
    border-bottom: 1px solid $special;
    background: none;
    text-align: center;
}
.operate-bar {
    @include flex($justify: space-between);
    height: 4em;
    font-size: 1.3rem;
    margin-bottom: 1em;
    .tag-container {
        @include flex($justify: flex-start);
        .icon {
            width: 1.5em;
            height: 1.5em;
            margin-right: 10px;
        }
        .tags {
            @include flex;
            list-style: none;
            margin-right: 10px;
            padding: 0;
            .tag {
                margin-right: 10px;
                color: $base;
                position: relative;
                &:last-child {
                    margin-right: 0px;
                }
            }
        }
        .tag-add {
            font: {
                weight: 600;
                size: 1.6rem;
            }
            color: $special;
            // text-decoration: underline;
            cursor: pointer;
        }
    }
}
.tips {
    color: $quote;
    text-align: center;
}
.content {
    font-size: 1.6rem;
}
</style>
