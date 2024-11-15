<template>
  <v-row>
    <v-col cols="7">
      <v-container grid-list-xs class="cards-scroll">
        <v-card-title primary-title class="text-h4 font-weight-bold">
          Crear nuevo viaje
        </v-card-title>
        <v-container grid-list-xs>
          <p class="text-disabled" style="color: #717171;">
            Viajar juntos es más divertido. ¡Únete a la comunidad! Completa el formulario para empezar tu viaje.
          </p>
        </v-container>
        <!-- Card origen y destino -->
        <v-container>
          <v-card class="py-4 px-4">
            <v-row align-center justify="center">
              <v-col cols="5" class="d-flex justify-center flex-column align-center">
                <v-select
                  v-model="origen"
                  :items="municipios"
                  label="Origen"
                  item-text="nombre"
                  item-value="nombre"
                  outlined
                  item-color="blue"
                  class="rounded-xl"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon>mdi-car-arrow-right</v-icon>
              </v-col>
              <v-col cols="5" class="d-flex justify-center">
                <v-select
                  v-model="destino"
                  :items="municipios"
                  label="Destino"
                  item-text="nombre"
                  item-value="nombre"
                  outlined
                  item-color="blue"
                  class="rounded-xl"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <!-- Hora y fecha -->
        <v-container>
          <v-card class="py-4 px-4">
            <v-row class="d-flex">
              <v-col col="5">
                <v-text-field
                  v-model="fecha"
                  label="Fecha de salida"
                  type="date"
                  outlined
                  class="fecha-select rounded-xl"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center">
                y
              </v-col>
              <v-col col="5">
                <v-text-field
                  v-model="hora"
                  label="Hora de salida"
                  type="time"
                  outlined
                  class="rounded-xl"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Punto de encuentro -->
        <v-container grid-list-xs>
          <v-card class="py-2">
            <v-card-title primary-title class="px-6">
              Puntos de encuentro
            </v-card-title>
            <v-card-text class="px-6 text-justify">
              Indica claramente los puntos de encuentro, paradas o lugares donde podrás recoger o dejar a tus compañeros de viaje. Ejemplo: Oxxo junto a la central de autobuses de Salamanca.
            </v-card-text>
            <v-card class="rounded-lg my-6 h-75 ma-5 px-6">
              <v-textarea v-model="punto_encuentro" type="text" maxlength="255" label="Punto de encuentro" />
            </v-card>
          </v-card>
        </v-container>
        <!-- Numero de espacios disponibles -->
        <v-container grid-list-xs>
          <v-card>
            <v-row style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; align-content: center;">
              <v-col cols="2 d-flex justify-end">
                <v-icon>mdi-account-group</v-icon>
              </v-col>
              <v-col cols="6 d-flex justify-start">
                <v-card-text>
                  Número de espacios disponibles:
                </v-card-text>
              </v-col>
              <v-col cols="4" class="mr-4 d-flex justify">
                <v-select
                  v-model="espacios_disponibles"
                  :items="nEspacios"
                  label="Cantidad"
                  item-text="espacio"
                  item-value="espacio"
                  outlined
                  class="rounded-xl d-flex justify-center align-center align-self-center"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Card costo del viaje -->
        <v-container grid-list-xs class="mt-4">
          <v-form fast-fail @submit.prevent>
            <v-card>
              <v-row style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; align-content: center;">
                <v-col cols="2 d-flex justify-end">
                  <v-icon>mdi-cash</v-icon>
                </v-col>
                <v-col cols="6 d-flex justify-start">
                  <v-card-text type="money">
                    Costo del viaje por pasajero:
                  </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card class="px-4 mx-4 rounded-xl">
                    <v-text-field
                      v-model="costo_viaje"
                      type="number"
                      maxlength="4"
                      prefix="$"
                      :rules="necesario"
                      label="MXN"
                      variant="outlined"
                      @keydown="restrictCharacters"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-container>
        <!-- Boton de crear viaje -->
        <v-container grid-list-xs class="d-flex justify-center mt-6">
          <v-btn
            color="#A2E38C"
            class="rounded-xl"
            width="80%"
            height="50px"
            style="color: black;"
            @click="crearViaje()"
          >
            ¡Crear viaje!
          </v-btn>
        </v-container>
        <!-- Snackbar -->
        <v-snackbar
          v-model="snackbar"
          color="success"
          :timeout="3000"
        >
          ¡Viaje registrado con éxito!
        </v-snackbar>
        <!-- ... -->
      </v-container>
    </v-col>
    <v-col cols="5">
      <v-card min-width class="car-news rounded-lg">
        <v-card-title class="new-title" style="color:white">
          ¡Objetos perdidos!
        </v-card-title>
        <v-card-subtitle class="new-info" style="color:white">
          ¿Encontraste algo que no es tuyo? Ayuda a tus compañeros a recuperar sus pertenencias. Ponte en contacto con los pasajeros de tu último viaje y devuelve lo que dejaron atrás. ¡Juntos hacemos la diferencia!
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'
export default {

  data () {
    return {
      snackbar: false,
      origen: null,
      destino: null,
      fecha: null,
      hora: null,
      punto_encuentro: null,
      espacios_disponibles: null,
      costo_viaje: null,
      nua: this.$route.query.NUA,
      nEspacios: [
        { espacio: '1' },
        { espacio: '2' },
        { espacio: '3' },
        { espacio: '4' }
      ],
      municipios: [
        { nombre: 'DICIS' },
        { nombre: 'Abasolo' },
        { nombre: 'Acámbaro' },
        { nombre: 'Apaseo el Alto' },
        { nombre: 'Apaseo el Grande' },
        { nombre: 'Atarjea' },
        { nombre: 'Celaya' },
        { nombre: 'Comonfort' },
        { nombre: 'Coroneo' },
        { nombre: 'Cortazar' },
        { nombre: 'Cuerámaro' },
        { nombre: 'Doctor Mora' },
        { nombre: 'Dolores Hidalgo' },
        { nombre: 'Guanajuato' },
        { nombre: 'Huanímaro' },
        { nombre: 'Irapuato' },
        { nombre: 'Jaral del Progreso' },
        { nombre: 'Jerécuaro' },
        { nombre: 'León' },
        { nombre: 'Moroleón' },
        { nombre: 'Ocampo' },
        { nombre: 'Pénjamo' },
        { nombre: 'Pueblo Nuevo' },
        { nombre: 'Purísima del Rincón' },
        { nombre: 'Romita' },
        { nombre: 'Salamanca' },
        { nombre: 'Salvatierra' },
        { nombre: 'San Diego de la Unión' },
        { nombre: 'San Felipe' },
        { nombre: 'San Francisco del Rincón' },
        { nombre: 'San José Iturbide' },
        { nombre: 'San Luis de la Paz' },
        { nombre: 'San Miguel de Allende' },
        { nombre: 'Santa Catarina' },
        { nombre: 'Santa Cruz de Juventino Rosas' },
        { nombre: 'Santiago Maravatío' },
        { nombre: 'Silao' },
        { nombre: 'Tarandacuao' },
        { nombre: 'Tarimoro' },
        { nombre: 'Tierra Blanca' },
        { nombre: 'Uriangato' },
        { nombre: 'Valle de Santiago' },
        { nombre: 'Victoria' },
        { nombre: 'Villagrán' },
        { nombre: 'Xichú' },
        { nombre: 'Yuriria' }
      ],
      necesario: [
        (value) => {
          if (value?.length > 0) { return true }

          return 'Es obligatorio llenar este campo'
        }
      ]
    }
  },

  methods: {
    async crearViaje () {
      // eslint-disable-next-line no-console
      console.log('Creando viaje...')
      if (this.origen === null || this.destino === null || this.fecha === null || this.hora === null || this.punto_encuentro === null || this.espacios_disponibles === null || this.costo_viaje === null) {
        // eslint-disable-next-line no-console
        console.log('Faltan campos por llenar')
      } else {
        try {
          await axios.post('http://localhost:4000/api/viajes/registrarViaje', {
            via_con_usu_NUA: this.nua,
            via_fecha_hora: this.fecha + ' ' + this.hora + ':00',
            via_origen: this.origen,
            via_destino: this.destino,
            via_lugares_pasada: this.punto_encuentro,
            via_esp_disp: this.espacios_disponibles,
            via_costo: this.costo_viaje
          })
          this.snackbar = true
          // resetear campos
          this.origen = null
          this.destino = null
          this.fecha = null
          this.hora = null
          this.punto_encuentro = null
          this.espacios_disponibles = null
          this.costo_viaje = null
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      }
    },
    mostrarTodoslosCampos () {
      // eslint-disable-next-line no-console
      console.log('Origen:', this.origen)
      // eslint-disable-next-line no-console
      console.log('Destino:', this.destino)
      // eslint-disable-next-line no-console
      console.log('Fecha:', this.fecha)
      // eslint-disable-next-line no-console
      console.log('Hora:', this.hora)
      // eslint-disable-next-line no-console
      console.log('union de fehc y hora', this.fecha + ' ' + this.hora + ':00')
      // eslint-disable-next-line no-console
      console.log('Punto de encuentro:', this.punto_encuentro)
      // eslint-disable-next-line no-console
      console.log('Espacios disponibles:', this.espacios_disponibles)
      // eslint-disable-next-line no-console
      console.log('Costo por viaje:', this.costo_viaje)
      // eslint-disable-next-line no-console
      console.log('NUA del usaurio por viaje:', this.nua)
    }
  }
}
</script>

<style>

.cards-scroll {
  overflow-y: auto;
  height: 720px;
}

.color_subtitle {
  color: #717171;
}
.mi-select .v-select__selections {
  border-radius: 18px;
  background-color: #151D27;
}

.mi-select .v-select__selections .v-select__selection--comma {
  color: #FFFFFF;
}

.fecha-select {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  align-content: center;
}

.car-news {
  background-image: url('./static/img_objetos.jpg');
  background-size: cover; /* Esto hará que la imagen de fondo cubra todo el v-card */
  background-position: center;
  /* border-radius: 24px; */
  height: 720px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
}

.card-style {
  background-color: #F6F6F8;
}

.select-style {
  background-color: #212529; /* Color de fondo oscuro */
  color: white; /* Color de texto blanco */
  border-radius: 25px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
}
.select-style .v-input__control {
  color: white !important;
}
.icon-style {
  font-size: 36px; /* Tamaño del icono */
  color: #212529; /* Color del icono */
}

</style>
