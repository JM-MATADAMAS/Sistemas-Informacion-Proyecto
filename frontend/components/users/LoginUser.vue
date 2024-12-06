<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-row class="d-flex align-center">
    <v-card class="pa-6 rounded-xxl my-5" max-width="800" style="background-image: url('E:/PROYECTO SI/Sistemas-Informacion-Proyecto-main/frontend//Background.pn');">
      <v-avatar size="80" class="mx-auto d-flex justify-center">
        <img
          src="../../static/logo.jpg"
          alt="Circular Image"
          style="border: 2px solid #343c61; max-height: 80px; max-width: 80px;"
        >
      </v-avatar>
      <v-card-title class="headline d-flex justify-center">
        {{ showRecovery ? "Recuperar Contraseña" : "Inicia Sesión" }}
      </v-card-title>
      <v-sheet class="mx-auto" width="400">
        <!-- Formulario de Inicio de Sesión -->
        <v-form v-if="!showRecovery" @submit.prevent="iniciar_sesion()">
          <v-text-field
            v-model="v_nua"
            type="text"
            maxlength="6"
            :rules="necesario"
            label="NUA"
            :error-messages="ErrorC"
            @keydown.enter="iniciarEnter()"
            @keydown="restrictCharacters"
          />
          <v-text-field
            v-model="password"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Contraseña"
            :error-messages="ErrorSC"
            @keydown.enter="iniciarEnter()"
            @keydown="restrictSpecialCharacters"
          />
          <v-btn class="mt-2" color="#5164A9" block style="color: white;" @click="iniciar_sesion()">
            Iniciar Sesión
          </v-btn>
          <p v-if="showText" class="red--text text--lighten-2">
            Error al iniciar sesión!
          </p>
          <p>¿No tienes una cuenta?</p>
          <v-btn class="mt-2" color="blue" block style="color: white;" @click="crear_cuenta()">
            Crea una aquí
          </v-btn>
          <v-btn class="mt-2" block outlined color="primary" @click="showRecovery = true">
            Recuperar Contraseña
          </v-btn>
        </v-form>
        <!-- Formulario de Recuperación de Contraseña -->
        <v-form v-else @submit.prevent="submitNewPassword()">
          <v-text-field
            v-model="v_nua"
            type="text"
            maxlength="6"
            :rules="necesario"
            label="NUA"
            :error-messages="ErrorC"
            @keydown.enter="iniciarEnter()"
            @keydown="restrictCharacters"
          />
          <v-text-field
            v-model="newPassword"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Nueva Contraseña"
            :error-messages="ErrorSC"
          />
          <v-btn class="mt-2" block color="primary" @click="submitNewPassword()">
            Guardar Contraseña
          </v-btn>
          <v-btn class="mt-2" block outlined color="secondary" @click="showRecovery = false">
            Regresar
          </v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    v_nua: '',
    password: '',
    newPassword: '',
    showRecovery: false,
    showText: false,
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
        return 'La contraseña debe contener más de 8 caracteres.'
      }
    ]
  }),
  methods: {
    async iniciar_sesion () {
      try {
        await axios.post('http://localhost:4000/api/usuarios/login', {
          Usu_NUA: this.v_nua,
          Usu_Password: this.password
        })

        if (this.v_nua === '' || this.password === '') {
          this.showText = true
        } else {
          const NUA = this.v_nua
          const tiempoVencimiento = 2 * 60 * 60 * 1000
          localStorage.setItem('NUA', NUA)
          setTimeout(() => {
            localStorage.removeItem('NUA')
          }, tiempoVencimiento)

          this.$router.push({
            path: '/principal/busqueda_raites/',
            query: { NUA }
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al iniciar sesión: ', error.response)
        this.showText = true
      }
    },
    async submitNewPassword () {
      try {
        // Hacer la solicitud con el id (Usu_NUA) en la URL
        await axios.post(`http://localhost:4000/api/usuarios/${this.v_nua}/reset_password`, {
          Usu_Password: this.newPassword // Solo se envía la nueva contraseña
        })
        alert('Contraseña actualizada correctamente.')
        this.showRecovery = false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al actualizar la contraseña: ', error.response)
        alert('Ocurrió un error al actualizar la contraseña.')
      }
    },
    crear_cuenta () {
      this.$router.push({
        path: '/reg_usuario/'
      })
    },
    iniciarEnter () {
      this.iniciar_sesion()
    },
    restrictSpecialCharacters (event) {
      const regex = /[^A-Za-z0-9ñÑ@._]/g
      if (regex.test(event.key)) {
        event.preventDefault()
        this.ErrorSC = 'No se permiten los caracteres especiales'
      } else {
        this.ErrorSC = ''
      }
    },
    restrictCharacters (event) {
      const regex = /[^0-9]/g
      if (regex.test(event.key) &&
          event.keyCode !== 8 &&
          event.keyCode !== 13 &&
          event.keyCode !== 16 &&
          event.keyCode !== 9 &&
          event.keyCode !== 37 &&
          event.keyCode !== 39) {
        event.preventDefault()
        this.ErrorC = 'Solo se permiten números'
      } else {
        this.ErrorC = ''
      }
    }
  }
}
</script>
