<template>
  <v-app>
  <Navbar v-if="token!=null"/>
    <v-content>
      
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed:{
    ...mapState(['token'])
  },
  data: () => ({
    //
  }),
};
</script>
