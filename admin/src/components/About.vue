<template>
    <div style="height:100%">
        <Aside />
        <div class="about-container main">
            <h2>关于我 /
                <span>ABOUT ME</span>
            </h2>
            <hr>
            <main>
                <textarea></textarea>
                <section class="btn-container">
                    <button class="not-del">提交</button>
                </section>
            </main>
        </div>
    </div>
</template>

<script>
import Aside from '@/components/common/Aside'
import SimpleMDE from 'simplemde'

export default {
    name:'About',
    components:{
        Aside
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/style/variable';
main {
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
    font-size: 1.6rem;
}

.btn-container {
    @include flex($justify: flex-end);
}
</style>