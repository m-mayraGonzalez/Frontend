<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-layout row>
      <v-flex md3>
        <v-app :style="{ background: $vuetify.theme.themes.light.background }">
          <v-container>
            <v-flex>
              <v-card class="ma-5 text-center mt-10" shaped elevation="10">
                <v-card-title class="layout justify-center">Besw</v-card-title>
                <v-card-subtitle class="layout justify-center"
                  >24 Articulos</v-card-subtitle
                >
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Producto</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Tamaño</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Peso</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="mt-n5">
                    <v-list-item-subtitle>Lacteos</v-list-item-subtitle>
                    <v-list-item-subtitle>170 cm</v-list-item-subtitle>
                    <v-list-item-subtitle>1 Kg</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex>
              <v-list color="transparent" class="text-center">
                <v-list-item>
                  <v-list-item-title class="cyan--text text--darken-1"
                    >Productos</v-list-item-title
                  >
                  <v-list-item-subtitle>32 Productos</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex>
              <v-card class="ma-5" shaped elevation="10">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar
                      size="10"
                      color="cyan darken-1"
                    ></v-list-item-avatar>
                    <v-list-item-title class="ml-n2">Peras</v-list-item-title>
                    <v-list-item-subtitle>10 </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Unidad</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Docena</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Precio</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="mt-n5">
                    <v-list-item-subtitle
                      >Nombre del Cliente</v-list-item-subtitle
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                </v-list>
                <v-list two-line subheader>
                  <v-list-item>
                    <v-list-item-content class="ml-5">
                      <v-list-item-title></v-list-item-title>
                      <v-list-item-subtitle
                        >Super Mercado Besw</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list two-line subheader class="mt-n5">
                  <v-list-item>
                    <v-list-item-content class="ml-5">
                      <v-list-item-title>Mejor Calidad</v-list-item-title>
                      <v-list-item-subtitle
                        >Santander-Aratoca</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list two-line subheader class="mt-n8">
                  <v-list-item class="ml-5">
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Datos</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="ml-5">
                    <v-list-item-title>21 de mayo 2021</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="ma-5 text-center mt-12" shaped elevation="10">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      <v-list-item-title>Código de Barras</v-list-item-title>
                    </v-list-item-title>
                    <v-list-item-subtitle>2346457865</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar size="60" color="cyan darken-1">
                    <v-icon color="white">fas fa-plus</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-flex>
          </v-container>
        </v-app>
      </v-flex>
      <v-flex md9>
        <v-app
          :style="{ background: $vuetify.theme.themes.dark.background }"
          class="rounded"
        >
          <v-container>
            <v-flex>
              <v-list class="mt-5">
                <v-list-item>
                  <v-list-item-title class="cyan--text text--darken-1"
                    >Fechas a Entregar</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex>
              <v-row no-gutters>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col cols="12" md="2">
                      <v-card height="80px" width="10px" color="green"></v-card>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-list two-line subheader class="ml-n8">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle
                              >21 mayo, 2021</v-list-item-subtitle
                            >
                            <v-list-item-title
                              >Docena Manzanas</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Supermercado Besw</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col cols="12" md="2">
                      <v-card height="80px" width="10px" color="red"></v-card>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-list two-line subheader class="ml-n8">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle
                              >10 Junio, 2021</v-list-item-subtitle
                            >
                            <v-list-item-title>Unidad Piña</v-list-item-title>
                            <v-list-item-subtitle
                              >Supermercado Besw</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col cols="12" md="2">
                      <v-card height="80px" width="10px" color="grey"></v-card>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-list two-line subheader class="ml-n8">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle
                              >22 Junio, 2021</v-list-item-subtitle
                            >
                            <v-list-item-title
                              >Unidad de Duraznos</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Supermercado Besw</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-flex>
            <v-flex>
              <v-list class="mt-5">
                <v-list-item>
                  <v-list-item-title class="cyan--text text--darken-1"
                    >Health Curve</v-list-item-title
                  >
                  <v-item-content>
                    <v-btn class="mr-1" outlined color="cyan darken-1">D</v-btn>
                  </v-item-content>
                  <v-item-content>
                    <v-btn class="mr-1" outlined color="cyan darken-1">W</v-btn>
                  </v-item-content>
                  <v-item-content>
                    <v-btn class="mr-1" outlined color="cyan darken-1">M</v-btn>
                  </v-item-content>
                  <v-item-content>
                    <v-btn outlined color="cyan darken-1">Y</v-btn>
                  </v-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex>
              <v-sparkline
                :value="value"
                :gradient="medium"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :fill="fill"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
              ></v-sparkline>
            </v-flex>
            <v-flex class="mt-5">
              <v-list class="ml-5">
                <v-list-item>
                  <v-list-item-avatar
                    color="cyan darken-1"
                    size="20px"
                  ></v-list-item-avatar>
                  <v-list-item-title
                    >Calendario Del Supermercado</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex>
              <v-list class="center-ml-4">
                <v-list-item>
                  <v-list-item-title class="cyan--text text--darken-1"
                    >Tratamiento más cercano</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex class="ml-12">
              <v-row>
                <div>
                  <v-date-picker
                    v-model="date2"
                    :event-color="(date) => (date[9] % 2 ? 'red' : 'yellow')"
                    :events="functionEvents"
                  ></v-date-picker>
                </div>
              </v-row>
            </v-flex>
          </v-container>
        </v-app>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    arrayEvents: null,
    date2: new Date().toISOString().substr(0, 10),
  }),
  created() {
    console.log("Hola este es mi rol " + this.$store.state.rol);
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
  methods: {
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },
  },
};
</script>

<style scoped>
.rounded {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
</style>







