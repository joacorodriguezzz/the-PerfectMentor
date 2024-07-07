// initObjectives.js

const mongoose = require("mongoose");
const Objective = require("./objectiveModel"); // Asegúrate de importar el modelo correctamente

// Conexión a la base de datos (asegúrate de tener mongoose.connect configurado previamente)

// Datos de objetivos a crear
const objectivesToCreate = [
  {
    title: "Completar la información del perfil",
    description:
      "Actualizar todos los campos del perfil con información relevante.",
  },
  {
    title: "Conseguir el primer mentor",
    description:
      "Enviar solicitudes y establecer una relación con el primer mentor.",
  },
  {
    title: "Establecer la primera reunión",
    description:
      "Programar y realizar la primera reunión con el mentor asignado.",
  },
];

async function createObjectives() {
  try {
    // Itera sobre cada objetivo y créalo en la base de datos
    for (let objectiveData of objectivesToCreate) {
      await Objective.create(objectiveData);
    }
    console.log("Objetivos creados exitosamente.");
  } catch (error) {
    console.error("Error al crear objetivos:", error);
  } finally {
    // Cierra la conexión a la base de datos al finalizar
    mongoose.disconnect();
  }
}

// Llama a la función para crear los objetivos
createObjectives();
