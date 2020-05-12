<template>
  <div class="profile">Profile</div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({
  name: "profile",
  components: {}
})
export default class Profile extends Vue {}
</script>
<style lang="scss">
.profile {
}
</style>