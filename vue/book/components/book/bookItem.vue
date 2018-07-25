<!--
    Created by linfengluo@gmail.com on 2018/7/11.
-->
<template>
	<mu-grid-tile @click="handleClick">
		<mu-ripple  class="bBook">
			<div class="is-backgroun-img" :style="imgStyle"></div>
		</mu-ripple>
		<span slot="title">{{book.name}}</span>
		<span slot="subTitle">by <b>{{book.author}}</b></span>
	</mu-grid-tile>
</template>

<script>
    export default {
        props: {
          	book: {
          	    type: Object,
				default(){
          	        return {
          	            "id":0,
						"name":"",
						"author":"",
						"logo":"",
						"updatedAt":"",
						"href":"",
          	        }
				}
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
        computed: {
            imgStyle(){
                return {
                    'background-image': `url(${this.book.logo})`
				}
			}
		},
        methods: {
			handleClick(){
			    this.$router.push({
			        name: 'section',
					query: {
			            type: 'local',
						key: this.book.id
					}
				})
			    console.log(this.book)
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.bBook{
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
