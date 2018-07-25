<!--
    Created by linfengluo@gmail.com on 2018/7/24.
-->
<template>
	<section :class="['readMenu', {
		'grey': isShowReadMenu
	}]" @click.stop="closeMenu">
		<div class="readMenu__header" @click.stop="prevPage"></div>
		<div class="readMenu__middle">
			<div class="readMenu__middle--left"></div>
			<div class="readMenu__middle--center" @click.stop="toggleMenu"></div>
			<div class="readMenu__middle--right"></div>
		</div>
		<div class="readMenu__footer" @click.stop="nextPage"></div>
	</section>
</template>

<script>

    export default {
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
			isShowReadMenu(){
			    return this.$store.state.isShowReadMenu
			}
		},
        methods: {
			nextPage(){
			    if (!this.isShowReadMenu) {
					this.$emit('nextPage')
				} else {
			        this.closeMenu()
				}
			},

			prevPage(){
				if (!this.isShowReadMenu) {
					this.$emit('prevPage')
				} else {
					this.closeMenu()
				}
			},
			toggleMenu(){
				this.$store.commit('TOGGLE_READ_MENU', !this.isShowReadMenu)
			},

			closeMenu(){
				this.$store.commit('TOGGLE_READ_MENU', false)
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.readMenu{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	z-index: 1000;

	&.grey{
		background-color: rgba(0, 0, 0, 0.6);
	}

	&__header, &__footer{
		flex: 0 0 30%;
	}

	&__middle{
		flex: 1;
		display: flex;

		&--left, &--right{
			flex: 0 0 30%;
		}

		&--center{
			flex: 1;
		}
	}
}
</style>
