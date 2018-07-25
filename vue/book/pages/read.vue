<!--
    Created by linfengluo@gmail.com on 2018/7/23.
-->
<template>
	<section :class="['read', theme]">
		<h3 class="read__title">{{bookInfo.title}}</h3>
		<div class="read__wrapper">
			<div v-html="bookInfo.content" class="read__content"></div>
			<div class="read__menu">
				<mu-button flat color="primary" @click="prev">上一章</mu-button>
				<mu-button flat color="secondary" @click="next">下一章</mu-button>
			</div>
		</div>

		<ReadMenu @nextPage="nextPage" @prevPage="prevPage"/>
	</section>
</template>

<script>
	import axios from '../plugins/axios'
	import ReadMenu from '../components/readMenu.vue'
	import api from '../units/api'
    export default {
        asyncData (context) {
            return context.store.dispatch('getSectionContent', context.query.link)
				.then((res) => {
					context.store.commit('CHANGE_APPBAR_STATE', false)

					return {
						bookInfo: res,
					}
				})
        },
        fetch () {
        },
        head: {},
        data() {
            return {
                bodyHeight: 0,
				newScrollHeight: 0,
				scrollerTimmer: null,
				theme: 'brown'
			}
        },
        components: {
			ReadMenu
		},
        mixins: [],
        created(){
        },
        mounted(){
            this.bodyHeight = document.documentElement.clientHeight

		},
        watch: {
            $route(val){
				this.$store.dispatch('getSectionContent', val.query.link)
					.then(res => {
					    window.scrollTo(0, 0)
					    this.bookInfo = res
					})
			}
		},
        computed: {},
        methods: {
			prev(){
			    this.$router.push({
			        name: 'read',
					query: {
			            link: encodeURIComponent(this.bookInfo.prev)
					}
				})
			},
			next(){
			    const routerParams = {
					name: 'read',
					query: {
						link: encodeURIComponent(this.bookInfo.next)
					}
				}
				this.storageSave(this.routerKey, routerParams)
				this.$router.push(routerParams)
			},

			prevPage(){
				this.handleScroll(0)
			},

			nextPage(){
				this.handleScroll(1)
			},

			handleScroll(type = 1){
			    let scrollHeight = this.bodyHeight - 20
				clearInterval(this.scrollerTimmer);
				this.scrollerTimmer = setInterval(() =>{
					var ispeed = Math.floor(scrollHeight / 5);
					scrollHeight -= ispeed
					let currentScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
					window.scrollTo(0, type == 1 ? currentScroll + ispeed : currentScroll - ispeed)
					if(ispeed <= 0){
						clearInterval(this.scrollerTimmer);
					}
				}, 10)
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.read{
	padding: 12px;

	&.white{
		background-color: #ffffff;
		color: #222;
	}

	&.yellow{
		background-color: #FAF9DE;
	}

	&.brown{
		background-color: #FFF2E2;
		color: #222;
	}

	&.red{
		background-color: #FDE6E0;
	}

	&.green{
		background-color: #E3EDCD;
	}

	&.blue{
		background-color: #DCE2F1 ;
	}

	&.purple{
		background-color: #E9EBFE;
	}

	&.grey{
		background-color: #EAEAEF;
	}

	&__title{
		text-align: center;
	}

	&__wrapper{
		position: relative;
		padding-bottom: 56px;
		overflow-x: hidden;
	}

	&__content{
		font-size: 14px;
		line-height: 2;
		overflow-x: hidden;
	}

	&__menu{
		display: flex;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 12px;
		z-index: 2000;
	}


}
</style>
