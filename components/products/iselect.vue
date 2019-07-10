<template>
  <div class="m-product-select">
    <dl class="tab">
      <!-- dt：酒店住宿 -->
      <dt>{{ name }}<i class="el-icon-arrow-down el-icon--right"/></dt>
      <dd>
        <!-- h3：酒店住宿 -->
        <h3>{{ name }}</h3>
        <!-- span：全部 高端酒店 高星酒店 低星酒店 -->
        <span
          v-for="(item,idx) in list"
          :key="idx">{{ item }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type:String,
      default:''
    },
    list: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>
