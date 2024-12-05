<template>
  <v-row class="mx-auto">
    <v-card class="pa-6 rounded-xxl my-5 " max-width="800">
      <v-card-title class="headline d-flex justify-center">
        <v-avatar size="40">
          <v-icon>
            mdi-account-plus
          </v-icon>
        </v-avatar>
        Registrate
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="email"
            type="email"
            maxlength="100"
            :rules="necesario"
            label="Correo Institucional"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />

          <v-text-field
            v-model="nua"
            :rules="necesario"
            maxlength="6"
            label="NUA"
            :error-messages="ErrorC"
            @keydown="restrictCharacters"
          />

          <v-text-field
            v-model="nombre"
            :rules="necesario"
            maxlength="20"
            label="Nombre"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharactersName"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="ape_pat"
                maxlength="20"
                :rules="necesario"
                label="Apellido Paterno"
                class="w-50"
                :error-messages="ErrorSC"
                @keydown="restrictSpecialCharactersName"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ape_mat"
                maxlength="20"
                label="Apellido Materno"
                class="w-50"
                :error-messages="ErrorSC"
                @keydown="restrictSpecialCharactersName"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="password"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Contraseña"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />
          <v-row class="my-3">
            <v-col cols="6">
              <v-btn
                class="mt-2"
                block
                :class="{ 'selected-btn': usu_tipo === 'estudiante_comun' }"
                @click="toggleUsuTipo('estudiante_comun')"
              >
                Pasajero
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mt-2"
                block
                :class="{ 'selected-btn': usu_tipo === 'estudiante_con_vehiculo' }"
                @click="toggleUsuTipo('estudiante_con_vehiculo')"
              >
                Conductor
              </v-btn>
            </v-col>
          </v-row>

          <v-btn class="mt-2" color="#5164A9" block @click="Agregar_usuario()">
            Continuar
          </v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'login',
  data: () => ({
    email: '',
    nua: '',
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    password: '',
    usu_tipo: '',
    ErrorSC: '',
    ErrorC: '',
    necesario: [
      (value) => {
        if (value?.length > 0) { return true }

        return 'Rellena el campo obligatorio.'
      }
    ],
    passwords: [
      (value) => {
        if (value?.length > 7) { return true }

        return 'La contraseña debe contener mas de 8 caracteres.'
      }
    ]
  }),
  methods: {
    toggleUsuTipo (newTipo) {
      // Cambiar el valor de usu_tipo según el botón presionado
      this.usu_tipo = newTipo
      // console.log('Tipo de usuario seleccionado:', this.usu_tipo)
    },
    async Agregar_usuario () {
      const NUA = this.nua
      try {
        await axios.post('http://localhost:4000/api/usuarios/', {
          Usu_NUA: this.nua,
          Usu_Nombre: this.nombre,
          Usu_Apellido_Paterno: this.ape_pat,
          Usu_Apellido_Materno: this.ape_mat,
          Usu_Correo: this.email,
          Usu_Password: this.password,
          Usu_Tipo: this.usu_tipo
        })
        if (this.usu_tipo === 'estudiante_con_vehiculo') {
          this.$router.push({
            path: '/reg_vehiculo/',
            query: { NUA }
          }) // redireccionamiento
        } else {
          this.$router.push({
            path: '/'
            // query: { NUA }
          }) // redireccionamiento
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
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
    restrictSpecialCharactersName (event) {
      // expresion regular que restringe caracteres especiales excepto la ñ
      const regex = /[^A-Za-z0-9ñÑ@._ ]/g
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
/* Aumenta la especificidad para sobreescribir estilos de Vuetify */
.v-btn.selected-btn {
  background-color: #5164A9 !important;
  color: white !important;
  opacity: 0.8;
}
</style>
