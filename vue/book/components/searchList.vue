<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<mu-list>
		<mu-list-item v-for="(book, index) in bookList"
					  class="list__item"
					  :key="index"
					  button
					  @click="handleClick(book)"
		>
			<mu-list-item-title>
				<span v-html="formatTitle(book.title)"></span>
			</mu-list-item-title>
		</mu-list-item>

	</mu-list>


</template>

<script>
    export default {
        props: {
            bookList:{
                type: Array,
				default(){
                    return []
				}
			},
			searchKey: {
                type: String,
				default: ''
			},
			searchType: {
				type: String,
				default: 'local'
			}
		},
        data() {
            return {}
        },
        components: {},
        mixins: [],
        created(){
        },
        mounted(){
        },
        watch: {},
        computed: {},
        methods: {
            formatTitle(title){
                const regex = new RegExp(this.searchKey, 'ig')
				return title.replace(regex, `<span class="is-key">${this.searchKey}</span>`)
			},
			handleClick(book){
                let params = {
                    type: this.searchType,
					key: this.searchType == 'online' ? book.link : book.id
				}
				this.getFn('getMenu', params)
					.then(res => {
					    console.log(res)
					})
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
