<template>
  <!--<h1>Pagina del registro del vehiculo</h1>-->
  <v-row class="mx-auto">
    <v-card class="pa-6 rounded-xxl my-5 " max-width="800">
      <v-card-title class="headline d-flex justify-center">
        Registrar un Vehiculo
      </v-card-title>
      <v-row>
        <v-col>
          <v-card-text>
            <!--Columna1-->
            <p>
              <v-text-field
                v-model="car_anio"
                type="number"
                :rules="[() => validarRango(car_anio, 1990, 2025)]"
                label="Año de creación del vehiculo"
                min="1990"
                max="2025"
              />
            </p>
            <!--<p>
              <v-text-field
                v-model="userInput2"
                type="text"
                :rules="necesario"
                maxlength="17"
                label="Número de identificación del vehiculo"
              />
            </p>-->
            <p>
              <v-text-field
                v-model="car_capacidad"
                type="number"
                :rules="[() => validarRango(car_capacidad, 2, 9)]"
                label="Capacidad máxima del vehiculo"
                min="2"
                max="9"
              />
            </p>
            <p>
              <v-select
                v-model="car_modelo"
                :items="Modelos"
                label="Modelo del vehículo"
                placeholder="Selecciona un modelo"
              />
            </p>
            <p>
              <v-text-field
                v-model="car_color"
                type="text"
                :rules="necesario"
                maxlength="30"
                label="Color del Vehiculo"
              />
            </p>
            <p>
              <v-text-field
                v-model="car_placas"
                type="text"
                :rules="necesario"
                maxlength="20"
                label="Placas del Vehiculo"
              />
            </p>
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-text>
            <!--Columna2-->
            <p>
              <v-text-field
                v-model="car_usu_nua"
                type="text"
                :rules="necesario"
                maxlength="6"
                label="NUA del Conductor"
                append-icon="mdi-lock"
                class="red--text text--lighten-2"
                readonly
              />
            </p>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="mt-2"
                @click="Agregar_vehiculo()"
              >
                Confirmar Registro
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'login',
  data () {
    return {
      necesario: [
        (value) => {
          if (value?.length > 0) { return true }

          return 'Rellena el campo obligatorio.'
        }
      ], // id, nua, modelo, año, placas, capacidad, color
      car_anio: '', // Inicialmente vacío //Año de creacion del vehiculo
      // userInput2: '', // ID del vehiculo
      car_capacidad: '', // Capacidad Maxima del vehiculo
      car_modelo: '', // Modelo del vehiculo
      Modelos: [// Lista de modelos
        'SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Pickup', 'Van', 'Minivan', 'Wagon'
      ],
      car_color: '', // Color del vehiculo
      car_placas: '', // PLACAS
      car_usu_nua: this.$route.query.NUA // NUA (Preeliminar)
    }
  },
  methods: {
    validarRango (value, min, max) {
      const intValue = parseInt(value)
      if (intValue >= min && intValue <= max) {
        return true
      }
      return `Ingresa un número entre ${min} y ${max}`
    },
    async Agregar_vehiculo () {
      try {
        await axios.post('http://localhost:4000/api/vehiculos/', {
          Car_Usu_NUA: this.car_usu_nua,
          Car_Modelo: this.car_modelo,
          Car_anio: this.car_anio,
          Car_Placas: this.car_placas,
          Car_Capacidad: this.car_capacidad,
          Car_Color: this.car_color
          /* Car_Usu_NUA: '148114',
          Car_Modelo: 'Venture',
          Car_anio: '2019',
          Car_Placas: '45512',
          Car_Capacidad: '5',
          Car_Color: 'Morado' */
        })
        /* (this.car_usu_nua = ''), (this.car_modelo = ''), (this.car_anio = ''),
        (this.car_placas = ''), (this.car_capacidad = ''), (this.car_color = '') */
        // this.$router.push('/principal') // redireccionamiento
        this.$router.push('/') // redireccionamiento
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }
}

</script>
