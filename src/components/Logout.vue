<script>
export default {
methods: {
logout() {
this.$store.dispatch("LOGOUT")
.then(() => {
this.$router.push("/");
});
},
},

mounted() {
this.logout();
},
};
</script>