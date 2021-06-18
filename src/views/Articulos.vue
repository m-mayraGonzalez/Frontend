<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="articulos"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Artículos</v-toolbar-title>
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
                          v-model="editedItem.codigo"
                          label="Código"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="categoria"
                          :items="categorias"
                          label="Categoría"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="Stock"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.precioVenta"
                          label="Precio Venta"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripción"
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
      select: null,
      categoria:[],
      categorias:[],
      articulos: [],
      dialog: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Código", value: "codigo" },
        { text: "Categoría", value: "categoria.nombre" },
        { text: "Stock", value: "stock" },
        { text: "Precio Venta", value: "precioVenta" },
        { text: "Descripcion", value: "descripcion" },
        { text: "Estado", value: "estado" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedItem: {
        nombre: "",
        categoria: 0,
        stock: 0,
        precioVenta: 0,
        descripcion: 0,
        estado: 0,
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
    this.selectCategorias();
    
  },
  methods: {
    listar() {
      const me = this;
      axios
        .get(`articulos`, me.$store.getters.header)
        .then(function (response) {
          me.articulos = response.data.articulos;
        })
        .catch();
    },
    limpiar() {
      this.id = "";
      this.nombre = "";
      this.descripcion = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre del Artículo debe tener entre 1-50 caracteres."
        );
      }
      if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción del Artículo no debe tener más de 255 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    selectCategorias() {
      let me = this;
      let categoriaArray = [];
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .get("categoria", header)
        .then(function (response) {
          categoriaArray = response.data.categoria;
          categoriaArray.map(function (x) {
            me.categorias.push({ text: x.nombre, value: x._id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    guardar() {
      if (this.x == 0) {
        console.log("Estoy guardando" + this.x);
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .post(
            "articulos",
            {
              nombre: me.editedItem.nombre,
              codigo: me.editedItem.codigo,
              categoria: me.categoria,
              stock: me.editedItem.stock,
              precioVenta: me.editedItem.precioVenta,
              descripcion: me.editedItem.descripcion,
              estado: me.editedItem.estado,
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
            `articulos/${me.id}`,
            {
              nombre: me.editedItem.nombre,
              categoria: me.editedItem.categoria,
              stock: me.editedItem.stock,
              precioVenta: me.editedItem.precioVenta,
              descripcion: me.editedItem.descripcion,
              estado: me.editedItem.estado,
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
        { title: "nombre", dataKey: "nombre" },
        { title: "categoria", dataKey: "categoria" },
        { title: "stock", dataKey: "stock" },
        { title: "precioVenta", dataKey: "precioVenta" },
        { title: "descripcion", dataKey: "descripcion" },
        { title: "estado", dataKey: "estado" },
      ];
      var rows = [];

      this.articulos.map(function (x) {
        rows.push({
          nombre: x.nombre,
          categoria: x.categoria,
          stock: x.stock,
          precioVenta: x.precioVenta,
          descripcion: x.descripcion,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Artículos", 40, 30);
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
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `articulos/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (accion == 1) {
        console.log(id);
        let me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `articulos/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listar();
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
        .put(`articulos/activar/${me.Id}`, {}, header)
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
        .put(`articulos/desactivar/${me.Id}`, {}, header)
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
      axios.delete(`articulos/${me._id}`, this.headers).then((datos) => {
        console.log(datos);
      });
    },
  },
};
</script>

