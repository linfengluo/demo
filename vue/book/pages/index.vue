<template>
	<section class="bHot is-page">
		<BookList :bookList="books"></BookList>
	</section>
</template>

<script>
	import axios from '../plugins/axios'
	import BookList from '../components/book/bookList.vue'
	export default {
		asyncData ({ store}) {
			store.commit('CHANGE_APPBAR_STATE', true)
			return axios.get('/api/book/hot')
				.then((res) => {
					let response = res.data
					if (response.code == 200) {
						return {
							books: response.data
						}
					} else {
						this.openAlert({message: response.msg})
					}

				})
		},

		components: {
			BookList
		},
	}
</script>
