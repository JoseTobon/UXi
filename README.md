# UXi

UXi es una aplicación web diseñada para analizar la estética de sitios web utilizando un modelo de predicción basado en redes neuronales. La aplicación permite a los usuarios subir una imagen de un sitio web y obtener una predicción sobre la estética del sitio junto con un mapa de calor que muestra las áreas más importantes para la predicción.


## Estructura del Proyecto

```
project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── model/
│   │   ├── CalistaAesthetics_AP2_with_gridsearch_and_gradcam.ipynb
│   │   └── model.py
│   ├── app.py
│   └── requirements.txt
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Detalles Técnicos

### Modelo de Predicción

El modelo de predicción se encuentra en el notebook `CalistaAesthetics_AP2_with_gridsearch_and_gradcam.ipynb`. Este notebook incluye los siguientes pasos:

1. **Clonación y Preparación de Datos**: 
   - Clona el repositorio que contiene los datos y los modelos preentrenados.
   - Descarga y descomprime los datasets necesarios.

2. **Entrenamiento del Modelo**:
   - Define y entrena un modelo de red neuronal convolucional (CNN) utilizando TensorFlow/Keras.

3. **Grad-CAM**:
   - Implementa Grad-CAM para generar mapas de calor que muestran las áreas más importantes de la imagen para la predicción.

### Implementación de Grad-CAM

Grad-CAM se implementa mediante las siguientes funciones en el archivo `model.py`:

- `get_img_array(img, size)`: Preprocesa la imagen para que esté lista para la predicción.
- `make_gradcam_heatmap(img_array, model, last_conv_layer_name, classifier_layer_names)`: Genera un mapa de calor Grad-CAM para una imagen dada y un modelo.
- `save_and_display_gradcam(img, heatmap, alpha=0.4)`: Superpone el mapa de calor en la imagen original y la guarda.
