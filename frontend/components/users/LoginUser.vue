<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-row class="d-flex justify-center">
    <v-card class="pa-6 rounded-xxl my-5" max-width="800">
      <v-avatar size="80" class="mx-auto d-flex justify-center">
        <img
          src="../../static/logo.jpg"
          alt="Circular Image"
          style="border: 2px solid #343c61; max-height: 80px; max-width: 80px;"
        >
      </v-avatar>
      <v-card-title class="headline d-flex justify-center">
        Inicia Sesion
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-form @submit.prevent="iniciar_sesion()">
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
          <v-btn class="mt-2" block @click="iniciar_sesion()">
            Iniciar Sesion
          </v-btn>
          <p v-if="showText" class="red--text text--lighten-2">
            Error al iniciar sesion!
          </p>
          <p>¿No tienes una cuenta?</p>
          <v-btn class="mt-2" block @click="crear_cuenta()">
            Crea una aquí
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

        return 'La contraseña debe contener mas de 8 caracteres.'
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
          this.showText = true // Mostrar mensaje de error si el usuario no se encuentra
        } else {
          // const NUA = response.data.body[0].Usu_NUA // Obtener el NUA de la respuesta
          const NUA = this.v_nua

          // Definir el tiempo de vencimiento en milisegundos (por ejemplo, 2 días)
          const tiempoVencimiento = 2 * 60 * 60 * 1000 // 2 días

          // Guardar el NUA en el almacenamiento local (localStorage) con tiempo de vencimiento
          localStorage.setItem('NUA', NUA)

          // Programar la eliminación del NUA después de que haya transcurrido el tiempo de vencimiento
          setTimeout(() => {
            localStorage.removeItem('NUA')
            // O cualquier otra acción que desees realizar cuando el tiempo de vencimiento expire
          }, tiempoVencimiento)

          // Redireccionar al usuario a la página principal
          this.$router.push({
            path: '/principal/busqueda_raites/',
            query: { NUA }
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al iniciar sesión: ', error.response)
        // console.error('Error al iniciar sesión: ', error)
        this.showText = true
      }
    },
    crear_cuenta () {
      this.$router.push({
        path: '/reg_usuario/'
      }) // redireccionamiento con el NUA de la cuenta iniciada
    },
    iniciarEnter () {
      this.iniciar_sesion()
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
