<template>
  <v-row class="d-flex justify-center">
    <v-card class="pa-6 rounded-xxl my-5" max-width="800">
      <v-card-title class="headline d-flex justify-center">
        <v-avatar size="40">
          <v-icon>
            mdi-car
          </v-icon>
        </v-avatar>
        Ver Vehiculo
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-card-text>
          <v-btn
            block
            class="mt-2 mb-3 fuente"
            elevation="2"
            append-icon="mdi-keyboard-return"
            @click="regresar()"
          >
            Regresar
          </v-btn>
          <v-text-field
            v-model="car_usu_nua"
            type="text"
            :rules="necesario"
            maxlength="6"
            label="NUA del Conductor"
            append-icon="mdi-account-lock"
            class="red--text text--lighten-2 fuente"
            readonly
          />
          <v-text-field
            v-model="car_anio"
            type="number"
            :rules="[() => validarRango(car_anio, 1990, 2025)]"
            class="fuente"
            label="Año de creación del vehiculo"
            min="1990"
            max="2025"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorC"
            @keydown="restrictCharacters"
          />
          <!--<v-text-field
          v-model="userInput2"
          type="text"
          :rules="necesario"
          maxlength="17"
          label="Número de identificación del vehiculo"
        /> -->
          <v-text-field
            v-model="car_capacidad"
            type="number"
            :rules="[() => validarRango(car_capacidad, 2, 9)]"
            class="fuente"
            label="Capacidad máxima del vehiculo"
            min="2"
            max="9"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorC"
            @keydown="restrictCharacters"
          />
          <v-select
            v-model="car_modelo"
            :items="Modelos"
            label="Modelo del vehículo"
            class="fuente"
            placeholder="Selecciona un modelo"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />
          <v-text-field
            v-model="car_color"
            type="text"
            :rules="necesario"
            maxlength="30"
            class="fuente"
            label="Color del Vehiculo"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />
          <v-text-field
            v-model="car_placas"
            type="text"
            :rules="necesario"
            maxlength="20"
            class="fuente"
            label="Placas del Vehiculo"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn
                v-if="btn_habilitar"
                rounded
                x-large
                elevation="1"
                color="yellow"
                class="fuente"
                style="color: black;"
                @click="habilitar_editar()"
              >
                Editar
              </v-btn>
              <v-btn
                v-if="btn_cancelar"
                rounded
                x-medium
                elevation="1"
                color="red"
                class="fuente"
                style="color: black;"
                @click="cancelar()"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                v-if="btn_borrar"
                rounded
                x-large
                elevation="1"
                color="red"
                class="fuente"
                style="color: black;"
                @click="mostrarpopup = true"
              >
                Borrar
              </v-btn>
              <v-btn
                v-if="btn_editar"
                rounded
                x-medium
                elevation="1"
                color="green"
                class="fuente"
                style="color: black;"
                @click="editar_vehiculo()"
              >
                Confirmar
              </v-btn>
            </v-col>
            <div v-if="mostrarpopup" class="popup">
              <v-card class="contenido-popup">
                <v-card-title class="fuente">
                  Esta accion no se puede revertir!
                </v-card-title>
                <v-btn
                  rounded
                  x-medium
                  elevation="1"
                  color="red"
                  class="fuente"
                  @click="mostrarpopup = false, borrar_vehiculo()"
                >
                  Borrar
                </v-btn>
                <v-btn
                  rounded
                  x-medium
                  elevation="1"
                  class="fuente"
                  @click="mostrarpopup = false"
                >
                  Cancelar
                </v-btn>
              </v-card>
            </div>
          </v-row>
        </v-card-actions>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      necesario: [
        (value) => {
          if (value?.length > 0) { return true }

          return 'Rellena el campo obligatorio.'
        }
      ],
      car_anio: '',
      car_capacidad: '',
      car_modelo: '',
      Modelos: [
        'SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Pickup', 'Van', 'Minivan', 'Wagon'
      ],
      car_color: '',
      car_placas: '',
      car_usu_nua: this.$route.query.NUA,
      btn_borrar: true,
      btn_editar: false,
      btn_habilitar: true,
      btn_cancelar: false,
      mostrarpopup: false,
      isReadOnly: true,
      icono: 'mdi-lock',
      car_id: '',
      ErrorSC: '',
      ErrorC: ''
    }
  },
  created () {
    this.car_usu_nua = this.$route.query.NUA
    this.Vehiculo_id()
  },
  methods: {
    habilitar_editar () {
      this.btn_habilitar = false
      this.btn_cancelar = true
      this.isReadOnly = false
      this.btn_borrar = false
      this.btn_editar = true
      this.icono = 'mdi-unlocked-outline'
    },
    cancelar () {
      this.btn_habilitar = true
      this.btn_cancelar = false
      this.isReadOnly = true
      this.btn_habilitar = true
      this.btn_borrar = true
      this.btn_editar = false
      this.icono = 'mdi-lock'
      this.Vehiculo_id() // recuperamos los datos por si se hicieron algunos cambios sin guardar
    },
    validarRango (value, min, max) {
      const intValue = parseInt(value)
      if (intValue >= min && intValue <= max) {
        return true
      }
      return `Ingresa un número entre ${min} y ${max}`
    },
    async Vehiculo_id () {
      try {
        const respuesta = await axios.get(
        `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`
        )
        this.car_modelo = respuesta.data.body[0].Car_Modelo
        this.car_anio = respuesta.data.body[0].Car_anio
        this.car_placas = respuesta.data.body[0].Car_Placas
        this.car_capacidad = respuesta.data.body[0].Car_Capacidad
        this.car_color = respuesta.data.body[0].Car_Color
        this.car_id = respuesta.data.body[0].Car_id
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        const NUA = this.car_usu_nua
        this.$router.push({
          path: '/reg_vehiculo/',
          query: { NUA }
        }) // redireccionamiento si no tienes vehiculo.
      }
    },
    regresar () {
      const NUA = this.car_usu_nua
      this.$router.push({
        path: '/principal/ver_cuenta/',
        query: { NUA }
      }) // redireccionamiento
    },
    async editar_vehiculo () {
      this.btn_habilitar = true
      this.btn_cancelar = false
      this.isReadOnly = true
      this.btn_habilitar = true
      this.btn_borrar = true
      this.btn_editar = false
      this.icono = 'mdi-lock'
      try {
        await axios.put(
          `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`, {
            Car_Modelo: this.car_modelo,
            Car_anio: this.car_anio,
            Car_Placas: this.car_placas,
            Car_Capacidad: this.car_capacidad,
            Car_Color: this.car_color,
            Car_id: this.car_id
          }
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      this.Vehiculo_id()
    },
    async borrar_vehiculo () {
      const NUA = this.car_usu_nua
      try {
        await axios.delete(
          `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      this.$router.push({
        path: '/principal/ver_cuenta/',
        query: { NUA }
      }) // redireccionamiento
    },
    restrictSpecialCharacters (event) {
      // expresion regular que restringe caracteres especiales excepto la ñ
      const regex = /[^A-Za-z0-9ñÑ@._]/g
      if (regex.test(event.key)) {
        event.preventDefault()
        this.ErrorSC = 'No se permiten los caracteres especiales'
      } else {
        this.ErrorSC = ''
      }
    },
    restrictCharacters (event) {
      // expresion regular que restringe a solo numeros
      const regex = /[^0-9]/g
      if (regex.test(event.key) &&
          event.keyCode !== 8 &&
          event.keyCode !== 13 &&
          event.keyCode !== 16 &&
          event.keyCode !== 9 &&
          event.keyCode !== 37 &&
          event.keyCode !== 39) {
        event.preventDefault()
        this.ErrorC = 'Solo se permiten numeros'
      } else {
        this.ErrorC = ''
      }
    }
  }
}

</script>

<style scoped>
.popup {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.contenido-popup {
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 20px;
  width: 25%;
}
</style>
