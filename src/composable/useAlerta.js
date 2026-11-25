import { ref } from "vue"


const mostrarAlerta = ref(false)
const mensajeAlerta = ref('')
const tipoAlerta = ref('success') // 'success' | 'warning' | 'error'
let timer = null

export function useAlerta() {

  const notificar = (mensaje, tipo = 'success') => {
    mensajeAlerta.value = mensaje
    tipoAlerta.value = tipo
    mostrarAlerta.value = true

   
    if (timer) clearTimeout(timer)

    
    timer = setTimeout(() => {
      mostrarAlerta.value = false
    }, 2500)
  }

  return {
    mostrarAlerta,
    mensajeAlerta,
    tipoAlerta,
    notificar
  }
}