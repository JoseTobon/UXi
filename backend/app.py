from flask import Flask, request, jsonify
from flask_cors import CORS # Cross-Origin Resource Handling, to access resources from other domains
from PIL import Image
from custom_functions import earth_mover_loss, get_img_array, make_gradcam_heatmap, save_and_display_gradcam # Custom functions
from custom_functions import score_values # Custom variables
import numpy as np
import cv2
import base64
import tensorflow as tf

# First an application instance is created
app = Flask(__name__)

# CORS must be enabled for all resources in this case so React can access the model from the back-end
CORS(app,resources={r"/*":{"origins":"*"}})

# In case of exporting the model with pickle, it's imported with it
model = tf.keras.models.load_model('./model/3_CalistaAestheticsMobileNet.h5',custom_objects={'earth_mover_loss': earth_mover_loss})

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file'}), 400

    file = request.files['image']
    img = Image.open(file.stream)
    try:
        img_array = get_img_array(img, (256, 192))
        heatmap = make_gradcam_heatmap(img_array, model)
        rate_prediction = model.predict(img_array)
        print(f"Prediction is ready")
        heatmap_w_image = save_and_display_gradcam(img, heatmap) 
        print(f"Heatmap has been merged with image")
        # Convert image for json response
        retval, buffer = cv2.imencode('.jpg', heatmap_w_image)
        pic_str = base64.b64encode(buffer)
        print(f"Heatmap is ready")
        return jsonify({'Prediction': float(np.sum(rate_prediction[0]*score_values)), 'heatmap': str(pic_str)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')