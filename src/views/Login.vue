<template>
  <v-app id="inspire">
    <br />
    <br />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Acceso al Sistema
                        </h1>
                        <v-form>
                          <v-text-field
                            v-model="usuario.email"
                            label="Email"
                            name="Email"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            v-model="usuario.password"
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          @click="inicioSesion"
                          dark
                          >Iniciar Sesión</v-btn
                        >
                      </div>
                      <br />
                      <br />
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3"> </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <br />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data: () => ({
    step: 1,
    usuario: {
      email: null,
      password: null,
    },
  }),
  props: {
    source: String,
  },
  methods: {
    inicioSesion() {
      const me = this;
      axios
        .post(`usuario/login`, {
          email: me.usuario.email,
          password: me.usuario.password,
        })
        .then(function (response) {
          console.log(response.data.usuario.rol)
          me.$store.dispatch("setToken", response.data);
          console.log(me.$store.state.token)
          me.$store.dispatch('setRol', response.data.usuario.rol)
          me.$router.push("/");
        })
        .catch(function ({ response }) {
          console.log(response.data.msg);
          Swal.fire ({
            icon: "error",
            title: "G-mail y Password Incorrectos",
            text: "Password Incorrecto",
            footer: "<a href>Vuelve a Intentarlo</a>",
          });
        });
    },
  },
};
</script>
