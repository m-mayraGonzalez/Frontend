<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="compras"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Ingresos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="teal accent-3"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    editedItem = {};
                    x = 0;
                  "
                >
                  Nuevo
                </v-btn>
                <v-btn
                  color="teal accent-3"
                  class="mb-2"
                  dark
                  @click="crearPDF()"
                  >Imprimir</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ titulo }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.usuario"
                          label="Usuario"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.persona"
                          label="Persona"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tipoComprobante"
                          label="Tipo Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.serieComprobante"
                          label="Serie Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numComprobante"
                          label="Número Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.impuesto"
                          label="Impuesto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.total"
                          label="Total"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.state"
                          label="Estado"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="guardar">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="Modal" max-width="290">
              <v-card>
                <v-card-title class="headline" v-if="Accion == 1">
                  Activar Item
                </v-card-title>
                <v-card-title class="headline" v-if="Accion == 2">
                  Desactivar Item
                </v-card-title>
                <v-card-text>
                  Estás a punto de <span v-if="Accion == 1">activar </span>
                  <span v-if="Accion == 2">desactivar </span> el item
                  {{ Nombre }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="activarDesactivarCerrar()"
                    color="primary"
                    flat="flat"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    v-if="Accion == 1"
                    @click="activar()"
                    color="primary"
                    flat="flat"
                  >
                    Activar
                  </v-btn>
                  <v-btn
                    v-if="Accion == 2"
                    @click="desactivar()"
                    color="primary"
                    flat="flat"
                  >
                    Desactivar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="ModalEliminar" max-width="290">
              <v-card>
                <v-card-title class="headline"> Eliminar Item </v-card-title>
                <v-card-text>
                  Estás a punto de eliminar el item <v-spacer></v-spacer>
                  {{ Nombre }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="DeleteCerrar()" color="primary" flat="flat">
                    Cancelar
                  </v-btn>
                  <v-btn @click="eliminar()" color="primary" flat="flat">
                    Eliminar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.opciones`]="{ item }">
          <v-icon
            color="teal accent-3"
            small
            class="mr-2"
            @click="editar(item)"
          >
            mdi-pencil
          </v-icon>
          <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2, item)">
              mdi-block-helper
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1, item)">
              mdi-check
            </v-icon>
          </template>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <div v-if="item.estado">
            <span class="blue--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      x: 0,
      compras: [],
      dialog: false,
      headers: [
        {
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Usuario", value: "usuario.nombre" },
        { text: "Persona", value: "persona.nombre" },
        { text: "Tipo Comprobante", value: "tipoComprobante" },
        { text: "Serie Comprobante", value: "serieComprobante" },
        { text: "Número Comprobante", value: "numComprobante" },
        { text: "Impuesto", value: "impuesto" },
        { text: "Total", value: "total" },
        { text: "Estado", value: "state" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedItem: {
        usuario: 0,
        persona: 0,
        tipoComprobante: 0,
        serieComprobante: 0,
        numComprobante: 0,
        impuesto: 0,
        total: 0,
        state: 0,
      },
    };
  },
  computed: {
    titulo() {
      return this.x == 0 ? "Nuevo" : "Editar";
    },
  },
  watch: {
    dialog(val) {
      val || this.cerrar();
    },
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      const me = this;
      axios
        .get(`compras`, me.$store.getters.header)
        .then(function (response) {
          me.compras = response.data.compras;
        })
        .catch();
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre de Ingresos debe tener entre 1-30 caracteres."
        );
      }
      if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción de Ingresos no debe tener más de 255 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      if (this.x == 0) {
        console.log("Estoy guardando" + this.x);
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .post(
            "compras",
            {
              usuario: me.editedItem.usuario,
              persona: me.editedItem.persona,
              tipoComprobante: me.editedItem.tipoComprobante,
              serieComprobante: me.editedItem.serieComprobante,
              numComprobante: me.editedItem.numComprobante,
              impuesto: me.editedItem.impuesto,
              total: me.editedItem.total,
              state: me.editedItem.state,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.listar();
            this.dialog = false;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .put(
            `compras/${me.id}`,
            {
              usuario: me.editedItem.usuario,
              persona: me.editedItem.persona,
              tipoComprobante: me.editedItem.tipoComprobante,
              serieComprobante: me.editedItem.serieComprobante,
              numComprobante: me.editedItem.numComprobante,
              impuesto: me.editedItem.impuesto,
              total: me.editedItem.total,
              state: me.editedItem.state,
            },
            header
          )
          .then(function () {
            me.listar();
            me.dialog = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editar(item) {
      this.x = 1;
      console.log(item);
      this.id = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    crearPDF() {
      var columns = [
        { title: "usuario", dataKey: "usuario" },
        { title: "Persona", dataKey: "Persona" },
        { title: "tipoComprobante", dataKey: "tipoComprobante" },
        { title: "serieComprobante", dataKey: "serieComprobante" },
        { title: "numComprobante", dataKey: "numComprobante" },
        { title: "impuesto", dataKey: "impuesto" },
        { title: "total", dataKey: "total" },
        { title: "state", dataKey: "state" },
      ];
      var rows = [];

      this.compras.map(function (x) {
        rows.push({
          usuario: x.usuario,
          persona: x.persona,
          tipoComprobante: x.tipoComprobante,
          serieComprobante: x.serieComprobante,
          numComprobante: x.numComprobante,
          impuesto: x.impuesto,
          total: x.total,
          state: x.state
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de ingresos", 40, 30);
        },
      });

      doc.save("Articulos.pdf");
    },
    activarDesactivarMostrar(accion, item) {
      let id = item._id;
      console.log(accion);
      if (accion == 2) {
        console.log(id);
        let me = this;
        let header = { headers: { "token": this.$store.state.token } };
        axios
          .put(
            `compras/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listar();
            console.log("Hola")
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (accion == 1) {
        console.log(id);
        let me = this;
        let header = { headers: { "token": this.$store.state.token } };
        axios
          .put(
            `compras/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listar();
            console.log("Bienvenido")
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    DeleteCerrar() {
      this.ModalEliminar = 0;
    },
    activar() {
      let me = this;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .put(`compras/activar/${me.Id}`, {}, header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .put(`compras/desactivar/${me.Id}`, {}, header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cerrar() {
      this.dialog = false;
    },
    deleteItem(item) {
      this.ModalEliminar = 1;
      this.Nombre = item.nombre;
      this.Id = item._id;
    },
    eliminar() {
      var me = {
        id: this.id,
        token: this.$store.state.token,
      };
      axios.delete(`compras/${me._id}`, this.headers).then((datos) => {
        console.log(datos);
      });
    },
  },
};
</script>