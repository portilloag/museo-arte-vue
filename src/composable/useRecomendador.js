import { ref, unref } from "vue";

export function useRecomendador(obras) {
  const historial = ref([]);
  const cargando = ref(false);
  const error = ref("");

  async function enviar(mensaje) {
    historial.value.push({ role: "user", content: mensaje });

    const obrasDisponibles = unref(
      typeof obras === "function" ? obras() : obras
    );

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages: [
          {
            role: "system",
            content: `Tu instrucción para recomendar obras... tenes que responder esto solo en texto plano y no debe tener mas de 80 caracteres, ademas solo podes usar la informacion de ${JSON.stringify(obrasDisponibles)}`,
          },
          ...historial.value,
        ],
        reasoning: { enabled: false },
      }),
    });

    if (!response.ok) {
      throw new Error("Error al comunicarse con OpenRouter");
    }

    const result = await response.json();
    const contenido = result.choices?.[0]?.message?.content;

    historial.value.push({
      role: "assistant",
      content: contenido,
    });
  }

  return {
    historial,
    cargando,
    error,
    enviar,
  };
}