from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import base64
import io
from PIL import Image

app = Flask(__name__)

model = load_model('path/to/your/saved_model')

def get_img_array(img, size):
    img = img.resize(size)
    array = tf.keras.preprocessing.image.img_to_array(img)
    array = np.expand_dims(array, axis=0)
    return array

def make_gradcam_heatmap(img_array, model, last_conv_layer_name, classifier_layer_names):
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        pred_index = tf.argmax(preds[0])
        class_channel = preds[:, pred_index]

    grads = tape.gradient(class_channel, last_conv_layer_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()

def save_and_display_gradcam(img, heatmap, alpha=0.4):
    heatmap = cv2.resize(heatmap, (img.size[0], img.size[1]))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    superimposed_img = heatmap * alpha + np.array(img)
    return Image.fromarray(superimposed_img)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    img = Image.open(file.stream)

    img_array = get_img_array(img, (192, 256))
    heatmap = make_gradcam_heatmap(img_array, model, 'conv2d', ['flatten', 'dense', 'dropout', 'dense_1'])

    prediction = model.predict(img_array)[0][0]

    heatmap_img = save_and_display_gradcam(img, heatmap)
    buffered = io.BytesIO()
    heatmap_img.save(buffered, format="JPEG")
    heatmap_str = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({'prediction': prediction, 'heatmap': heatmap_str})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
