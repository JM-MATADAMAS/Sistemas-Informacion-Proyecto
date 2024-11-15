<template>
  <v-row class="d-flex justify-center fuente">
    <v-card class="pa-6 rounded-xxl my-5" max-width="800">
      <v-card-title class="headline d-flex justify-center">
        <v-avatar size="40">
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-avatar>
        Ver Cuenta
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="nua"
            :rules="necesario"
            maxlength="6"
            label="NUA"
            readonly
            append-icon="mdi-account-lock"
          />

          <v-text-field
            v-model="email"
            type="email"
            maxlength="100"
            :rules="necesario"
            label="Correo Institucional"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />

          <v-text-field
            v-model="nombre"
            :rules="necesario"
            maxlength="20"
            label="Nombre"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="ape_pat"
                maxlength="20"
                :rules="necesario"
                label="Apellido Paterno"
                class="w-50"
                :readonly="isReadOnly"
                :append-icon="icono"
                :error-messages="ErrorSC"
                @keydown="restrictSpecialCharacters"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ape_mat"
                maxlength="20"
                label="Apellido Materno"
                class="w-50"
                :readonly="isReadOnly"
                :append-icon="icono"
                :error-messages="ErrorSC"
                @keydown="restrictSpecialCharacters"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="password"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Contraseña"
            :readonly="isReadOnly"
            :append-icon="icono"
            :error-messages="ErrorSC"
            @keydown="restrictSpecialCharacters"
          />

          <!--<v-text-field
              v-model="usu_tipo"
              maxlength="255"
              :rules="necesario"
              label="Tipo de Usuario"
              :readonly="isReadOnly"
              :append-icon="icono"
            />-->

          <p>
            <input id="switch" v-model="isToggleOn" type="checkbox" :disabled="isReadOnly">
            <label for="switch" class="fuente">Estudiante con Vehiculo</label>
          </p>
          <v-btn
            v-if="btn_vehiculo"
            class="mt-2 mb-3 fuente"
            block
            @click="editar_vehiculo()"
          >
            Vehiculo
          </v-btn>
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
                @click="editar_cuenta()"
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
                  @click="mostrarpopup = false, borrar_cuenta()"
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
        </v-form>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DefaultLayout',
  data: () => ({
    email: '',
    nua: '',
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    password: '',
    usu_tipo: '',
    btn_borrar: true,
    btn_editar: false,
    btn_habilitar: true,
    btn_cancelar: false,
    isReadOnly: true,
    isToggleOn: true,
    icono: 'mdi-lock',
    mostrarpopup: false,
    btn_vehiculo: false,
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
  created () {
    this.nua = this.$route.query.NUA
    this.Usuario_id()
  },
  methods: {
    async Usuario_id () {
      try {
        const respuesta = await axios.get(
          `http://localhost:4000/api/usuarios/${this.nua}`
        )
        // console.log('obtener respuestas:', respuesta.data.body[0].Usu_Nombre)
        this.nombre = respuesta.data.body[0].Usu_Nombre
        this.email = respuesta.data.body[0].Usu_Correo
        this.ape_pat = respuesta.data.body[0].Usu_Apellido_Paterno
        this.ape_mat = respuesta.data.body[0].Usu_Apellido_Materno
        // this.password = respuesta.data.body[0].Usu_Password
        this.usu_tipo = respuesta.data.body[0].Usu_Tipo
        if (this.usu_tipo === 'estudiante_con_vehiculo') {
          this.isToggleOn = true
          this.btn_vehiculo = true
        } else {
          this.isToggleOn = false
          this.btn_vehiculo = false
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
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
      this.Usuario_id() // recuperamos los datos por si se hicieron algunos cambios sin guardar
    },
    async editar_cuenta () {
      this.btn_habilitar = true
      this.btn_cancelar = false
      this.isReadOnly = true
      this.btn_habilitar = true
      this.btn_borrar = true
      this.btn_editar = false
      this.icono = 'mdi-lock'
      if (this.isToggleOn === true) {
        this.usu_tipo = 'estudiante_con_vehiculo'
      } else {
        this.usu_tipo = 'estudiante_comun'
      }
      try {
        await axios.put(
          `http://localhost:4000/api/usuarios/${this.nua}`, {
            Usu_Nombre: this.nombre,
            Usu_Correo: this.email,
            Usu_Apellido_Paterno: this.ape_pat,
            Usu_Apellido_Materno: this.ape_mat,
            Usu_Password: this.password,
            Usu_Tipo: this.usu_tipo
          }
        )
        location.reload()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      this.Usuario_id()
    },
    async borrar_cuenta () {
      try {
        await axios.delete(
          `http://localhost:4000/api/usuarios/${this.nua}`
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      this.$router.push('/') // redireccionamiento
    },
    editar_vehiculo () {
      const NUA = this.nua
      this.$router.push({
        path: '/principal/ver_vehiculo/',
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
