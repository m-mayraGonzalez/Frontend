<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="persona"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Proveedores</v-toolbar-title>
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
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tipoPersona"
                          label="Tipo de Persona"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tipoDocumento"
                          label="tipo de Documento"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numDocumento"
                          label="Número de Documento"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.direccion"
                          label="Dirección"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.estado"
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
            <v-dialog v-model="dialogDelete" max-width="300px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Guardar</v-btn
                  >
                  <v-spacer></v-spacer>
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
      persona: [],
      dialog: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Tipo Persona", value: "tipoPersona" },
        { text: "Tipo Documneto", value: "tipoDocumento" },
        { text: "Número Documento", value: "numDocumento" },
        { text: "Dirección", value: "direccion" },
        { text: "E-mail", value: "email" },
        { text: "Estado", value: "estado" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedItem: {
        nombre: "",
        tipoPersona: 0,
        tipoDocumento: 0,
        numDocumento: 0,
        direccion: 0,
        email: 0,
        estado: 0,
      },
    };
  },
  computed: {
    titulo() {
      return this.x == 0 ? "Nuevo" : "Editar";
    },
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      const me = this;
      axios
        .get(`persona`, me.$store.getters.header)
        .then(function (response) {
          me.persona = response.data.persona;
        })
        .catch();
    },
    guardar() {
      if (this.x == 0) {
        console.log("Estoy Guardando" + this.x);
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .post(
            "persona",
            {
              nombre: this.editedItem.nombre,
              tipoPersona: this.editedItem.tipoPersona,
              tipoDocumento: this.editedItem.tipoDocumento,
              numDocumento: this.editedItem.numDocumento,
              direccion: this.editedItem.direccion,
              email: this.editedItem.email,
              estado: this.editedItem.estado,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.listar();
            this.dialog = false;
          })
          .catch(function (error) {
            console.log(error.response);
          });
      } else {
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .put(
            `persona/${me.id}`,
            {
              nombre: this.editedItem.nombre,
              tipoPersona: this.editedItem.tipoPersona,
              numDocumento: this.editedItem.numDocumento,
              direccion: this.editedItem.direccion,
              email: this.editedItem.email,
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
        { title: "Nombre", dataKey: "nombre" },
        { title: "tipoPersona", dataKey: "tipoPersona" },
        { title: "tipoDocumento", dataKey: "tipoDocumento" },
        { title: "direccion", dataKey: "direccion" },
        { title: "email", dataKey: "email" },
      ];
      var rows = [];

      this.persona.map(function (x) {
        rows.push({
          nombre: x.nombre,
          tipoPersona: x.tipoPersona,
          tipoDocumento: x.tipoDocumento,
          direccion: x.direccion,
          email: x.email,
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Clientes", 40, 30);
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
            `persona/desactivar/${id}`,
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
            `persona/activar/${id}`,
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
  },
};
</script>