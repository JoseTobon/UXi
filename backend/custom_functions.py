from keras import backend as K
import numpy as np
import cv2
import tensorflow as tf
from PIL import Image


@tf.keras.utils.register_keras_serializable(package='Custom')
def earth_mover_loss(y_true, y_pred):
    cdf_ytrue = K.cumsum(y_true, axis=-1)
    cdf_ypred = K.cumsum(y_pred, axis=-1)
    samplewise_emd = K.sqrt(K.mean(K.square(K.abs(cdf_ytrue - cdf_ypred)), axis=-1))
    return K.mean(samplewise_emd)

def make_gradcam_heatmap(img_array, model, last_conv_layer_name='conv_pw_13'):
    """Generates a Grad-CAM heatmap for a given image and model"""
    try:
        grad_model = tf.keras.models.Model(
            [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
        )

        with tf.GradientTape() as tape:
            last_conv_layer_output, preds = grad_model(img_array)
            pred_index = tf.argmax(preds[0])
            class_channel = preds[:, pred_index]

        # Ensure the tape is watching the correct tensor
        tape.watch(last_conv_layer_output)
        grads = tape.gradient(class_channel, last_conv_layer_output)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        last_conv_layer_output = last_conv_layer_output[0]
        heatmap = tf.matmul(last_conv_layer_output, pooled_grads[..., tf.newaxis])  # Use tf.matmul for matrix multiplication

        heatmap = tf.squeeze(heatmap)  # Squeeze only if heatmap has more than one dimension

        # Ensure heatmap values are valid before normalization
        heatmap = tf.where(tf.math.is_nan(heatmap), tf.zeros_like(heatmap), heatmap)
        heatmap = tf.where(tf.math.is_inf(heatmap), tf.zeros_like(heatmap), heatmap)
        heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
        return heatmap.numpy()
    except Exception as e:
        print(f"ERROR making the heatmap {e}")


def save_and_display_gradcam(img, heatmap, alpha=0.4):
    img = img.convert('RGB')
    heatmap = cv2.resize(heatmap, (img.size[0], img.size[1]))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    superimposed_img = heatmap * alpha + np.array(img)
    superimposed_img = np.clip(superimposed_img, 0, 255).astype(np.uint8)
    return superimposed_img

# The uploaded image is resized and transformed into an array for the model to read
def get_img_array(img, size):
    resized_img = img.resize(size)
    img = resized_img.convert('RGB')
    array = tf.keras.preprocessing.image.img_to_array(img)
    array = np.expand_dims(array, axis=0)
    print(f"Processed image shape: {array.shape}")
    return array

# Some useful variables

score_values = np.array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0])
#Dunno what these values mean really --Alyx
last_conv_layer_name = 'conv_pw_13'
classifier_layer_names = ['global_average_pooling2d', 'dropout', 'dense', 'dense_1']
