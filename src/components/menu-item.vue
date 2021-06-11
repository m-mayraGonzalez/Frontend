<template>
  <v-list-item :to="to" >
    <v-list-item-icon v-if="pos==='1'">
      <v-icon>{{icon}}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{title}}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon v-if="pos==='2'">
      <v-icon>{{icon}}</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
     name: 'menu-item',
     props:{
         icon:String,
         title:String,
         pos:{
           type:String,
           default:'1'
         },
         to:String
     }
}
</script>