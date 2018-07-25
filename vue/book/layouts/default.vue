<template>
	<div :z-depth="1" class="bContainer  is-full-width">
		<mu-appbar color="primary"
				   v-show="isShowAppBar || isShowReadMenu"
				   class="is-full-width bContainer__header">
			<mu-button icon slot="left" @click="openMenu">
				<mu-icon value="menu" ></mu-icon>
			</mu-button>
			{{title}}
		</mu-appbar>
		<section :class="['bContainer__body ', {
			'is-padding-top': isShowAppBar
		}]">
			<nuxt/>
		</section>
		<Menu></Menu>
		<AlertDialog></AlertDialog>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import AlertDialog from '../components/alert.vue'
	import Menu from '../components/menu.vue'

	export default {
		data(){
			return {
			    activeMenu: 'hot',
				menu: [{
					name: '推荐',
					icon: 'whatshot',
					link: '/',
					value: 'hot'
				},{
					name: '搜索',
					icon: 'search',
					link: '/search',
					value: 'search'
				}, {
					name: '书屋',
					icon: 'person',
					link: '/',
					value: 'my'
				}],

			}
		},
		components: {
			AlertDialog,
			Menu
		},
		mounted(){
		  	const router = this.storageGet(this.routerKey)

			if (router != '' && this.$route.name != 'read') {
				this.storageDel(this.routerKey)
				this.$router.push(router)
			}
		},
		computed: {
			...mapState({
			    title: state => state.title,
				isShowAppBar: state => state.isShowAppBar,
				isShowReadMenu: state => state.isShowReadMenu
			})
		},
		methods: {
			handleChangeMenu(val) {
			    const activeMenu = this.menu.filter(item => {
			        return item.value === val
				})
				this.$store.commit('CHANGE_TITLE', activeMenu[0].name)
				this.$router.push(activeMenu[0].link)
			},
			openMenu(){
			    this.$store.commit('CHANGE_MENU_STATUS')
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.bContainer {
		&__header{
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 2000;
		}

		.is-padding-top{
			padding-top: 56px;
		}

	}

</style>

