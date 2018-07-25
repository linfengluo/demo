<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<mu-drawer :open.sync="isOpen" :docked=false class="asideMenu">
		<section class="asideMenu__header">
			<h2>Book</h2>
		</section>
		<mu-list class="asideMenu__content">
			<mu-list-item button
						  v-for="item of menu"
						  :key="item.value"
						  @click.stop="handleClick(item)"
			>
				<mu-list-item-title>{{item.name}}</mu-list-item-title>
			</mu-list-item>
		</mu-list>
		<section class="asideMenu__footer">
			仅供学习，如有侵权请联系 linfengluo@gmail.com
		</section>
	</mu-drawer>
</template>

<script>
	import {mapState} from 'vuex'
    export default {
        data() {
            return {
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
        components: {},
        mixins: [],
        created(){
        },
        mounted(){
        },
        watch: {},
        computed: {
			isOpen: {
			    get(){
			        return this.$store.state.isOpenMenu
				},
				set(val){
			        this.$store.commit('CHANGE_MENU_STATUS', val)
				}
			}
		},
        methods: {
			handleClick(menu) {
				this.$store.commit('CHANGE_MENU_STATUS', false)
				this.$store.commit('CHANGE_TITLE', menu.name)
				this.$router.push(menu.link)
			},
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.asideMenu{
	overflow: hidden;
	max-height: 100% !important;
	max-height: 100vh !important;
	display: flex;
	flex-direction: column;

	&__header{
		background-color: #2196f3;
		color: #fff;
		text-align: center;
		width: 100%;
		flex: 0 0 30vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__content{
		flex: 1;
	}

	&__footer{
		flex: 0 0 60px;
		align-items: center;
		justify-content: center;
		color: #7f828b;
		font-size: 12px;
		text-align: center;
	}
}
</style>
