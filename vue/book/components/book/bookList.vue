<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<mu-grid-list class="bHot__list"
				  :cols="3"
				  ref="bookList">
		<BookItem v-for="item of bookList"
				  :key="item.id"
				  :book="item">
		</BookItem>
	</mu-grid-list>
</template>

<script>
	import BookItem from './bookItem.vue'
    export default {
        props: {
          	title: {
          	    type: String,
				default: '推荐'
			},
			bookList: {
          	    type: Array,
				default(){
          	        return []
				}
			}
		},
        data() {
            return {
                isMounted: false
			}
        },
        components: {
			BookItem
		},
        mixins: [],
        created(){
        },
        mounted(){
            this.isMounted = true
        },
        watch: {},
        computed: {

		},
        methods: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.bHot{
		&__list{
			width: 100%;
			height: 100%;
		}
	}
</style>
