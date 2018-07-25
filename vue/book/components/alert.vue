<!--
    Created by linfengluo@gmail.com on 2018/7/10.
-->
<template>
	<mu-dialog :title="dialog.title"
			   class="alert"
			   width="80%"
			   :open.sync="dialog.isShow">
		{{dialog.message}}
		<mu-button slot="actions" flat
				   color="primary"
				   @click="closeSimpleDialog">
			{{dialog.colseText}}
		</mu-button>
	</mu-dialog>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
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
			...mapState({
			    dialog: state => state.alertInfo
			})
		},
        methods: {
			closeSimpleDialog(){
				typeof this.dialog.onClose === "function" && this.dialog.onClose()
				this.$store.commit('TOGGLE_ALERT_DIALOG')
			}
		}
    }
</script>

