<template>
  <div v-show="token != null || token != '' || token != undefined">
    <v-app-bar color="teal accent-3" dark app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Sistema</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on"> </v-btn>
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
            active-class="border"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn color="teal accent-8" @click="salir()"> Salir </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      class="teal accent-3 col-md-6 col-12"
    >
      <v-divider></v-divider>
      <v-list nav dense>
        <template v-if="this.$store.state.rol == 'ADMIN_ROL'">
          <v-list-item-group v-model="selectedItem" color="primary">
            <menu-item icon="mdi-home" title="Inicio" to="/" />
            <v-list-group
              :value="false"
              prepend-icon="mdi-cog-outline"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-title>Almacén</v-list-item-title>
              </template>
              <menu-item
                icon="mdi-account-group"
                title="Categoría"
                pos="2"
                to="/categorias"
              />
              <menu-item
                icon="mdi-account-multiple"
                title="Artículos"
                pos="2"
                to="/articulos"
              />
            </v-list-group>
            <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-group :value="false" prepend-icon="mdi-cog-outline" no-action>
            <template v-slot:activator>
              <v-list-item-title>Accesos</v-list-item-title>
            </template>
            <menu-item
              icon="mdi-account-group"
              title="Usuario"
              pos="2"
              to="/usuario"
            />
          </v-list-group>
        </v-list-item-group>
          </v-list-item-group>
        </template>
        <template
          v-if="
            this.$store.state.rol == 'ALMACENISTA_ROL' ||
            this.$store.state.rol == 'ADMIN_ROL'
          "
        >
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-group
              :value="false"
              prepend-icon="mdi-cog-outline"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-title>Compras</v-list-item-title>
              </template>
              <menu-item
                icon="mdi-account-group"
                title="Ingresos"
                pos="2"
                to="/ingresos"
              />
              <menu-item
                icon="mdi-account-multiple"
                title="Proveedores"
                pos="2"
                to="/proveedores"
              />
            </v-list-group>
          </v-list-item-group>
        </template>
        <template v-if="this.$store.state.rol == 'VENDEDOR_ROL'">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-group
              :value="false"
              prepend-icon="mdi-cog-outline"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-title>Ventas</v-list-item-title>
              </template>
              <menu-item
                icon="mdi-account-group"
                title="Ventas"
                pos="2"
                to="/ventas"
              />
              <menu-item
                icon="mdi-account-multiple"
                title="Clientes"
                pos="2"
                to="/clientes"
              />
            </v-list-group>
          </v-list-item-group>
        </template>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-group :value="false" prepend-icon="mdi-cog-outline" no-action>
            <template v-slot:activator>
              <v-list-item-title>Consultas</v-list-item-title>
            </template>
            <menu-item
              icon="mdi-account-group"
              title="Consultas Compras"
              pos="5"
              to="/consultasCompras"
            />
            <menu-item
              icon="mdi-account-multiple"
              title="Consultas Ventas"
              pos="5"
              to="/consultasVentas"
            />
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import MenuItem from "./menu-item";

export default {
  components: {
    MenuItem,
  },
  data: () => ({
    selectedItem: 0,
    drawer: true,
  }),
  methods: {
    salir() {
      this.$store.dispatch("setToken", "");
      console.log(this.$store.state.token);
      this.$router.push("/login");
    },
  },
};
</script>