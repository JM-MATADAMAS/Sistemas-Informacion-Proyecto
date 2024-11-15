<template>
  <div>
    <v-row>
      <!-- Sección de búsqueda -->
      <v-col cols="6">
        <v-text-field>
          <template #prepend>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <!-- Viajes disponibles -->
        <v-card-title class="title-busqueda fuente" style="color: #717171;">
          viajes disponibles
        </v-card-title>
        <!-- Filtros -->
        <v-container>
          <!-- Lugares de origen y destino -->
          <v-row class="fuente">
            <v-col cols="6">
              <v-select
                v-model="origen"
                :items="municipios"
                label="Origen"
                item-text="nombre"
                item-value="nombre"
                outlined
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="destino"
                :items="municipios"
                label="Destino"
                item-text="nombre"
                item-value="nombre"
                outlined
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn
                height="40"
                min-width="100"
                class="btn-filter fuente"
                :color="fechaFiltro === 'hoy' ? 'primary' : undefined"
                @click="setFechaFiltro('hoy')"
              >
                Hoy
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                :ripple="false"
                height="40"
                min-width="100"
                class="btn-filter fuente"
                :color="fechaFiltro === 'mañana' ? 'primary' : undefined"
                @click="setFechaFiltro('mañana')"
              >
                Mañana
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="viajes.length < 1">
          <v-card elevation="0" class="mx-auto fuente" style="display: flex; justify-content: center;">
            <v-card-title style="font-weight: bold; font-size: xx-large;">
              No Hay raites
            </v-card-title>
          </v-card>
        </v-container>
        <!-- Contenedor de scroll -->
        <v-container class="cards-scroll">
          <!-- Viajes disponibles -->
          <v-container v-for="(viaje, index) in filteredViajes" :key="index">
            <v-card class="raite" :class="{ 'raite-selected': viaje.selected }" @click="VentanaReservas(viaje.via_id)">
              <v-col>
                <v-container>
                  <v-col style="display: flex;">
                    <v-icon color="white">
                      mdi-account-group
                    </v-icon>
                    <v-card-subtitle id="num-per-disponibles-raite" style="color: white;">
                      {{ viaje.espacio_disponible }}
                    </v-card-subtitle>
                    <v-icon color="white">
                      mdi-calendar-clock
                    </v-icon>
                    <v-card-subtitle id="hora-fecha-raite" style="color: white">
                      {{ formatFecha(viaje.fecha) }}
                    </v-card-subtitle>
                  </v-col>
                </v-container>
                <v-container class="raite-cont-title-price">
                  <v-row>
                    <v-col cols="4">
                      <v-card-title class="d-flex justify-center align-center" style="color: white">
                        {{ viaje.origen }}
                      </v-card-title>
                    </v-col>
                    <v-col cols="1" class="d-flex align-self-center">
                      <v-icon color="white" class="d-flex justify-center align-center">
                        mdi-arrow-right
                      </v-icon>
                    </v-col>
                    <v-col cols="4">
                      <v-card-title class="d-flex justify-center align-center align-self-center" style="color: white">
                        {{ viaje.destino }}
                      </v-card-title>
                    </v-col>
                    <v-col cols="3" class="raite-con-precio">
                      <v-card-subtitle class="raite-precio text-h4">
                        {{ '$' + viaje.costo }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-card>
          </v-container>
        </v-container>
      </v-col>
      <!-- Sección de card anuncios -->
      <v-col cols="6">
        <v-card min-width class="car-news">
          <v-card-title class="new-title" style="color:white">
            Recuerda usar tu cinturón
          </v-card-title>
          <v-card-subtitle class="new-info" style="color:white">
            Usar tu cinturón de seguridad cuando estés en el automóvil. No solo es una norma de seguridad vial, sino que también puede salvar vidas en caso de un accidente.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ventana emergente para reservar viaje -->
    <v-dialog v-model="mostrarVentanaReserva" max-width="600">
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-image: linear-gradient(135deg, #576cb9, #343c61);">
          Reservar Viaje
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid" @submit.prevent="agregar_reservas">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="usu_nua"
                    label="Tu NUA"
                    max-length="6"
                    readonly
                    required
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="num_asientos"
                    type="number"
                    :label="`Cantidad de asientos (Max: ${maxAsientos})`"
                    :rules="[asientosRule]"
                    required
                    outlined
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!formValid" color="primary" @click="agregar_reservas">
            Reservar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Nuevo diálogo de viaje reservado -->
    <v-dialog v-model="mostrarDialogoReservado" max-width="400">
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-image: linear-gradient(135deg, #576cb9, #343c61);">
          Viaje Reservado
        </v-card-title>
        <v-card-text>
          Tu viaje ha sido reservado con éxito.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="mostrarDialogoReservado = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      viajes: [],
      origen: null,
      destino: null,
      fechaFiltro: null,
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
        { nombre: 'Dolores Hidalgo Cuna de la Independencia Nacional' },
        { nombre: 'Guanajuato' },
        { nombre: 'Huanímaro' },
        { nombre: 'Irapuato' },
        { nombre: 'Jaral del Progreso' },
        { nombre: 'Jerécuaro' },
        { nombre: 'León' },
        { nombre: 'Manuel Doblado' },
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
        { nombre: 'Silao de la Victoria' },
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
      mostrarVentanaReserva: false,
      mostrarDialogoReservado: false, // Nueva variable de estado
      usu_nua: this.$route.query.NUA,
      num_asientos: '',
      viajeId: null,
      formValid: false // variable para controlar la validación del formulario
    }
  },
  computed: {
    filteredViajes () {
      const hoy = new Date()
      const manana = new Date()
      manana.setDate(manana.getDate() + 1)

      return this.viajes.filter((viaje) => {
        const fechaViaje = new Date(viaje.fecha)
        const filtroFecha = this.fechaFiltro === 'hoy'
          ? hoy.toDateString() === fechaViaje.toDateString()
          : this.fechaFiltro === 'mañana' ? manana.toDateString() === fechaViaje.toDateString() : true

        return (!this.origen || viaje.origen === this.origen) &&
              (!this.destino || viaje.destino === this.destino) &&
              filtroFecha
      })
    },
    maxAsientos () {
      const viajeSeleccionado = this.viajes.find(viaje => viaje.via_id === this.viajeId)
      return viajeSeleccionado ? viajeSeleccionado.espacio_disponible : 0
    },
    asientosRule () {
      return value => (value <= this.maxAsientos && value > 0) || `Máximo ${this.maxAsientos} asientos disponibles`
    }
  },
  async created () {
    await this.get_raites()
  },
  methods: {
    setFechaFiltro (filtro) {
      this.fechaFiltro = filtro
    },
    async get_raites () {
      try {
        const response = await axios.get('http://localhost:4000/api/viajes/todos')
        const body = response.data.body.filter(item => item.via_activo === 1)

        for (let i = 0; i < body.length; i++) {
          this.viajes.push({ via_id: body[i].via_Id, nua_conductor: body[i].via_con_usu_NUA, costo: body[i].via_costo, origen: body[i].via_origen, destino: body[i].via_destino, espacio_disponible: body[i].via_esp_disp, fecha: body[i].via_fecha_hora, descripcion: body[i].via_lugares_pasada })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    // eslint-disable-next-line require-await
    async VentanaReservas (viajeId) {
      try {
        this.viajeId = viajeId
        this.mostrarVentanaReserva = true

        // Optional: You can fetch the trip details again if necessary
        const viajeSeleccionado = this.viajes.find(viaje => viaje.via_id === viajeId)
        if (viajeSeleccionado) {
          // eslint-disable-next-line no-console
          console.log('Viaje seleccionado:', viajeSeleccionado)
        } else {
          // eslint-disable-next-line no-console
          console.log('No se encontró el viaje con el ID:', viajeId)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error al abrir la ventana de reservas:', error)
      }
    },
    async agregar_reservas () {
      try {
        const viajeSeleccionado = this.viajes.find(viaje => viaje.via_id === this.viajeId)

        if (viajeSeleccionado) {
          // Envía los datos al servidor, incluyendo el via_id
          await axios.post('http://localhost:4000/api/viajes/reservarViaje/', {
            Res_Usu_NUA: this.usu_nua,
            Res_via_id: this.viajeId,
            Res_Num_Asientos: this.num_asientos
          })

          // Cierra el diálogo de reserva y abre el nuevo diálogo
          this.mostrarVentanaReserva = false
          this.mostrarDialogoReservado = true
        } else {
          // eslint-disable-next-line no-console
          console.log('No se encontró el viaje con el ID:', this.viajeId)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error al realizar la reserva:', error)
      }
    },

    formatFecha (fecha) {
      const date = new Date(fecha)
      const day = ('0' + date.getDate()).slice(-2)
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const year = date.getFullYear()
      const hours = ('0' + date.getHours()).slice(-2)
      const minutes = ('0' + date.getMinutes()).slice(-2)
      return `${day}/${month}/${year} ${hours}:${minutes}`
    },

    reservar (viaId) {
      // eslint-disable-next-line no-console
      console.log(viaId)
      const url = 'http://localhost:4000/api/viajes/reservarViaje'
      const sendData = {
        Res_via_id: viaId, // Usamos el valor pasado como argumento
        Res_Usu_NUA: localStorage.getItem('NUA'),
        Res_Num_Asientos: 1
      }
      this.$axios.$post(url, sendData)
    }

  }
}
</script>

<style scoped>
/* Estilos mantenidos del código original */
template {
  font-size: 1.5em;
  background-color: aliceblue;
  color: white;
}
.title-busqueda {
  font-size: 2em;
  color: gre#717171;
}
.input-con-busqueda {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
}
.img_new {
  height: 10px;
  width: 30px;
}
.new_container {
  display: flex;
  height: 100%;
  width: auto;
  background-color: aquamarine;
}
.btn-filter {
  background-color: #387ED0;
  color: #717171;
  border-radius: 24px;
  border: 1px solid #717171;
}
.cards-scroll {
  overflow-y: auto;
  height: 500px;
}
.car-news {
  background-image: url('./static/img_cinturon.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  height: 720px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
}
.new-title {
  font-size: 2em;
  padding-left: 50px;
  padding-right: 50px;
}
.new-info {
  font-size: 1em;
  text-align: justify;
  line-height: 1.5;
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}
.raite {
  background: linear-gradient(to right, #060C10, #387ED0);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
.raite-cont-title-price {
  display: flex;
}
.raite-destino {
  display: flex;
}
.raite-con-precio {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  size: 1em;
}
.raite-precio {
  font-size: 1.5em;
  color: white;
}
.v-tab {
  border: 1px solid gray;
  background-color: #F0F0F0;
}
.raite-selected {
  border: 2px solid #FFA500;
}
</style>
