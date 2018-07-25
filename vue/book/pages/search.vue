<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<section class="search">
		<header class="search__header">
			<mu-text-field v-model.trim="searchKey"
						   placeholder="search anything"
						   :error-text="errorText"
						   full-width
						   @keyup.enter="handleSearch"
						   underline-color="none"
						  >
				<mu-button flat
						   color="primary"
						   slot="append"
						   @click.stop="handleSearch">
					<mu-icon value="search"></mu-icon>search
				</mu-button>
			</mu-text-field>
		</header>
		<div>
			<SearchList v-if="showListType == 'online'"
						:bookList="searchList"
						:searchKey="searchKey"
						:searchType="showListType"></SearchList>
			<BookList v-else
					  :bookList="searchList"
			></BookList>
		</div>
	</section>
</template>

<script>
	import SearchList from '../components/searchList.vue'
	import BookList from '../components/book/bookList.vue'
    export default {
		asyncData ({store}) {
			store.commit('CHANGE_APPBAR_STATE', true)
			return {}
		},
        head: {},
        data() {
            return {
                searchKey: '',
				searchType: 'local',
				showListType: 'local',
				searchList: [],
				errorText: ''
			}
        },
        components: {
			SearchList,
			BookList
		},
        methods: {
			handleSearch(){
			    if (this.searchKey == '') {
					this.errorText = '请输入搜索关键字'
					return false
				}
				this.errorText = ''

				this.getFn('search', {
					key: this.searchKey,
					type: this.searchType
				}).then(res => {
				    this.showListType = res.type
					this.searchList = res.bookList
				})
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.search{
	&__header{
		padding: 12px 24px 0;
	}
}
</style>
