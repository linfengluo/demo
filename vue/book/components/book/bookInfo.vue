<!--
    Created by linfengluo@gmail.com on 2018/7/12.
-->
<template>
	<header class="bInfo">
		<mu-paper  :z-depth="1" class="bInfo__logo">
			<div class="is-backgroun-img" :style="imgStyle"></div>
		</mu-paper>
		<div class="bInfo__info">
			<p>书名：{{bookInfo.name}}</p>
			<p>作者：{{bookInfo.author}}</p>
			<p class="bInfo__info--desc">简介：{{bookInfo.intro}}</p>
		</div>
	</header>
</template>

<script>
    export default {
        props: {
            bookInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
        computed: {
			imgStyle(){
				return {
					'background-image': `url(${this.bookInfo.logo})`
				}
			}
		},
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import "../../scss/var";
.bInfo{
	padding: 12px;
	display: flex;

	&__logo{
		width: 80px;
		height: 120px;
	}

	&__info{
		margin-left: 12px;
		flex: 1;

		&--desc{
			color:  $text-color-desc;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}

	}
}
</style>
