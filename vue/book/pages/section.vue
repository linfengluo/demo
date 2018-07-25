<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<section class="section">
		<BookInfo :bookInfo="bookInfo"></BookInfo>
		<mu-divider ></mu-divider>
		<div  class="section__filter">
			<div class="section__filter--item">
				<mu-select label="章节" v-model="page" full-width>
					<mu-option v-for="item of pageList" :key="item.value" :label="item.label" :value="item.value"></mu-option>
				</mu-select>
			</div>
		</div>
		<mu-list class="section__list">
			<mu-list-item button
						  v-for="item of bookSections"
						  :key="item.id"
						  @click="handleClickSection(item)"
			>
				<mu-list-item-title>{{item.title}}</mu-list-item-title>
			</mu-list-item>
		</mu-list>
	</section>
</template>

<script>
	import axios from '../plugins/axios'
	import BookInfo from '../components/book/bookInfo.vue'
	import {mapState, mapActions} from 'vuex'
	export default {
		asyncData ({ query, store}) {
			store.commit('CHANGE_APPBAR_STATE', true)
		    const type = typeof query.type === "undefined" ? 'local' : query.type
			if (type === 'online') {
				return store.dispatch('getOnlineBook', {
					type: type,
					key: query.key,
					page: typeof query.page === "undefined" ? 1 : query.page,
				}).then((response) => {
					return {
						bookInfo: response.data.bookInfo,
						bookSections: response.data.data,
						page: response.data.page,
					}
				})
			} else {
			    return store.dispatch('getLocalBook', {
					id: query.key ,
				}).then((res) => {
					return res
				})
			}
		},
        data() {
            return {
				direct: 'ASC',
				page: 1,
				directList: [
					{
						label: '升序',
						value: 'ASC'
					},
					{
						label: '倒叙',
						value: 'DESC'
					}
				],
				bookSections: []

			}
        },
        components: {
			BookInfo
		},
        mounted(){
			const type = typeof this.$route.query.type === "undefined" ? 'local' : this.$route.query.type

			if (type == 'local') {
				this.getSections({
					key: this.bookInfo.id,
					type: 'local',
					page: this.page
				}).then(list => {
					this.bookSections = list
				})
			}

        },
        watch: {
			page(){
				this.updateSections()
			}
		},
        computed: {
			...mapState({
				total: state => state.bookInfo.total,
			    count: state => state.bookInfo.count
			}),

			pageList(){
			    const temp = [{
			        label: '1-50',
					value: 1
				}]
			    for (let i = 2; i <= this.total; i++) {
					temp.push({
					    label: `${(i - 1) * 50 + 1}- ${i * 50}`,
						value: i
					})
				}
				return temp
			}
		},
        methods: {
			...mapActions({
			   	getSections: 'getSections'
			}),
			updateSections(){
				this.getSections({
					key: this.bookInfo.id,
					type: 'local',
					page: this.page,
					direct: this.direct
				}).then(list => {
					this.bookSections = list
				})
			},

			handleClickSection(item){
			    this.$router.push({
			        name: 'read',
					query: {
			            link: encodeURIComponent(item.link)
					}
				})
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.section{

	&__filter{
		padding: 0 12px;
		display: flex;

		&--item{
			flex: 1;

			&.left{
				margin-right: 12px;
			}
		}
	}

	&--list{

	}

}
</style>
