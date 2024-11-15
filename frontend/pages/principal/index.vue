<template>
  <div class="ajuste" fill-height>
    <!-- Botón "¿A dónde vas?" -->
    <v-btn
      rounded
      x-large
      color="#576CB9"
      elevation="0"
      style="color: white; width: 400px; margin-bottom: 16px;"
      class="fuente"
    >
      ¿A dónde vas?
    </v-btn>

    <!-- Botón "Crear Raite" -->
    <v-btn
      rounded
      x-large
      color="#B9F289"
      elevation="0"
      style="color: black; width: 400px; margin-bottom: 16px;"
      class="fuente"
      @click="openRatingDialog"
    >
      Crear Raite
    </v-btn>
    <v-dialog v-if="showRatingDialog" v-model="dialogRate" width="500px">
      <v-card width="500px">
        <v-card-title>Califica el viaje</v-card-title>
        <v-textarea v-model="comments" label="comentarios" style="margin-left: 2%; margin-right: 2%;" />
        <v-slider
          v-model="stars"
          step="1"
          thumb-label
          ticks
          tick-size="5"
          :max="5"
          label="calificación en estrellas"
          style="margin-left: 5%; margin-right: 5%;"
        />
        <v-card-actions>
          <v-btn color="success" @click="saveRating">
            Guardar
          </v-btn>
          <v-spacer />
          <v-btn color="error" @click="cancelRating">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      dialogRate: false,
      showRatingDialog: false,
      comments: null,
      stars: null,
      calCount: 0,
      viaActivo: 0,
      resCount: 0,
      dynamicParameter: null,
      esConductor: false
    }
  },
  created () {
    this.validCalif() // Llamar al método para obtener los datos del usuario al crear el componente
    this.fetchUserData() // Llamar al método para obtener los datos del usuario al crear el componente
    const NUA = this.$route.query.NUA
    this.$router.push({
      path: '/principal/busqueda_raites',
      query: { NUA }
    })
  },
  methods: {
    validCalif () {
      const storedNUA = localStorage.getItem('NUA')
      if (storedNUA) {
        const apiUrl = `http://localhost:4000/api/calificaciones/validar/${storedNUA}/${this.dynamicParameter}`
        axios.get(apiUrl)
          .then((response) => {
            const { calCount, viaActivo, resCount } = response.data.body
            this.calCount = calCount
            this.viaActivo = viaActivo
            this.resCount = resCount
            if (this.calCount === 0 && this.viaActivo === 0 && this.resCount === 1) {
              // Si el usuario no ha calificado, el viaje no está activo y ha calificado solo una vez, mostrar el diálogo de calificación
              this.showRatingDialog = true
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error al obtener los datos de calificación:', error)
          })
      }
    },
    openRatingDialog () {
      // Método para abrir el diálogo de calificación
      this.dialogRate = true
    },
    saveRating () {
      // Método para guardar la calificación
      // Aquí puedes enviar la calificación al backend si es necesario
      this.dialogRate = false
    },
    cancelRating () {
      // Método para cancelar la calificación
      this.dialogRate = false
    },
    async fetchUserData () {
      const storedNUA = localStorage.getItem('NUA')
      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/usuarios/${this.NUA}`
          const response = await axios.get(apiUrl)
          const user = response.data.body
          // Establecer esConductor según el valor de Usu_Tipo
          this.esConductor = (user[0].Usu_Tipo === 'estudiante_con_vehiculo')
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error al obtener datos del usuario:', error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('No se pudo recuperar el NUA del almacenamiento local')
      }
    }
  }
}
</script>

<style>
.fuente {
  font-weight: bold;
  font-family: Source Sans Pro;
}

.ajuste {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 80vh;
  padding: 0 0 0;
}
</style>
